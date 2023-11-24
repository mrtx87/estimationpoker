<template>
    <div class="app-wrapper">
        <header-vue></header-vue>
        <div class="app-body">
            <toastrs-vue></toastrs-vue>
            <loading-overlay :class="{'hidden': !appState.loading || appState.isRendering}"
                             v-bind:loadingText="appState.currentLoadingText"></loading-overlay>
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {useAppStateStore} from "./stores/app-state";
    import {
        clickedOutside,
        DOCUMENT_CLICK_OUTSIDE_OPEN_MENU_ON_EXISTING_CHANGES,
        hasDiffToOriginal,
        restService
    } from "./util/utils";
    import LoadingOverlay from "./components/loading-overlay";
    import HeaderVue from "./components/header";
    import ToastrsVue from "./components/toastrs";


    export default {
        name: 'App',
        components: {
            ToastrsVue,
            HeaderVue,
            LoadingOverlay
        },
        beforeUnmount() {
            document.body.removeEventListener('click', this.clickOutsideHandlers.bind(this));
        },
        created() {
            this.appState = useAppStateStore();
            this.appState.setRouter(this.$router);
            restService.setAppState(this.appState);
            document.body.addEventListener('click', this.clickOutsideHandlers.bind(this), true);
        },
        data() {
            return {
                appState: {},
            }
        },
        methods: {
            clickOutsideHandlers: function (e) {
                if (this.appState.isEditDocumentTagSelectionFocused) {
                    if (clickedOutside(e, 'edit-doc-tag-select')) {
                        this.appState.setEditDocumentTagSelectionFocused(false);
                    }
                }

                if (this.appState.isEditDocumentEditorsSelectionFocused) {
                    if (clickedOutside(e, 'edit-doc-editors-select')) {
                        this.appState.setEditDocumentEditorsSelectionFocused(false);
                    }
                }

                if (this.appState.isSearchTagSelectionFocused) {
                    if (clickedOutside(e, 'searchTagsSelector')) {
                        this.appState.setSearchTagsSelectionFocused(false);
                    }
                }

                if (this.appState.isUserMenuOpen) {
                    if (clickedOutside(e, 'userMenuId')) {
                        if (hasDiffToOriginal(this.appState.iconEditorConfig)) {
                            const toasts = this.appState.toastrs;
                            if (!toasts.find(toast => toast.message === DOCUMENT_CLICK_OUTSIDE_OPEN_MENU_ON_EXISTING_CHANGES)) {
                                this.appState.addToast(DOCUMENT_CLICK_OUTSIDE_OPEN_MENU_ON_EXISTING_CHANGES, 'warn', null, 2500);
                            }
                        } else {
                            this.appState.setUserMenuOpen(null);
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    body {
        font-family: 'Roboto Condensed', sans-serif;
    }

    .app-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        background-color: white;
        width:100vw;
        background-color: rgb(112 112 112 / 40%);
    }

    .app-body {
        width: 100%;
        max-width: 1600px;
        height: 100%;
    }

</style>
