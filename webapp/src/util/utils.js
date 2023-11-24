import axios from "axios";

export function isLocalHost() {
    return window.location.href.includes('localhost:8080');
}


export const REST_BASE_PATH = isLocalHost() ? 'http://localhost:8085/s9library/api/rest' : 'https://v2202005121049117361.nicesrv.de/s9library/api/rest';
export const localUserCredsKey = "localUserCreds";
export const searchConfigStorageKey_ = "searchConfig_";
export const tabsRestoreKey_ = "tabs_";

export function searchConfigStorageKey(userId) {
    return searchConfigStorageKey_ + userId;
}

export function tabsRestoreKey(userId) {
    return tabsRestoreKey_ + userId;
}

export const MAX_IMAGE_UPLOAD_SIZE_MB = 2; // 2MB in bytes
export const MAX_IMAGE_UPLOAD_SIZE_BYTE = MAX_IMAGE_UPLOAD_SIZE_MB * 1000000; // 2MB in bytes

const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const SERVER_DOWN = -1;
export const ERROR_CODES_ALLOW_MULTIPLE_BLACKLIST = [UNAUTHORIZED, FORBIDDEN, SERVER_DOWN];

export function hasDocumentDiffToPreviousDocument(document) {
    if (!document.previous) {
        return document.current.title || document?.current.body || document.current.tags.length > 0;
    }
    const hasTagsDiff = !(document?.previous?.tags.every(tag => document.current.tags.includes(tag)) && document.current.tags.every(tag => document.previous.tags.includes(tag)));
    return document.current.title !== document?.previous?.title || document?.current.body !== document?.previous?.body || hasTagsDiff;
}

export function hasDocumentEditorsChange(documentEditors) {
    if (!documentEditors.previous) {
        return documentEditors.current?.length > 0;
    }
    return !(documentEditors.previous?.every(editor => documentEditors.current.includes(editor)) && documentEditors.current.every(editor => documentEditors.previous?.includes(editor)));
}

export function headerConfig(token) {
    if (token) {
        return {
            headers: {Authorization: `Bearer ${token}`}
        };
    }
    return {};
}


export function wait(ms, data) {
    return new Promise(resolve => setTimeout(resolve, ms, data));
}

