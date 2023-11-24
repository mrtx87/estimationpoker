<template>
    <div class="game-over-slide-container">
        <div class="slide-content-wrapper">
            <div class="slide-button-panel actions-panel-left">
                <img v-if="gameResults && gameResults.length > 1" class="arrow-btn left-arrow" src="../assets/arrow-left.svg" v-on:click="previousResults()">
            </div>
            <transition-group tag="div" mode="out-in" name="game-over-section-slider-transition" class="slide-content">
                <game-over-section v-for="elem in displayedGameResults" :key="elem.gameId"
                                   class="game-over-section-slider-transition-item"
                                   v-bind:currentGameOverResult="elem"></game-over-section>
            </transition-group>
            <div class="slide-button-panel actions-panel-right">
                <img v-if="gameResults && gameResults.length > 1" class="arrow-btn right-arrow" v-on:click="nextResults()" src="../assets/arrow-right.svg">
            </div>
        </div>

        <div class="actions-panel">
            <button v-if="isHost" v-on:click="requestBackToLobby()" class="main-button">
                Back to Lobby
            </button>
        </div>
    </div>
</template>

<script>
    import GameOverSection from "./GameOverSection";
    import {RequestMessageType, Roles} from "@/constants/vue-constants";
    import {AuthenticatedRequest} from "@/model/authenticated-request.model";

    export default {
        name: 'GameOverSectionSlider',
        components: {GameOverSection},
        beforeMount() {
            this.currentGameId = this.gameResults.length;
        },
        data() {
            return {
                currentGameId: 0
            }
        },
        methods: {
            nextResults: function () {
                if (this.currentGameId < this.gameResults.length) {
                    this.currentGameId += 1;
                } else {
                    this.currentGameId = 1;
                }
            },
            previousResults: function () {
                if (this.currentGameId > 1) {
                    this.currentGameId -= 1;
                } else {
                    this.currentGameId = this.gameResults.length;
                }
            },
            requestBackToLobby: function () {
                const answerQuestionRequest = new AuthenticatedRequest({
                    type: RequestMessageType.BACK_TO_LOBBY,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId
                });
                this.$websocketService.sendMessage(answerQuestionRequest);
            },
        },
        computed: {
            isHost: function () {
                const connectedPlayers = this.gameOver?.connectedPlayers;
                const localPlayer = connectedPlayers.find(player => player.id === this.localPlayerId);
                return localPlayer.role === Roles.HOST;
            },
            gameOver: function () {
                return this.$store.state.gameOver;
            },
            gameResults: function () {
                return this.$store.state.gameResults;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            selectedGameOverResult: function () {
                const selected = this.gameResults.find(gr => gr.gameId === this.currentGameId);
                return selected;
            },
            displayedGameResults: function () {
                return this.selectedGameOverResult ? [this.selectedGameOverResult] : [];
            },
            gameOverResult: function () {
                return this.gameResults ? this.gameResults.find(gr => gr.gameId === this.currentGameId) : null;
            },
            gameOverRes: function () {
                return this.gameOverResult ? [this.gameOverResult] : [];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .game-over-slide-container {
        justify-content: center;
        position: relative;
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .slide-button-panel {
            position: absolute;
            width: min-content;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.2s linear;
            z-index: 1000000;

            &.actions-panel-left {
                left: 0;
            }

            &.actions-panel-right {
                right: 0;
            }

            .arrow-btn {
                width: calc(25px + 1vw);
                height: auto;
                cursor: pointer;

                &.right-arrow {
                    margin-right: 5px;
                }

                &.left-arrow {
                    margin-left: 5px;
                }
            }
        }

        .game-over-section-slider-transition-enter-active {
            opacity: 0;
            transform: scale(0.5);
        }

        .game-over-section-slider-transition-leave-active {
            opacity: 0;
            position: absolute;
            transform: scale(0.4);
        }

        .game-over-section-slider-transition-item {
            transition: all 0.33s ease 0s;
        }

        .slide-content-wrapper {
            position: relative;
            overflow: hidden;
            display: flex;
            width: 100%;
        }

        .slide-content {
            overflow-y: hidden;
            overflow-x: visible;
            position: relative;
            width: 100%;
        }

        .actions-panel {
            display: flex;
            justify-content: center;
            margin-bottom: 60px;

            .main-button {
                height: 3vw;
            }

            @media only screen and (max-width: 1200px) {
                margin-top: 15px;
                margin-bottom: 0px;

                .main-button {
                    height: 4vh;
                }
            }
        }

        @media only screen and (max-width: 1200px) {
            flex-direction: column;
            align-items: center;

        }
    }
</style>
