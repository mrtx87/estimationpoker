<template>

    <div class="app-wrapper">
      <landing-page></landing-page>
    </div>
</template>

<script>
    import LandingPage from "./components/landing-page";
    import {
        getCookie,
        setCookie,
        getRandomAvatar,
        setPrivacyCookie,
        removeCookie,
        removeAllCookies
    } from "@/services/cookie-service";
    import {GlobalPlayerCookie} from "./model/global-player-cookie.model";
    import * as avatars from "@/assets/avatar/avatar-constants.ts";
    import {GLOBAL_PLAYER_COOKIE_KEY, PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";
    import {ConnectionState} from "@/services/websocket-service";


    export default {
        name: "App",
        components: {
            LandingPage
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