export const restService = {
    appState: null,
    headerConfig: {},
    logoutStatusCodes: [UNAUTHORIZED, FORBIDDEN],
    tryToRestoreLoggedInUser: function () {
        const restoredUser = JSON.parse(localStorage.getItem(localUserCredsKey));
        if (restoredUser && restoredUser.token) {
            return this.sendRefreshTokenRequest(headerConfig(restoredUser.token))
                .then(response => this.appState.onLogin(restoredUser, response.data));
        }
        return Promise.resolve(false);
    },
    addFakeLoadingInterception(message, delay, data) {
        const loadingInterception = this.addLoadingInterception(null, message);
        return wait(delay, data).then(data => {
            this.clearLoadingInterception(loadingInterception);
            return data;
        });
    },
    handleDocumentSearchResponse: function (response) {
        const foundDocuments = response.data.results;
        const userIdsToResolve = foundDocuments
            .map(doc => [doc.author, doc.lastEditedBy].filter(userId => userId))
            .reduce((ids, currentIds) => [...ids, ...currentIds], []);
        this.getNotCachedUsers([...new Set(userIdsToResolve)]);
        this.appState.addFoundDocuments(foundDocuments);
        this.appState.setNextPageObjectId(response.data.nextPageObjectId);
    },
    sendSearchDocumentRequest(searchParams) {
        this.appState.setRenderingSearchResults(true);
        const loadingInterception = this.addLoadingInterception(SEARCH_DOCUMENT_ENDPOINT);
        return axios.post(REST_BASE_PATH + SEARCH_DOCUMENT_ENDPOINT, searchParams, this.headerConfig)
            .then(this.responseInterception.bind(this, loadingInterception), this.searchErrorHandling.bind(this, loadingInterception))
            .then(this.handleDocumentSearchResponse.bind(this));
    },
    sendPostRequest: function sendPostRequest(path, data, blocking = true, authorized = true) {
        if (blocking) {
            const loadingInterception = this.addLoadingInterception(path);
            return axios.post(REST_BASE_PATH + path, data, authorized ? this.headerConfig : {})
                .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception));
        }
        return axios.post(REST_BASE_PATH + path, data, authorized ? this.headerConfig : {})
            .then(response => response, this.errorHandling.bind(this));
    },
    sendGetRequest: function (path, blocking = true, authorized = true) {
        if (blocking) {
            const loadingInterception = this.addLoadingInterception(path);
            return axios.get(REST_BASE_PATH + path, authorized ? this.headerConfig : {})
                .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception));
        }
        return axios.get(REST_BASE_PATH + path, authorized ? this.headerConfig : {})
            .then(response => response, this.errorHandling.bind(this));
    },
    sendRefreshTokenRequest: function (tempHeaderConfig) {
        const loadingInterception = this.addLoadingInterception(UPDATE_TOKEN_ENDPOINT);
        return axios.get(REST_BASE_PATH + UPDATE_TOKEN_ENDPOINT, tempHeaderConfig)
            .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception))
    },
    sendRegisterUserRequest: function (registerData, tempHeaderConfig) {
        const loadingInterception = this.addLoadingInterception(REGISTER_USER_ENDPOINT);
        return axios.post(REST_BASE_PATH + REGISTER_USER_ENDPOINT, registerData, tempHeaderConfig)
            .then(this.responseInterception.bind(this, loadingInterception), this.errorHandlingOnBlockingResponse.bind(this, loadingInterception))
    },
    getUsersById: function (userIds) {
        if (userIds && userIds.length > 0) {
            restService
                .sendPostRequest(GET_USERS_ENDPOINT, userIds)
                .then(
                    res => res.data.forEach(user => this.appState.addToUserCache(user)),
                    this.errorHandling.bind(this)
                );
        }
    },
    getNotCachedUsers: function (userIds) {
        const notCachedUserIds = userIds.filter(uid => !this.appState.getUserFromCache(uid));
        if (notCachedUserIds.length === 0) {
            return;
        }
        this.getUsersById(notCachedUserIds);
    },
    setAppState: function (appState) {
        this.appState = appState;
    },
    getTags: function () {
        this.sendGetRequest(GET_TAGS_ENDPOINT)
            .then(response => {
                const tags = response.data ? response.data : [];
                tags.sort();
                this.appState.setTags(tags);
            });
    },
    errorHandling: function (error) {
        const errorStatus = error?.response?.status;
        this.handleToastOnError(error);
        if (this.logoutStatusCodes.includes(errorStatus)) {
            this.appState.onLogout();
        }
        return Promise.reject(error);
    },
    searchErrorHandling: function (loadingInterception, error) {
        this.appState.setRenderingSearchResults(false);
        return this.errorHandlingOnBlockingResponse(loadingInterception, error);
    },
    errorHandlingOnBlockingResponse: function (loadingInterception, error) {
        this.clearLoadingInterception(loadingInterception);
        return this.errorHandling(error);
    },
    handleToastOnError: function (error) {
        if (!error || !error.response) {
            this.appState.addToast(SERVER_NOT_REACHABLE, 'error', SERVER_DOWN);
        } else if (error.response.data) {
            this.appState.addToast(error.response.data, 'error', error.response.status);
        }
    },
    responseInterception: function (loadingInterception, response) {
        this.clearLoadingInterception(loadingInterception);
        return response;
    },
    addLoadingInterception: function (path, customMessage = null) {
        const loadingInterception = {
            timeoutId: null,
            message: customMessage || getLoadingText(path),
            path: path,
            id: Date.now()
        };
        loadingInterception.timeoutId = setTimeout(function () {
            this.appState.addLoadingInterception(loadingInterception);
        }.bind(this), 25)
        return loadingInterception;
    },
    clearLoadingInterception: function (loadingInterception) {
        this.appState.removeLoadingInterception(loadingInterception);
    },
    setHeaderConfig: function (token) {
        if (token) {
            this.headerConfig = {
                headers: {Authorization: `Bearer ${token}`}
            };
        } else {
            this.headerConfig = {};
        }
    }

};

export class DocumentContainer {
    previous;
    current;
    editing;
    promptQuestion;
    validateInput;
    displayRevisions;
    documentEditors;
    hasUpdateWaiting;

