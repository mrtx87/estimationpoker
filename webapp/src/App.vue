<template>
    <div class="app-wrapper">
        <bg-sound :class="{'hidden-bg-sound': displayedVue === 'LandingPage'}"> </bg-sound>
        <div v-if="isConnectionNotPossible"  class="connection-not-possible">
            <img class="warn-icon" src="./assets/radiation-solid.svg">
            <span>
                    Unfortunately, we can not reach the servers.
            </span>
            <span>
                 Please try again later.
            </span>
        </div>

        <div v-if="connectingToServer" class="connecting-to-server">
            Connecting to servers...
        </div>

        <voice-chat-toggle v-if="anyPlayers" v-on:onToggleMuteAll="onToggleMuteAll"
                           v-on:onToggleMuteLocalPlayer="onToggleMuteLocalPlayer"
                           v-on:onEnterVoiceChat="onEnterVoiceChat($event)"
        ></voice-chat-toggle>
        <ban-poll v-if="currentGame && (banPoll || displayBanPollMenu)" v-bind:banPoll="banPoll"
                  v-bind:players="currentGame.gamePlayers" v-on:onClose="onDisplayBanPollMenu($event)">
        </ban-poll>
        <transition name="change-section" mode="out-in">
            <div class="footer-overlay" v-if="displayedOverlayId" v-on:click="overlayClicked($event.target)">
                <div class="footer-overlay-content">
                    <svg v-if="isOverlayClosePermitted" v-on:click="closeOverIfPermitted()" class="close-overlay"
                         xmlns="http://www.w3.org/2000/svg" width="28.991"
                         height="28.991" viewBox="0 0 28.991 28.991">
                        <rect id="Rectangle_32" data-name="Rectangle 32" width="36" height="5" rx="2.5"
                              transform="translate(3.536) rotate(45)" fill="#fff"/>
                        <rect id="Rectangle_33" data-name="Rectangle 33" width="36" height="5" rx="2.5"
                              transform="translate(28.991 3.536) rotate(135)" fill="#fff"/>
                    </svg>
                    <DsgvoCookieModal v-if="displayedOverlayId === 'DsgvoCookie'"
                                      v-on:onUpdatePrivacyPolicyConfirmState="onDsgvoConfirmUpdate($event)"
                                      v-bind:hasConfirmed="hasConfirmedPrivacyPolicy"></DsgvoCookieModal>
                    <TermsOfUse v-if="displayedOverlayId === 'TermsOfUse'"></TermsOfUse>
                    <Impressum v-if="displayedOverlayId === 'Impressum'"></Impressum>
                </div>
            </div>
        </transition>
        <transition name="change-section" mode="out-in">
            <component :is="displayedVue"></component>
        </transition>

        <!-- absolute stuff -->
        <transition name="lobby-host-disconnected">
            <div class="disconnect-warning-container" v-if="lobby && lobby.hostDisconnected">
           <span>Host has left the Lobby.<br>
            A new host will be picked if the host is not returning in time.</span>
                <timer-container v-bind:timer="lobby?.hostDisconnected"
                                 v-bind:format="'seconds-unit'"></timer-container>
            </div>
        </transition>

        <transition name="term-assignment-disconnected">
            <div class="disconnect-warning-container" v-if="termAssignment && termAssignment.backToLobbyTimer">
           <span>Not all players seem to be connected.
               <br>If they do not reconnect in time, the game returns to the lobby.
           </span>
                <timer-container v-bind:timer="termAssignment.backToLobbyTimer"
                                 v-bind:format="'seconds-unit'"></timer-container>
            </div>
        </transition>

        <transition name="term-assignment-disconnected">
            <div class="disconnect-warning-container" v-if="gameOver && gameOver.hostDisconnectedTimer">
           <span>Host has left the Game.<br>
            A new host will be picked if the host is not returning in time.
           </span>
                <timer-container v-bind:timer="gameOver.hostDisconnectedTimer"
                                 v-bind:format="'seconds-unit'"></timer-container>
            </div>
        </transition>

        <div class="logo">
            <img src="./assets/wtfiLogo.svg" alt="wtfai logo">
        </div>

        <button style="z-index: 55555;" :disabled="!isConnected" v-on:click="openMenu()" aria-label="open menu"
                class="plain-button main-menu-button" title="open menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="27" viewBox="0 0 30 27">
                <rect id="Rectangle_6" data-name="Rectangle 6" width="30" height="5" rx="2.5" fill="#fff"/>
                <rect id="Rectangle_7" data-name="Rectangle 7" width="30" height="5" rx="2.5"
                      transform="translate(0 11)"
                      fill="#fff"/>
                <rect id="Rectangle_8" data-name="Rectangle 8" width="30" height="5" rx="2.5"
                      transform="translate(0 22)"
                      fill="#fff"/>
            </svg>
        </button>

        <InstantMessageWrapper v-bind:messages="instantMessages"></InstantMessageWrapper>

        <transition name="menuslide">
            <main-menu v-if="displayMenu" v-on:onCloseMenu="closeMenu"
                       v-on:onDisplayBanPoll="onDisplayBanPollMenu($event)"
                       v-on:onOpenOverlayFromMainMenu="onOpenOverlayFromMainMenu($event)"
                       v-bind:notOnLandingPage="displayedVue !== 'LandingPage'"
                       v-bind:inGameSection="displayedVue === 'Game'"
                       v-bind:banPollDisabled="!currentGame || currentGame.gamePlayers.length < 3 || banPoll || displayBanPollMenu"></main-menu>
        </transition>

        <transition name="termassignoverlay">
            <player-term-assignment-overlay
                    class="overlay-transition"
                    v-if="playerAssignee && !playerAssignee.assignment.term"
                    v-bind:termAssigmentPlayer="playerAssignee"
                    v-bind:mode="termAssignment?.mode"></player-term-assignment-overlay>
        </transition>


        <button v-if="anyPlayers" class="main-button alt-button-right" @click="externalToggleOpenPlayerList()">
            <img src="@/assets/users.svg" class="users-icon" alt="players"> Players
        </button>

        <PlayerListAndVoiceChat
                ref="PlayerListAndVoiceChat"
                v-if="anyPlayers"
                v-bind:players="anyPlayers" v-bind:disconnectedIds="currentGame?.disconnectedIds"
                v-bind:extOpen="extOpenPlayerList"
                v-bind:voiceChatSignalUpdate="voiceChatSignalUpdate"
                v-bind:playersInVoiceChat="playersInVoiceChat"
                v-on:onInnerToggleOpenCloseChange="onInnerPlayerListChange($event)"></PlayerListAndVoiceChat>
    </div>
