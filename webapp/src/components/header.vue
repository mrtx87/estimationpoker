<template>
    <div class="header">
        <div class="header-content">
            <div class="logo">
                LIB9
            </div>
            <div class="player">
                player
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "../stores/app-state";
import {DELETE_ACCOUNT_ENDPOINT, restService} from "../util/utils";

export default {
    name: 'header-vue',
    //components: {},
    created() {
        this.appState = useAppStateStore();
    },
    beforeMount() {
    },
    beforeUnmount() {
        this.deleteAccountPrompt = null;
    },
    watch: {},
    data() {
        return {
            appState: null,
            deleteAccountPrompt: null,
        }
    },
    methods: {
        getAccountDeletePromptQuestion: function () {
            return {
                action: 'delete-account',
                question: 'Bist du sicher, dass du deinen Account löschen willst? (Kann nicht rückgängig gemacht werden)',
                confirmed: false
            };
        },
        editIcon: function () {
            if (this.appState.isUserMenuOpen) {
                this.appState.isUserMenuOpen.editingIcon = !this.appState.isUserMenuOpen.editingIcon;
            }
        },
        logout: function () {
            restService.addFakeLoadingInterception('Du wirst abgemeldet...', 600)
                .then(this.appState.onLogout.bind(this.appState));
        },
        openUserMenu: function () {
            this.appState.setUserMenuOpen({
                editingIcon: false
            });
        },
        deleteAccount: function () {
            this.deleteAccountPrompt = this.getAccountDeletePromptQuestion();
        },
        onDeleteAccountPromptAnswer: function (answer) {
            this.deleteAccountPrompt = null;
            if (answer.confirmed) {
                this.executeDeleteAccount();
            }
        },
        executeDeleteAccount() {
            restService.sendGetRequest(DELETE_ACCOUNT_ENDPOINT)
                .then(() => {
                    this.logout();
                    this.appState.resetAppState();
                });
        }
    }
}

</script>

<style scoped>
.header {
    width: 100%;
    height: 75px;
    background-color: var(--light-blue);
    display: flex;
    gap: 0 1rem;
    justify-content: center;
    padding: 5px 10px;
    box-sizing: border-box;
    align-items: center;
    border-bottom: 1px grey solid;
}

.header-content {
    width:100%;
    max-width: 1600px;
    display: flex;
    gap: 0 1rem;
    justify-content: space-between;
    padding: 5px 10px;
    box-sizing: border-box;
    align-items: center;
}

</style>