    static of(init) {
        const docContainer = new DocumentContainer();
        docContainer.current = init.current;
        docContainer.previous = init.previous;
        docContainer.editing = init.editing;
        docContainer.promptQuestion = init.promptQuestion;
        docContainer.validateInput = init.validateInput;
        docContainer.displayRevisions = init.displayRevisions;
        docContainer.documentEditors = init.documentEditors;
        docContainer.hasUpdateWaiting = init.hasUpdateWaiting;
        return docContainer;
    }
}

export class S9Document {
    title;
    body;
    id;
    tags;
    author;
    library;
    createdAt;
    changedAt;
    lastEditedBy;
    version;

    static of(init) {
        const doc = new S9Document();
        doc.title = init.title;
        doc.body = init.body;
        doc.id = init.id;
        doc.tags = [...init.tags];
        doc.author = init.author;
        doc.library = init.library;
        doc.createdAt = init.createdAt;
        doc.changedAt = init.changedAt;
        doc.lastEditedBy = init.lastEditedBy;
        doc.version = init.version;
        return doc;
    }
}

export class PromptQuestion {
    action;
    question;
    confirmed;
    version;
    critical;

    constructor(init) {
        this.action = init.action;
        this.question = init.question;
        this.confirmed = init.confirmed;
        this.data = init.data;
        this.critical = init.critical;
    }

}

export const HIDDEN_DOC = DocumentContainer.of({
    current: S9Document.of({tags: []}),
    previous: S9Document.of({tags: []}),
    documentEditors: {previous: [], current: []}
});


export const DRAFT_PREFIX = `Entwurf-`;

class DRAFT_COUNT {
    count = 0;

    init(restoredTabs) {
        const initialCount = restoredTabs
            .filter(tab => tab.current.id.includes(DRAFT_PREFIX))
            .map(tab => tab.current.id)
            .map(tabId => tabId.substring(DRAFT_PREFIX.length))
            .map(tabIdCountString => Number(tabIdCountString))
            .reduce((current, next) => {
                if (next > current) {
                    return next;
                }
                return current;
            }, 0);

        this.count = initialCount;
    }

    asText() {
        const zeros = '00';
        const rawCount = String(this.count);
        const leadingZeros = zeros.substring(rawCount.length - 1);
        return `${DRAFT_PREFIX}${leadingZeros}${rawCount}`;
    }

    increment() {
        this.count += 1;
        return this;
    }
}

export const DRAFT_COUNT_INSTANCE = new DRAFT_COUNT();

export function CREATE_DRAFT_DOCUMENT(authorId) {
    const now = Date.now();
    return DocumentContainer.of({
        previous: null,
        current: S9Document.of({
            title: '',
            body: '',
            id: DRAFT_COUNT_INSTANCE.increment().asText(),
            tags: [],
            author: authorId,
            library: '',
            createdAt: now,
            changedAt: now,
            lastEditedBy: '',
            version: 0,
        }),
        editing: true,
        promptQuestion: null,
        validateInput: false,
        displayRevisions: false,
        documentEditors: {previous: [], current: []},
        hasUpdateWaiting: false
    });
}

export function CREATE_DRAFT_FROM_PREVIOUS_DOCUMENT(previousDocument, authorId) {
    const now = Date.now();
    return DocumentContainer.of({
        previous: null,
        current: S9Document.of({
            title: previousDocument.title,
            body: previousDocument.body,
            id: DRAFT_COUNT_INSTANCE.increment().asText(),
            tags: previousDocument.tags,
            author: authorId,
            library: '',
            createdAt: now,
            changedAt: now,
            lastEditedBy: '',
            version: 0,
        }),
        editing: true,
        promptQuestion: null,
        validateInput: false,
        displayRevisions: false,
        documentEditors: {previous: [], current: []},
        hasUpdateWaiting: false
    });
}

export function CREATE_ARCHIVED_DOCUMENT(foundDoc) {
    return DocumentContainer.of({
        previous: S9Document.of(foundDoc),
        current: S9Document.of(foundDoc),
        editing: false,
        promptQuestion: null,
        validateInput: false,
        displayRevisions: false,
        documentEditors: {previous: null, current: []},
        hasUpdateWaiting: false
    });
}

export function findParents(domElem, list = []) {
    const parent = domElem.parentElement;
    if (!parent) {
        return list;
    }
    return findParents(parent, [...list, parent]);
}