</template>

<script>
    import Lobby from "./components/Lobby";
    import Impressum from "./components/impressum";
    import LandingPage from "./components/landing-page";
    import Game from "./components/Game";
    import DsgvoCookieModal from "./components/dsgvo-cookie";
    import BanPoll from "./components/ban-poll";
    import VoiceChatToggle from "./components/voice-chat-toggle";
    import TermsOfUse from "./components/terms-of-use";
    import {
        getCookie,
        setCookie,
        getRandomAvatar,
        setPrivacyCookie,
        removeCookie,
        removeAllCookies
    } from "@/services/cookie-service";
    import {GlobalPlayerCookie} from "./model/global-player-cookie.model";
    import TimerContainer from "@/components/timer-container";
    import TermAssignmentSection from "@/components/term-assigment-section";
    import MainMenu from "@/components/main-menu";
    import BgSound from "@/components/bg-sound";
    import GameOverSection from "@/components/GameOverSection";
    import GameOverSectionSlider from "@/components/GameOverSectionSlider";
    import PlayerTermAssignmentOverlay from "@/components/player-term-assigment-overlay";
    import * as avatars from "@/assets/avatar/avatar-constants.ts";
    import {GLOBAL_PLAYER_COOKIE_KEY, MenuItemKey, PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";
    import InstantMessageWrapper from "@/components/instant-message";
    import PlayerListAndVoiceChat from "@/components/player-list-and-voice-chat";
    import {ConnectionState} from "@/services/websocket-service";


    export default {
        name: "App",
        components: {
            Impressum,
            DsgvoCookieModal,
            TermsOfUse,
            InstantMessageWrapper,
            PlayerTermAssignmentOverlay,
            TermAssignmentSection,
            TimerContainer,
            LandingPage,
            Lobby,
            Game,
            GameOverSectionSlider,
            MainMenu,
            BanPoll,
            VoiceChatToggle,
            PlayerListAndVoiceChat,
            BgSound
        },
        created() {
            this.initUserRandomOrFromCookie();
            this.hasConfirmedPrivacyPolicy = getCookie(PRIVACY_POLICY_COOKIE_KEY) == 'true';
            if (this.hasConfirmedPrivacyPolicy) {
                this.initAppOnPrivacyPolicyConfirmation();
            } else {
                this.openOverlay('DsgvoCookie')
            }
        },
        data: function () {
            return {
                displayMenu: false,
                none: '',
                hairOptions: [...avatars.avatarHairsOptions],
                headsOptions: [...avatars.avatarHeadsOptions],
                shirtOptions: [...avatars.avatarShirtsOptions],
                colorOptions: [...avatars.colorOptions],
                hasConfirmedPrivacyPolicy: false,
                displayBanPollMenu: false,
                extOpenPlayerList: false
            }
        },
        methods: {
            onToggleMuteAll: function (event) {
                this.$refs.PlayerListAndVoiceChat.toggleMuteAll();
            },
            onToggleMuteLocalPlayer: function () {
                this.$refs.PlayerListAndVoiceChat.toggleMuteLocalPlayer();
            },
            onEnterVoiceChat: function (value) {
                if (value) {
                    this.$refs.PlayerListAndVoiceChat.enterVoiceChat();
                } else {
                    this.$refs.PlayerListAndVoiceChat.leaveVoiceChat();
                }
            },
            overlayClicked: function (target) {
                if (target.className === 'footer-overlay') {
                    this.closeOverIfPermitted();
                }
            },
            closeOverIfPermitted() {
                if (this.isOverlayClosePermitted) {
                    this.openOverlay('');
                }
            },
            initAppOnPrivacyPolicyConfirmation: function () {
                this.initSessionId();
                this.$websocketService.registerStore(this.$store);
                this.$websocketService.establishConnection();
            },
            onDsgvoConfirmUpdate: function (confirmed) {
                if (!confirmed) {
                    this.hasConfirmedPrivacyPolicy = false;
                    removeAllCookies();
                } else {
                    this.hasConfirmedPrivacyPolicy = true;
                    setPrivacyCookie(PRIVACY_POLICY_COOKIE_KEY, confirmed);
                    setCookie(GLOBAL_PLAYER_COOKIE_KEY, JSON.stringify(this.$store.state.globalPlayerCookie));
                    if (!this.$websocketService.wsConnection) {
                        this.initAppOnPrivacyPolicyConfirmation();
                    } else {
                        if (this.gameSessionId && this.playerAuthentication.secret) {
                            setCookie(this.gameSessionId, this.playerAuthentication.secret);
                        }
                    }
                }
                if (this.isOverlayClosePermitted) {
                    this.openOverlay('');
                }
            },
            initUserRandomOrFromCookie: function () {
                let globalPlayerCookie = getCookie(GLOBAL_PLAYER_COOKIE_KEY);
                let privacyPolicyConfirmed = getCookie(PRIVACY_POLICY_COOKIE_KEY);
                if (privacyPolicyConfirmed && globalPlayerCookie) {
                    globalPlayerCookie = new GlobalPlayerCookie(globalPlayerCookie);
                } else {
                    const randomAvatar = getRandomAvatar(
                        this.headsOptions.length,
                        this.hairOptions.length,
                        this.shirtOptions.length,
                        this.colorOptions);
                    let randomNumber = Date.now().toString();
                    randomNumber = randomNumber.substring(randomNumber.length - 3, randomNumber.length);
                    const newGlobalPlayerCookie = new GlobalPlayerCookie({
                        name: 'funnyname' + randomNumber,
                        avatar: randomAvatar,
                        bgSoundMuted: false
                    })
                    setCookie('wtfi_globalPlayer', JSON.stringify(newGlobalPlayerCookie));
                    globalPlayerCookie = newGlobalPlayerCookie;
                }
                this.$store.commit('updateGlobalCookie', globalPlayerCookie);
            },
            initSessionId: function () {
                const url = window.location.href;
                const index = url.lastIndexOf('/');
                const sessionId = url.substring(index + 1);
                if (sessionId) {
                    this.$store.commit('updateSessionId', sessionId)
                    this.$store.commit('updateJoining', true)
                }
            },
            openMenu: function () {
                this.displayMenu = true;
            },
            closeMenu: function (event) {
                this.displayMenu = false;
            },
            openOverlay: function (id) {
                this.$store.commit('updateDisplayedOverlayId', id)
            },
            onDisplayBanPollMenu: function (display) {
                this.displayBanPollMenu = display;
            },
            onOpenOverlayFromMainMenu: function (overlayKey) {
                this.closeMenu();
                this.openOverlay(overlayKey);
            },
            externalToggleOpenPlayerList: function () {
                this.extOpenPlayerList = !this.extOpenPlayerList;
            },
            onInnerPlayerListChange: function (value) {
                this.extOpenPlayerList = value;
            },
        },
        computed: {
            voiceChatSignalUpdate: function () {
                return this.$store.state.voiceChatSignalUpdate;
            },
            displayedVue: function () {
                if (this.playerId) {
                    if (this.lobby) {
                        return 'Lobby';
                    }

                    if (this.termAssignment && !this.termAssignment.gameStartsTimer) {
                        return 'TermAssignmentSection';
                    }

                    if (this.currentGame || this.termAssignment?.gameStartsTimer) {
                        return 'Game';
                    }

                    if (this.gameOver) {
                        return 'GameOverSectionSlider';
                    }
                }
                return this.joining ? null : 'LandingPage';
            },
            playerId: function () {
                return this.$store.state.playerId;
            },
            lobby: function () {
                return this.$store.state.lobby;
            },
            termAssignment: function () {
                return this.$store.state?.termAssignment;
            },
            currentGame: function () {
                return this.$store.state.currentGame;
            },
            gameOver: function () {
                return this.$store.state.gameOver;
            },
            assignmentPlayers: function () {
                return this.$store.state.termAssignment?.assignmentPlayers;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            playerAssignee: function () {
                return this.assignmentPlayers ? this.assignmentPlayers.find(ap => ap.assignment.assignerId === this.localPlayerId) : null;
            },
            currentNotification: function () {
                return this.$store.state.currentNotification;
            },
            instantMessages: function () {
                return this.$store.state.instantMessages;
            },
            joining: function () {
                return this.$store.state.joining;
            },
            gameSessionId: function () {
                return this.$store.state.gameSessionId;
            },
            playerAuthentication: function () {
                return this.$store.state.playerAuthentication;
            },
            isOverlayClosePermitted: function () {
                return this.hasConfirmedPrivacyPolicy;
            },
            banPoll: function () {
                return this.$store.state.banPoll;
            },
            playersInVoiceChat: function () {
                return this.$store.state.playersInVoiceChat || [];
            },
            anyPlayers: function () {
                if (this.playerId) {
                    if (this.lobby) {
                        return this.$store.state.lobby.lobbyPlayers;
                    }

                    if (this.termAssignment) {
                        return this.$store.state.termAssignment.assignmentPlayers;
                    }

                    if (this.currentGame) {
                        return this.$store.state.currentGame.gamePlayers;
                    }

                    if (this.gameOver) {
                        return this.$store.state.gameOver.connectedPlayers;
                    }
                }
                return null;
            },
            isConnected: function () {
                return this.$store.state.connectionState === ConnectionState.CONNECTED;
            },
            isConnectionNotPossible: function () {
                return this.$store.state.connectionState === ConnectionState.CONNECTION_NOT_POSSIBLE;
            },
            connectingToServer: function () {
                return this.$store.state.connectionState === ConnectionState.DISCONNECTED || this.$store.state.connectionState === ConnectionState.PREINIT;
            },
            displayedOverlayId: function () {
                return this.$store.state.displayedOverlayId;
            }
        }
    };
</script>

<style lang="scss">
    .app-wrapper {
        width: 100%;
        height: 100%;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-x: hidden;

        .hidden-bg-sound {
          display: none !important;
        }

        .connection-not-possible {
            position: absolute;
            background-color: #000000dd;
            border-radius: 8px;
            font-size: calc(12px + 1.25vw);
            line-height: calc(15px + 1.35vw);
            padding: 15px;
            z-index: 99999;
            text-align: center;
            box-shadow: 3px 3px 3px 1px #111111;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 15px 0;
            max-width: 800px;

            .warn-icon {
                min-width: 50px;
                width: 15%;
                height: auto;
            }
        }

        .connecting-to-server {
            position: absolute;
            font-size: calc(7px + 0.1vw);
            line-height: calc(7px + 0.1vw);
            z-index: 99999;
            bottom: 5px;
            right: 5px;
        }
    }

    .overlay-transition {
        transition: all 0.25s;
    }

    .termassignoverlay-enter-active {
        animation: opIn 0.25s;
    }

    .termassignoverlay-leave-active {
        opacity: 0;
    }

    @media only screen and (max-width: 800px) {
        .app-wrapper {
            height: 100%;
            overflow-y: auto;
        }

        .header {
            display: grid !important;
        }
    }


    .logo {
        position: absolute;
        padding: 5px;
        top: 0px;
        left: 0px;
        z-index: 99999;
    }

    .logo img {
        height: calc(50px + 8vw);
        width: auto;
    }

    .menu-button {
        position: absolute;
        padding: 5px;
        top: 0;
        right: 0;
        z-index: 9999;
    }

    .menu-button svg {
        width: 30px;
    }

    .disconnect-warning-container {
        z-index: 999999;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 8px;
        width: 40vw;
        min-width: 250px;
        max-width: 600px;
        position: fixed;
        top: 10px;
        justify-self: center;
        background-color: rgb(98, 6, 2);
        padding: 15px;
        font-size: calc(12px + 1vw);
        line-height: calc(14px + 1vw);
        font-family: 'Source Sans Pro', sans-serif;
        box-shadow: rgb(61, 6, 2) 2.95px 2.95px 0.6px;

    }

    .disconnect-warning-container span {
        width: 100%;
        display: inline-block;
        margin: 5px;
    }

    /* slide in of pages */
    .change-section-enter-active {
        transition: all 0.33s ease;
    }

    .change-section-leave-active {
        transition: all 0.33s ease;
    }

    .change-section-leave-to {
        opacity: 0;
    }

    .change-section-enter-from {
        opacity: 0;
    }

    .main-menu-button {
        position: absolute;
        top: 10px;
        right: 5px;
        transition: all 0.25s;

        &:hover {
            transform: scale(1.05);
        }

        &:active {
            transition: all 0.1s;
            transform: scale(0.95);
        }
    }

    .menuslide-enter-active, .menuslide-leave-active {
        transition: all 0.2s ease;
    }

    .menuslide-leave-to {
        position: absolute;
        transform: translateX(110%);
    }

    .menuslide-enter-from {
        position: absolute;
        transform: translateX(110%);
    }


    .lobby-host-disconnected-enter-active, .term-assignment-disconnected-enter-active {
        animation: lobby-host-disconnected-slide 0.5s;
    }

    .lobby-host-disconnected-leave-active, .term-assignment-disconnected-leave-active {
        animation: lobby-host-disconnected-slide 0.33s reverse;
    }

    @keyframes lobby-host-disconnected-slide {
        0% {
            transform: translateY(-100%);
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }


    .footer-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999999;
        display: flex;
        align-items: center;
        justify-content: center;

        .footer-overlay-content {
            position: relative;
            max-height: 60vh;
            overflow: hidden;
            border-radius: 15px;

            .close-overlay {
                position: absolute;
                right: 15px;
                top: 15px;
                width: 1.5vw;
                min-width: 15px;
                height: auto;
                cursor: pointer;
            }
        }
    }

    .alt-button-right {
        position: absolute !important;
        top: calc(100% - 60px);
        max-height: min(max(35px, 2vw), 50px);
        right: 2vw;
        z-index: 99999;

        @media only screen and (max-width: 800px) {
            top: calc(100% - 50px);
        }

        .users-icon {
            width: min(max(25px, 3vw), 35px);
            margin-right: 5px;
        }
    }

</style>
