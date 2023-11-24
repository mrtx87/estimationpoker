<template>
    <div class="main-menu-wrapper" tabindex="0" v-on:mouseleave="closeMenu">
        <svg v-on:click="closeMenu()" class="close-button" xmlns="http://www.w3.org/2000/svg" width="28.991"
             tabindex="0"
             height="28.991" viewBox="0 0 28.991 28.991">
            <rect id="Rectangle_32" data-name="Rectangle 32" width="36" height="5" rx="2.5"
                  transform="translate(3.536) rotate(45)" fill="#fff"/>
            <rect id="Rectangle_33" data-name="Rectangle 33" width="36" height="5" rx="2.5"
                  transform="translate(28.991 3.536) rotate(135)" fill="#fff"/>
        </svg>
        <div class="main-links-wrapper">
            <div class="main-links">
                Menu
            </div>
        </div>
        <div class="sub-links-wrapper" tabindex="0">
            <div class="sub-links" v-on:click="backToHomePage()" v-if="notOnLandingPage">
                <img src="../assets/back-to-home.svg">
                <p>Back to Homepage</p>
            </div>
            <div class="sub-links" v-if="isConnected" v-on:click="createOwnGame()" tabindex="0">
                <img src="../assets/create-game-icon.svg" alt="create game">
                <p>Create New Game</p>
            </div>
            <div class="sub-links" v-if="notOnLandingPage" v-on:click="onCopyShareLink()" tabindex="0">
                <div class="copied-to-clipboard" v-if="copiedToClipboard">copied to clipboard</div>
                <img src="../assets/copy.svg" alt="copy invite link">
                <p>Invite Link</p>
            </div>
            <div class="sub-links" :class="{'disabled': banPollDisabled}" v-on:click="initializeBanVote()" tabindex="0"
                 v-if="inGameSection">
                <img title="vote on ban" class="check-icon" src="../assets/vote_on_ban.svg" alt="banvote">
                <p>Vote on ban Player</p></div>
            <div class="sub-links sub-links-mobile" :class="{'not-landing-page': notOnLandingPage}" tabindex="0"
                 v-on:click="onOpenOverlay('Impressum')">
                <img src="../assets/impressum-icon.svg" alt="impressum">
                <p>Impressum</p>
            </div>
            <div class="sub-links sub-links-mobile" :class="{'not-landing-page': notOnLandingPage}" tabindex="0"
                 v-on:click="onOpenOverlay('TermsOfUse')">
                <img src="../assets/tos-icon.svg" alt="terms of use">
                <p>Terms of use</p>
            </div>
            <div class="sub-links sub-links-mobile" :class="{'not-landing-page': notOnLandingPage}" tabindex="0"
                 v-on:click="onOpenOverlay('DsgvoCookie')">
                <img src="../assets/privacy-settings.svg" alt="privacy settings">
                <p>Privacy Settings</p>
            </div>
        </div>
        <transition name="menu-confirm-transition">
            <div class="menu-confirm-dialog-overlay" v-if="selectedMenuItem">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="currentColor"
                          d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/>
                </svg>
                <span>{{ menuQuestion }}</span>
                <span>Are you Sure ?</span>
                <div class="confirm-dialog-button-panel">
                    <button class="main-button" v-on:click="onConfirm">yes</button>
                    <button class="main-button" v-on:click="onDecline">no</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {GlobalPlayerCookie} from "@/model/global-player-cookie.model";
    import {MenuItemKey, RequestMessageType} from "@/constants/vue-constants";
    import TermsOfUse from "@/components/terms-of-use";
    import {Logger} from "@/services/util";
    import {ConnectionState} from "@/services/websocket-service";

    export default {
        name: 'MainMenu',
        emits: ['onCloseMenu', 'onDisplayBanPoll', 'onOpenOverlayFromMainMenu'],
        data() {
            return {
                selectedMenuItem: null,
                copiedToClipboard: false,
                onCreateNewGameMessage: 'You are about to create a new game, this may affect the current game round.',
                onBackToStartPageMessage: 'You are about to leave the game, this may affect the current game round.'
            }
        },
        props: [
            'notOnLandingPage', 'banPollDisabled', 'inGameSection'
        ],
        methods: {
            onBackToHomeConfirm: function () {
                const currentLocation = location.href;
                if (currentLocation.includes('localhost')) {
                    location.assign('/')
                } else {
                    location.assign('/')
                }
            },
            onCreateOwnGameConfirm: function () {
                this.requestCreateGame();
                this.$store.commit('initStore', null);
            },
            closeMenu: function () {
                this.$emit('onCloseMenu', false)
            },
            backToHomePage: function () {
                this.selectedMenuItem = MenuItemKey.BACK_TO_HOME;
            },
            createOwnGame: function () {
                this.selectedMenuItem = MenuItemKey.CREATE_NEW_GAME;
                if (!this.notOnLandingPage) {
                    this.onConfirm();
                }
            },
            initializeBanVote: function () {
                if (!this.banPollDisabled) {
                    this.$emit('onDisplayBanPoll', true);
                }
            },
            requestCreateGame: function () {
                const createGameMessage = {
                    type: RequestMessageType.CREATE_GAME,
                    data: new GlobalPlayerCookie(this.globalPlayerCookie)
                }
                this.$websocketService.sendMessage(createGameMessage);
            },
            onConfirm: function () {
                console.log(this.selectedMenuItem)

                switch (this.selectedMenuItem) {
                    case MenuItemKey.CREATE_NEW_GAME :
                        this.onCreateOwnGameConfirm();
                        break;
                    case MenuItemKey.BACK_TO_HOME :
                        this.onBackToHomeConfirm();
                        break;
                    default: {
                        Logger.log('no valid selection')
                    }
                }
                this.selectedMenuItem = null;
            },
            onDecline: function () {
                this.selectedMenuItem = null;
            },
            onCopyShareLink: function () {
                if (!this.copiedToClipboard) {
                    const link = location.href;
                    navigator.clipboard.writeText(link).then(function () {
                        this.copiedToClipboard = true;
                        setTimeout(function () {
                            this.copiedToClipboard = false;
                        }.bind(this), 1500)
                    }.bind(this), function () {
                        this.copiedToClipboard = false;
                    });
                    document.execCommand("copy");
                }
            },
            onOpenOverlay: function (overlayKey) {
                this.$emit('onOpenOverlayFromMainMenu', overlayKey);
            }
        },
        computed: {
            menuQuestion: function () {
                switch (this.selectedMenuItem) {
                    case MenuItemKey.CREATE_NEW_GAME :
                        return this.onCreateNewGameMessage;
                    case MenuItemKey.BACK_TO_HOME :
                        return this.onBackToStartPageMessage;
                    default:
                        return 'Do you confirm ?';
                }
            },
            globalPlayerCookie: function () {
                return this.$store.state.globalPlayerCookie;
            },
            banPoll: function () {
                return this.$store.state.banPoll;
            },
            isConnected: function () {
                return this.$store.state.connectionState === ConnectionState.CONNECTED;
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .main-menu-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 10px;
        right: 10px;
        height: fit-content;
        box-shadow: 5px 5px 3px 0px rgb(94 79 163 / 65%);
        background-color: #8474e6;
        z-index: 55555;
        border-radius: 5px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .main-links-wrapper {
        display: flex;
        flex-direction: column;
        box-shadow: 0px 3px 6px 0px rgb(94 79 163 / 65%);
        padding: 8px;
        z-index: 9000;
        background-color: #6151aa;
        font-size: 18px;
        line-height: 18px;
    }


    .sub-links-wrapper {
        display: flex;
        flex-direction: column;
    }

    .sub-links {
        display: flex;
        align-items: center;
        cursor: pointer;
        z-index: 8000;
        background-color: #8474e6;
        box-shadow: 0px 3px 6px 0px rgb(94 79 163 / 65%);
        overflow: hidden;
        font-size: 15px;
        line-height: 15px;
        padding: 0 10px;
        position: relative;

        .copied-to-clipboard {
            position: absolute;
            padding: 5px;
            background-color: black;
            border-radius: 8px;
            animation: fade-copy-icon 0.2s linear;

            @keyframes fade-copy-icon {
                0% {
                    opacity: 0;
                }
                100% {
                    opacity: 1;
                }
            }
        }

        svg, img {
            width: 25px;
            height: auto;
            padding: 4px;
        }

        &.disabled {
            opacity: 0.75;

        }

        &:not(.disabled):active {
            z-index: 8000;
            transition: 0.1s ease-in;
            transform: scale(1.1);
        }

        &:not(.disabled):hover {
            background-color: #9384ec;
            transition: 0.2s ease-in-out;
        }
    }

    .close-button {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 15px;
        height: auto;
        cursor: pointer;
        z-index: 9001;

        &:active {
            width: 18px;
        }

    }

    p {
        margin: 0px 0px 0px 15px;
    }

    .menu-confirm-dialog-overlay {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.91);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 999999;

        svg {
            width: min(max(55px, 7vw), 100px);
            margin: 1vw;
        }

        span {
            width: min(max(250px, 40%), 700px);
            text-align: center;
            font-size: min(max(16px, 4vw), 24px);
            line-height: min(max(19px, 4.3vw), 30px);
            margin-bottom: 1vh;

        }

        .confirm-dialog-button-panel {
            display: grid;
            grid-template-columns: min-content min-content;
            grid-gap: calc(10px + 1.5vw);

        }
    }


    .sub-links-mobile {
        display: none;
    }

    .sub-links-mobile.not-landing-page {
        display: flex;
    }

    @media only screen and (max-aspect-ratio: 1/1) {
        .sub-links-mobile {
            display: flex;
        }
    }

</style>