export function clickedOutside(event, requiredParentId) {
    if (event) {
        const target = event.target;
        const parents = findParents(target);
        return !parents
            .filter(p => p.id)
            .map(p => p.id)
            .includes(requiredParentId);
    }
    return false;
}

function isValidDraftId(documentId) {
    return documentId && documentId.startsWith(DRAFT_PREFIX);
}

export function isNoValidDocumentOrDraftId(documentId) {
    return !isValidDraftId(documentId) && !isValidStoredDocumentId(documentId);
}

export function isValidStoredDocumentId(documentId) {
    return documentId.match(/^\w{8}-(\w{4}-){3}\w{12}$/i);
}

export function isOnDocumentSearchRoute(path) {
    return path === '/document-search';
}

export function isOnOpenDocumentRoute(path) {
    return path.match('/document/');
}

export function isOnHomeRoute(path) {
    return path === '/';
}

function isOnMultipleToastByStatusBlacklist(errorCode) {
    return errorCode && ERROR_CODES_ALLOW_MULTIPLE_BLACKLIST.includes(errorCode);
}

export function preventMultipleToastRequired(errorCode, toasts) {
    if (isOnMultipleToastByStatusBlacklist(errorCode)) {
        return toasts?.filter(toast => toast.errorCode !== errorCode);
    }

    return toasts;
}

export function getToast(id, message, type, timeOutId, errorCode = null) {
    return {
        message: message,
        id: id,
        timeOutId: timeOutId,
        type: type,
        errorCode: errorCode
    };
}

function lookToTheRight(indexOfClosingTab, tabs) {
    if (indexOfClosingTab >= (tabs.length - 1)) {
        return null;
    }
    return tabs[indexOfClosingTab + 1];
}

function lookToTheLeft(indexOfClosingTab, tabs) {
    if (indexOfClosingTab === 0) {
        return null;
    }
    return tabs[indexOfClosingTab - 1];
}

export function findNextTabBeforeClosing(closingTab, tabs) {
    if (tabs.length === 1) {
        return null; // there can't be a neighbour
    }
    const indexOfClosingTab = tabs.indexOf(closingTab);
    const rightNeighbour = lookToTheRight(indexOfClosingTab, tabs);
    if (rightNeighbour) {
        return rightNeighbour;
    }
    return lookToTheLeft(indexOfClosingTab, tabs);
}

export function hasDiffToOriginal(iconEditorConfig) {
    return JSON.stringify(iconEditorConfig.imageMap) !== JSON.stringify(iconEditorConfig.imageMapCopy);
}

function getLoadingText(path) {
    switch (path) {
        case CREATE_DOCUMENT_ENDPOINT: {
            return 'Dokument wird angelegt...';
        }
        case UPDATE_DOCUMENT_ENDPOINT: {
            return 'Dokument wird gespeichert...';
        }
        case RESTORE_DOCUMENT_ENDPOINT: {
            return 'Dokument wird Wiederherstellung läuft...';
        }
        case DELETE_DOCUMENT_ENDPOINT: {
            return 'Dokument wird gelöscht...';
        }
        case REGISTER_USER_ENDPOINT: {
            return 'Registrierung läuft...';
        }
        case UPDATE_TOKEN_ENDPOINT: {
            return 'Authentifizierung wird erneuert...';
        }
        case LOGIN_USER_ENDPOINT: {
            return 'Du wirst eingeloggt...';
        }
        case SEARCH_DOCUMENT_ENDPOINT: {
            return 'Suche läuft...';
        }
        case SAVE_USER_ICON_ENDPOINT: {
            return 'Benutzericon wird gespeichert...';
        }
        case GET_TAGS_ENDPOINT: {
            return 'Lade Tags...';
        }
        case DELETE_ACCOUNT_ENDPOINT: {
            return 'Account wird gelöscht...';
        }
        case GET_DOCUMENT_ENDPOINT: {
            return 'Lade Dokument...';
        }
        case SEND_REGISTER_EMAIL_ENDPOINT: {
            return 'Registrierung-E-Mail wird versendet...';
        }
        case DOCUMENT_EDITORS_ENDPOINT: {
            return 'Lade Bearbeiter des Dokuments...';
        }
        case UPDATE_DOCUMENT_EDITORS_ENDPOINT: {
            return 'Speichere Bearbeiter...';
        }
        case RELOAD_DOCUMENT_ENDPOINT: {
            return 'Dokument wird erneuert...';
        }
        case DOCUMENT_REVISION_ENDPOINT: {
            return 'Lade Dokumenthistorie...';
        }
        default:
            if (path.includes(PREFIX_FIND_USERS_ENDPOINT)) {
                return 'Suche läuft...'
            }
            return 'Daten werden geladen...';
    }
}

