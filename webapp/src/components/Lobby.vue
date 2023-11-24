<template>
    <div class="lobby-wrapper">
        <div class="player-list-section">
            <span class="h1 lobby-title">Lobby</span>
            <transition-group name="lobby-message-group" tag="div" style="position: relative; max-height: 40px;"
                              mode="out-in">
                <div v-if="gameIsReadyToStart && !lobby.termAssignmentStartsTimer" class="lobby-message-group-item">
                    {{'Game is ready to start.' }}
                </div>
                <div v-if="!gameIsReadyToStart && !lobby.termAssignmentStartsTimer" class="lobby-message-group-item"> {{
                    ('Players Ready ' + readyPlayersCount + '/' + playersCount)}}
                </div>
                <div v-if="lobby.termAssignmentStartsTimer" class="lobby-message-group-item multiple-items"><span> Game will begin in </span>
                    <timer-container class="timer-layout plain-timer" v-bind:timer="lobby.termAssignmentStartsTimer"
                                     v-bind:format="'seconds-unit'"></timer-container>
                </div>
            </transition-group>
            <transition-group tag="div" name="lobby-players-transition" mode="out-in" class="player-list-container">
                <div class="lobby-players-transition-item" v-for="pl in sortedPlayers" :key="pl.id">
                    <lobby-avatar v-bind:lobbyPlayer="pl"
                                  :class="{'is-local-player': pl.id === localPlayerId}"
                                  v-bind:displayKickIcon="pl.role !== 'host' && localPlayerIsHost"></lobby-avatar>

                </div>
            </transition-group>

            <div class="lobby-copied-to-clipboard" v-if="copiedToClipboard">copied to clipboard</div>
            <button class="main-button lobby-copy-to-clipboard" style="margin-bottom:10px;"
                    :class="{'hide-copy-btn':copiedToClipboard}"
                    v-on:click="onLobbyCopyShareLink()"
                    title="Share the game link with friends to invite them"
            >
                <img src="../assets/copy-colored.svg" alt="copy invite link">
                invite link
            </button>

        </div>
        <div class="local-player-section">
            <avatar-configurator v-bind:globalPlayerCookie="localPlayerConfig"
                                 v-bind:disabled="(localLobbyPlayer.ready && localLobbyPlayer.role !== 'host') || lobby.termAssignmentStartsTimer"
                                 v-bind:isReady="localLobbyPlayer.ready"
                                 v-on:onToggleSelectorsHidden="avatarConfiguratorToggle"
                                 v-on:onChangeGlobalPlayerCookie="onAvatarConfiguratorChange($event)"></avatar-configurator>

            <span v-if="lobby.termAssignmentStartsTimer" class="game-starts-timer-text plain-btn m-10px-v">
                <span>Get Ready!</span>
                </span>

            <button :disabled="!gameIsReadyToStart || lobby.termAssignmentStartsTimer"
                    :class="{'disabled':!gameIsReadyToStart}"
                    v-if="(!editingAvatarElementType && localLobbyPlayer.role === 'host') && !lobby.termAssignmentStartsTimer"
                    class="main-button m-10px-v lobby-start-game-btn"
                    v-on:click="startGame()">
                <img src="../assets/create-game-icon-colored.svg" alt="start game">
                {{ 'start game' }}
            </button>

            <button v-if="(!editingAvatarElementType && localLobbyPlayer.role !== 'host') && !lobby.termAssignmentStartsTimer"
                    class="main-button m-10px-v"
                    v-on:click="togglePlayerReady()">
                {{ !localLobbyPlayer.ready ? 'I\'m ready' : 'I\'m not ready' }}
            </button>
            <button v-if="editingAvatarElementType" class="main-button main-button-placeholder m-10px-v">
                {{ 'placeholder' }}
            </button>
        </div>
        <div class="game-settings-section">
            <span class="game-settings-title">Game Settings</span>
            <div class="game-settings-content">
                <div class="game-topic-wrapper">
                    <span class="config-title" title="Choose a creative theme for your game">Game Theme</span>
                    <input ref='gameTopicInput' placeholder="Enter a Game Theme..." class="game-topic-input" type="text"
                           v-on:focusout="updateGameTopic($event)"
                           :class="{'disabled':lobbySettingsInputDisabled}"
                           :disabled="lobbySettingsInputDisabled"
                           v-on:keypress.enter="updateGameTopic" maxlength="25">
                </div>
                <div class="language-wrapper">
                    <span class="config-title" title="The language the game is played in">Language</span>
                    <language-selector v-bind:selection="localPlayerConfig.language"
                                       v-bind:disabled="lobbySettingsInputDisabled"
                                       v-on:onLangSelectionChange="onGameLanguageChange"
                                       class="language-selector"></language-selector>
                </div>
                <div class="time-to-post-question-wrapper">
                    <span class="config-title" title="The amount of time each player has to post a question">Time To Post Question</span>
                    <game-config-carousel-selector v-bind:options="timeOptions"
                                                   v-bind:disabled="lobbySettingsInputDisabled"
                                                   v-bind:selection="timePerQuestion"
                                                   v-on:selectionChange="updateTimePerQuestion($event)"
                    ></game-config-carousel-selector>
                </div>
                <div class="time-to-answer-wrapper">
                    <span class="config-title" title="The amount of time each player has to answer a question">Time to Answer Question</span>
                    <game-config-carousel-selector v-bind:options="timeOptions"
                                                   v-bind:disabled="lobbySettingsInputDisabled"
                                                   v-bind:selection="timeToAnswer"
                                                   v-on:selectionChange="updateTimeToAnswer($event)"
                    ></game-config-carousel-selector>
                </div>
                <div class="identity-assignment-wrapper">
                    <span class="config-title" title="Choose the way identities are assigned">Identity Assignment</span>
                    <list-selector v-bind:title="'Choose the way identities are assigned'"
                                   v-bind:disabled="lobbySettingsInputDisabled"
                                   v-bind:options="displayedAssignmentModeOptions"
                                   v-bind:selection="lobby.gameConfig.termSelectionMode"
                                   v-on:onListSelectionChange="onGuessedTermSelectionChange"
                    ></list-selector>
                </div>
                <div class="identity-assignment-wrapper">
                    <span class="config-title" title="Choose the amount of hints a player can request per game">Hints Per Game</span>
                    <HintsPerGameSelector
                            v-bind:selection="lobby.gameConfig.hintsPerPlayer"
                            v-bind:disabled="lobbySettingsInputDisabled"
                            v-on:onHintSelectionChange="onHintSelectionChange"
                    ></HintsPerGameSelector>
                </div>

                <div class="allow-cheat-sheet-selection"
                     :class="{'disabled':lobbySettingsInputDisabled}">
                    <div class="pseudo-checkbox" v-on:click="updateAllowCheatSheet()">
                        <img v-if="allowCheatSheet" src="../assets/check.svg">
                    </div>
                    <span class="cheat-sheet-title"
                          title="The cheat sheet lets you see the questions you have asked and their answers">Cheat Sheet</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {AuthenticatedRequest} from "../model/authenticated-request.model";
    import {RequestMessageType} from "../constants/vue-constants";
    import AvatarConfigurator from "@/components/avatar-configurator";
    import GameConfigCarouselSelector from "@/components/game-config-carousel-selector";
    import {setCookie} from "@/services/cookie-service";
    import {LobbyPlayerDto} from "@/model/dto/lobby-player-dto";
    import ListSelector from "@/components/list-selector";
    import {GameConfig} from "@/model/game-config.model";
    import LobbyAvatar from "@/components/lobby-avatar";
    import {AssignmentModes, Roles} from "@/constants/vue-constants";
    import LanguageSelector from "@/components/language-selector";
    import HintsPerGameSelector from "@/components/hints-per-game-selector";
    import TimerContainer from "@/components/timer-container";

    export default {
        name: 'Lobby',
        components: {
            TimerContainer,
            ListSelector,
            LobbyAvatar,
            AvatarConfigurator,
            GameConfigCarouselSelector,
            LanguageSelector,
            HintsPerGameSelector
        },
        mounted() {
            if (this.lobby) {
                this.allowCheatSheet = this.lobby.gameConfig?.allowCheatSheet;
                this.onGameTopicUpdate(this.lobby.gameConfig?.gameTopic);
            }
        },
        watch: {
            lobby: function (newLobby, oldLobby) {
                if (newLobby && 'gameConfig' in newLobby) {
                    this.allowCheatSheet = newLobby.gameConfig.allowCheatSheet;
                    this.onGameTopicUpdate(newLobby.gameConfig.gameTopic);
                }
            }
        },
        data() {
            return {
                allowCheatSheet: false,
                gameTopic: '',
                timeOptions: [
                    {value: 10, label: '10 sec'},
                    {value: 20, label: '20 sec'},
                    {value: 30, label: '30 sec'},
                    {value: 45, label: '45 sec'},
                    {value: 60, label: '60 sec'}
                ],
                assigmentModeOptions: [
                    {
                        value: AssignmentModes.ASSIGNEE_KNOWN,
                        label: 'Assign Identity',
                        tooltip: 'The player to whom you assign the identity is known to you.'
                    },
                    {
                        value: AssignmentModes.SELECT_ASSIGNEE,
                        label: 'Pick Player & Assign Identity',
                        tooltip: 'You pick the player to whom you assign the identity'
                    },
                    {
                        value: AssignmentModes.FULL_RANDOM,
                        label: 'Assign Identity To Random Player',
                        tooltip: 'The player to whom you assign the identity is known to you.'
                    }
                ],
                editingAvatarElementType: null,
                copiedToClipboard: false
            }
        },
        methods: {
            onGameTopicUpdate: function (gameTopicUpdate) {
                if (gameTopicUpdate !== this.gameTopic) {
                    this.gameTopic = gameTopicUpdate;
                    const gameTopicInput = this.$refs.gameTopicInput;
                    gameTopicInput.value = gameTopicUpdate;
                }
            },
            onLobbyCopyShareLink: function () {
                if (!this.copiedToClipboard) {
                    const link = location.href;
                    navigator.clipboard.writeText(link).then(function () {
                        this.copiedToClipboard = true;
                        setTimeout(function () {
                            this.copiedToClipboard = false;
                        }.bind(this), 1000)
                    }.bind(this), function () {
                        this.copiedToClipboard = false;
                    });
                    document.execCommand("copy");
                }
            },
            togglePlayerReady: function () {
                const changeReadyStateRequest = new AuthenticatedRequest({
                    type: RequestMessageType.PLAYER_IN_LOBBY_READY,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: !this.localLobbyPlayer.ready
                });
                this.$websocketService.sendMessage(changeReadyStateRequest);
            },
            startGame: function () {
                if (this.gameIsReadyToStart) {
                    this.sendStartGame();
                }
            },
            updateTimeToAnswer: function (value) {
                const updateGameConfig = {...this.$store.state.lobby.gameConfig};
                updateGameConfig.timeToAnswer = value;
                this.sendGameConfigUpdate(updateGameConfig);
            },
            updateTimePerQuestion: function (value) {
                const updateGameConfig = {...this.$store.state.lobby.gameConfig};
                updateGameConfig.timePerQuestion = value;
                this.sendGameConfigUpdate(updateGameConfig);
            },
            updateAllowCheatSheet: function () {
                if (this.localLobbyPlayer.role === Roles.HOST && !this.lobby.termAssignmentStartsTimer) {
                    const updateGameConfig = {...this.$store.state.lobby.gameConfig};
                    updateGameConfig.allowCheatSheet = !this.allowCheatSheet;
                    this.sendGameConfigUpdate(updateGameConfig);
                }
            },
            updateGameTopic: function (event) {
                const inputElem = event.target;
                const inputValue = inputElem.value;
                const gameTopic = inputValue.substring(0, Math.min(25, inputValue.length));
                if (this.localLobbyPlayer.role === Roles.HOST && !this.lobby.termAssignmentStartsTimer) {
                    if (gameTopic !== this.lobby?.gameConfig?.gameTopic) {
                        const updateGameConfig = {...this.$store.state.lobby.gameConfig};
                        updateGameConfig.gameTopic = gameTopic;
                        this.sendGameConfigUpdate(updateGameConfig);
                        return;
                    }
                }
                inputElem.value = this.gameTopic;
            },
            onGuessedTermSelectionChange: function (selectedTerm) {
                const updateGameConfig = {...this.$store.state.lobby.gameConfig};
                updateGameConfig.termSelectionMode = selectedTerm;
                this.sendGameConfigUpdate(updateGameConfig);
            },
            onHintSelectionChange: function (hintCount) {
                const updateGameConfig = {...this.$store.state.lobby.gameConfig};
                updateGameConfig.hintsPerPlayer = hintCount;
                this.sendGameConfigUpdate(updateGameConfig);
            },
            sendGameConfigUpdate: function (updatedGameConfig) {
                const changeReadyStateRequest = new AuthenticatedRequest({
                    type: RequestMessageType.HOST_UPDATE_GAME_CONFIG_IN_LOBBY,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: new GameConfig(updatedGameConfig)
                });
                this.$websocketService.sendMessage(changeReadyStateRequest);
            },
            sendStartGame: function () {
                const startGameRequest = new AuthenticatedRequest({
                    type: RequestMessageType.START_GAME_IN_LOBBY,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: null
                });
                this.$websocketService.sendMessage(startGameRequest);
            },
            avatarConfiguratorToggle: function (value) {
                this.editingAvatarElementType = value;
            },
            onGameLanguageChange: function (language) {
                const updatedLobby = {...this.$store.state.lobby};
                updatedLobby.gameConfig.language = language;
                this.$store.commit('updateLobby', updatedLobby);
                this.sendGameConfigUpdate(updatedLobby.gameConfig);
            },
            onAvatarConfiguratorChange: function (glbCookieUpdate) {
                setCookie('wtfi_globalPlayer', JSON.stringify(glbCookieUpdate));
                const changeReadyStateRequest = new AuthenticatedRequest({
                    type: RequestMessageType.UPDATE_PLAYER_IN_LOBBY,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: new LobbyPlayerDto({
                        ...this.localLobbyPlayer,
                        avatar: glbCookieUpdate.avatar,
                        name: glbCookieUpdate.name
                    })
                });
                this.$websocketService.sendMessage(changeReadyStateRequest);
            }
        },
        computed: {
            gameIsReadyToStart: function () {
                return this.lobby && this.lobby.lobbyPlayers.length > 1 && this.lobby.lobbyPlayers.every(p => p.ready);
            },
            sortedPlayers: function () {
                return this.lobby ? this.lobby.lobbyPlayers : [];
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            localLobbyPlayer: function () {
                return this.$store.state.lobby?.lobbyPlayers?.find(lp => lp.id === this.localPlayerId);
            },
            localPlayerIsHost: function () {
                const localLobbyPlayer = this.localLobbyPlayer;
                return localLobbyPlayer ? (localLobbyPlayer.role === 'host') : false;
            },
            lobby: function () {
                return this.$store.state.lobby;
            },
            timeToAnswer: function () {
                return this.$store.state.lobby.gameConfig.timeToAnswer;
            },
            timePerQuestion: function () {
                return this.$store.state.lobby.gameConfig.timePerQuestion;
            },
            language: function () {
                return this.$store.state.lobby.gameConfig.language;
            },
            localPlayerConfig: function () {
                return {...this.localLobbyPlayer, language: this.language};
            },
            readyPlayersCount: function () {
                return this.lobby ? this.lobby.lobbyPlayers.filter(p => p.ready).length : 0;
            },
            playersCount: function () {
                return this.lobby ? this.lobby.lobbyPlayers.length : 0;
            },
            displayedAssignmentModeOptions: function () {
                return this.assigmentModeOptions.map(option => {
                    const newOption = {...option, enabled: true}
                    if (this.playersCount <= 2) {
                        if (option.value !== AssignmentModes.ASSIGNEE_KNOWN) {
                            newOption.enabled = false;
                        }
                    }
                    return newOption;
                });
            },
            lobbySettingsInputDisabled: function () {
                return this.localLobbyPlayer.role !== 'host' || this.lobby.termAssignmentStartsTimer;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .lobby-wrapper {
        width: 95%;
        max-width: 1800px;
        display: grid;
        grid-template-columns: 1fr min-content min-content;
        grid-template-rows: 100%;
        grid-gap: 3vw;
        padding: 1%;
        margin: 1%;
        overflow: hidden;
        background: #0000001c;
        border-radius: 10px;
    }

    .lobby-title {
        justify-self: center;
        padding: 10px;
        color: #a295dea6;
    }

    .player-list-section {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .player-list-container {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 5px;
        overflow-y: auto;
    }

    .lobby-players-transition-item {
        transition: all 0.5s ease;
    }

    .lobby-players-transition-leave-active {

    }

    .lobby-players-transition-leave-to {
        opacity: 0;
        transform: scale(0.1);
    }

    .lobby-players-transition-enter-from {
        opacity: 0;
        transform: scale(0.1);
    }

    .local-player-section {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        position: relative;
    }


    .game-settings-section {
        width: 325px;
        display: flex;
        flex-direction: column;
        justify-self: center;
        align-self: center;
        align-items: center;
        position: relative;
    }

    .game-settings-title {
        font-size: min(max(20px, 1.4vw), 25px);
        line-height: min(max(20px, 1.4vw), 25px);
        color: #322046;
    }

    .game-settings-content {
        display: flex;
        flex-direction: column;
        border-radius: 22px;
        color: var(--primary-light-text-color);
        text-align: center;

        .config-title {
            padding: 5px 0px 2px 0;
            font-size: min(max(10px, 1vw), 13px);
            line-height: min(max(10px, 1vw), 13px);
            text-shadow: 1px 1px 1px black;
        }

        .language-wrapper, .time-to-post-question-wrapper, .time-to-answer-wrapper, .identity-assignment-wrapper, .game-topic-wrapper {
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            padding: 0 4px 4px 4px;
            margin: 0.5vh 2px;
            position: relative;
            background-color: #00000025;
            max-width: min(max(150px, 20vw), 320px);

            .game-topic-input {
                font-family: bungee;
                background-color: #5e488a;
                border: 3px solid #BEB4E9;
                color: white;
                -webkit-appearance: none;
                -moz-text-align-last: center;
                text-align-last: center;
                opacity: 0.9;
                text-align: center;
                z-index: 9999;
                cursor: pointer;
                line-height: 13px;
                font-size: 12px;
                width: 100%;
                box-sizing: border-box;
                border-radius: 15px;
                height: 25px;
                padding: 0;

                &.disabled {
                    cursor: not-allowed;
                }

                &::placeholder {
                    color: #ffffff88;
                }
            }
        }
    }

    .allow-cheat-sheet-selection {
        max-width: min(max(150px, 20vw), 320px);
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 10px 10px 10px 10px;
        justify-content: center;
        margin: 0.5vh;
        position: relative;
        background-color: #00000025;
        border-radius: 10px;

        &.disabled {
            cursor: not-allowed;
        }

        .cheat-sheet-title {
            margin-left: 8px;
            font-size: 14px;
            text-shadow: 1px 1px 1px black;
        }

        .pseudo-checkbox {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 25px;
            height: 25px;
            border-radius: 4px;
            box-shadow: 2px 2px 2px 1px #4a2e9e;
            margin: 2px;
            background-color: white;
            overflow: visible;

            img {
                width: 130%;
                height: 130%;
                min-width: 130%;
                min-height: 130%;
            }
        }

    }

    @media only screen and (max-aspect-ratio: 1/1), screen and (max-width: 1020px) {
        .lobby-wrapper {
            grid-template-columns: 100%;
            grid-template-rows: max-content auto max-content;
            border: none;
            box-shadow: unset;
            overflow-x: hidden;
            overflow-y: auto;
            width: 98%;
        }
        .game-settings-section {
            font-size: 12px !important;
            line-height: 17px !important;
            margin-bottom: 50px;
        }

        .lobby-start-game-btn {
            position: relative !important;
        }

        .language-wrapper, .time-to-post-question-wrapper, .time-to-answer-wrapper, .identity-assignment-wrapper, .game-topic-wrapper, .allow-cheat-sheet-selection {
            max-width: 100% !important;
        }

        .lobby-copy-to-clipboard {
            position: relative !important;
        }
    }

    .language-selector {
        font-family: bungee;
        background-color: #5e488a;
        border: 3px solid #BEB4E9;
        border-radius: 15px;
        color: white;
        -webkit-appearance: none;
        -moz-text-align-last: center;
        text-align-last: center;
        opacity: 0.9;
        z-index: 9999;
        cursor: pointer;
        line-height: 16px;
        font-size: 13px;
        width: 100%;
        height: 25px;
        padding: 0px 10px;
    }

    .language-selector:hover {
        opacity: 1;
    }

    .game-starts-timer-text {
        display: flex;
        width: max-content;
        text-align: center;
        color: white;
        text-shadow: calc(2px + 0.1vw) calc(2px + 0.1vw) calc(2px + 0.1vw) black;
    }

    .lobby-message-group-item {
        font-size: calc(10px + 1vw);
        line-height: calc(10px + 1vw);
        width: max-content;
        text-align: center;
        min-width: 300px;
        text-shadow: calc(2px + 0.1vw) calc(2px + 0.1vw) calc(2px + 0.1vw) black;
        transition: all .3s ease 0s;

        &.multiple-items {
            display: flex;
        }
    }


    .lobby-message-group-leave-to {
        opacity: 0;
        margin-left: -100%;
    }

    .lobby-message-group-leave-active {
    }

    .lobby-message-group-enter-active {
        position: absolute;
        opacity: 0;
        margin-left: -100%;
        z-index: 99;
    }

    .lobby-copied-to-clipboard {
        position: absolute;
        left: 0;
        bottom: 5px;
        padding: 5px;
        background-color: black;
        border-radius: 8px;
        animation: fade-lobby-copy-icon 0.2s linear;
        z-index: 99;
        line-height: 15px;
        @keyframes fade-lobby-copy-icon {
            0% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }

    .lobby-copy-to-clipboard {
        transition: all 0.1s ease-in-out;
        position: absolute;
        left: 0;
        bottom: -10px;
        font-size: 16px;

        img {
            width: min(max(14px, 2vw), 25px);
            margin-right: 8px;
        }

        &.hide-copy-btn {
            opacity: 0;
        }
    }

    .lobby-start-game-btn {
        position: absolute;
        bottom: 0;

        img {
            width: 31px;
            margin-right: 8px;
        }
    }

</style>