export const CREATE_DOCUMENT_ENDPOINT = '/create-document';
export const UPDATE_DOCUMENT_ENDPOINT = '/update-document';
export const RESTORE_DOCUMENT_ENDPOINT = '/restore-document';
export const DELETE_DOCUMENT_ENDPOINT = '/delete-document';
export const REGISTER_USER_ENDPOINT = '/register';
export const UPDATE_TOKEN_ENDPOINT = '/update-token';
export const LOGIN_USER_ENDPOINT = '/login';
export const SEARCH_DOCUMENT_ENDPOINT = '/search-document';
export const DELETE_ACCOUNT_ENDPOINT = '/delete-account';
export const GET_TAGS_ENDPOINT = '/get-tags';
export const INIT_IMAGE_EDITOR_ENDPOINT = '/image-editor-map';
export const SAVE_USER_ICON_ENDPOINT = '/save-user-icon';
export const DELETE_USER_ENDPOINT = `/delete-user`;
export const DELETE_USER_FULLY_ENDPOINT = `/delete-user-fully`;
export const PREFIX_FIND_USERS_ENDPOINT = '/find-users';
export const PREFIX_FIND_DELETED_USERS_ENDPOINT = '/find-deleted-users';
export const FIND_USERS_ENDPOINT = (name) => `${PREFIX_FIND_USERS_ENDPOINT}/${name}`;
export const GET_USERS_ENDPOINT = '/get-users';
export const GET_DOCUMENT_ENDPOINT = '/get-document';
export const SEND_REGISTER_EMAIL_ENDPOINT = '/send-register-email';
export const DOCUMENT_EDITORS_ENDPOINT = '/document-editors';
export const UPDATE_DOCUMENT_EDITORS_ENDPOINT = '/update-document-editors';
export const RELOAD_DOCUMENT_ENDPOINT = '/reload-document';
export const DOCUMENT_REVISION_ENDPOINT = '/document-revision';


export const REGISTER_ROUTE = '/register/';
export const ADMIN_PANEL_ROUTE = '/admin-panel';
export const DOCUMENT_ROUTE = '/document/';
export const HOME_ROUTE = '/';
export const DOCUMENT_SEARCH_ROUTE = '/document-search';
export const IN_APP_ROUTE_WHITELIST = [HOME_ROUTE, DOCUMENT_ROUTE, DOCUMENT_SEARCH_ROUTE];


/* error texts */
/* eslint-disable */
export const DOKUMENT_DOES_NOT_EXISTS = `Das Dokument existiert nicht mehr.`;
export const SERVER_NOT_REACHABLE = `Der Server scheint nicht erreichbar. Versuche es bitte später nochmal.`;
export const REGISTRATION_SUCCESS = (loggedInUser) => `Registrierung erfolgreich Herzlich Willkommen ${loggedInUser.name}.`;
export const LOGIN_SUCCESS = (loggedInUser) => `Herzlich Willkommen ${loggedInUser.name}.`;
export const DOCUMENT_CREATION_SUCCESS = `Das Dokument wurde erfolgreich angelegt.`;
export const DOCUMENT_RESTORE_SUCCESS = `Das Dokument wurde erfolgreichwiederhergestellt.`;
export const DOCUMENT_RELOAD_SUCCESS = `Das Dokument wurde erfolgreich aktualisiert.`;
export const DOCUMENT_RELOAD_UNNECESSARY = `Das Dokument ist bereits auf dem neusten Stand.`;
export const DOCUMENT_SAVE_SUCCESS = `Das Dokument wurde erfolgreich gespeichert.`;
export const DOKUMENT_REMOVE_SUCCESS = `Das Dokument wurde erfolgreich gelöscht.`;
export const ICON_SAVE_SUCCESS = `Das Icon wurde erfolgreich gespeichert.`;
export const DOCUMENT_CLICK_OUTSIDE_OPEN_MENU_ON_EXISTING_CHANGES = `Du hast noch ungespeicherte Änderungen an deinem Icon!`;

