<template>
    <div class="game-wrapper"
         :class="{'player-active': (isLocalPlayerTurn && !isQuestionPosed) || (isQuestionPosed && !isLocalPlayerTurn), 'isNight': !isDayTime}">
        <transition name="game-transition-overlay-transition">
            <div class="game-transition-overlay transparent-overlay" v-if="termAssignment?.gameStartsTimer"> The Game
                starts in
                <timer-container class="timer-layout plain-timer" v-bind:timer="termAssignment.gameStartsTimer"
                                 v-bind:format="'seconds-plain'"></timer-container>
            </div>
        </transition>
        <transition name="game-transition-overlay-transition">
            <div class="game-transition-overlay long-fade" v-if="currentGame?.gameOverSectionTransitionTimer">
                <span>Game Over.</span>
                <span>Wrapping things up.</span>
            </div>
        </transition>
        <div class="game-body">
            <div class="top-section" v-if="currentGame">
                <div class="timer-panel">
                    <timer-container class="timer-layout pretty-timer" v-bind:timer="timer"
                                     v-bind:format="'seconds-unit'"></timer-container>
                </div>
                <transition-group name="player-message-group" tag="div" class="game-section-header non-selectable-text">
                    <span class="player-message-group-item" v-for="pm in playerMessageSelection()"
                          :key="pm"> {{ pm }}</span>
                </transition-group>
            </div>

            <div class="question-panel">
                <transition name="fade">
                    <div class="question-bubble"
                         :class="{'highlight-input': isLocalPlayerTurn}"
                         v-if="(isLocalPlayerTurn || isQuestionPosed) && !isHintState">
                        <div class="question-bubble-container"
                             @click="focusChild($event)"
                        >
                            <contenteditable class="question-bubble-text"
                                             v-if="!isQuestionPosed"
                                             tag="div"
                                             spellcheck="false"
                                             tabindex="0"
                                             :contenteditable="!isQuestionPosed && !questionTimerRunOut"
                                             :noNL="true"
                                             :noHTML="true"
                                             :value="questionInput"
                                             placeholder="Type your Question..."
                                             @keyup.enter="requestAskQuestion(false)"
                                             @input="onInput($event)"
                                             @returned="onInput"/>
                            <div class="question-bubble-text"
                                 v-show="isQuestionPosed"
                            >
                                {{currentGame.currentTurn.question.value}}
                            </div>
                        </div>
                    </div>
                </transition>
                <div class="hint-panel" v-if="hintIsAdopted">
                    <textarea v-if="!hintIsGiven && localPlayerIsHintResponder" v-model="tempHintResponse"
                              spellcheck="false"
                              @keyup.enter="sendHintResponse()" placeholder="Type your hint..."
                              maxlength="140"></textarea>
                    <textarea v-bind:value="hintContainer.currentHintRequest.content" spellcheck="false"
                              v-if="hintIsGiven || !localPlayerIsHintResponder"
                              :disabled="true"
                              :placeholder="hintResponderName + ' is typing a hint...'"></textarea>
                </div>
            </div>


            <div class="game-avatar-carousel-wrapper">
                <transition name="voteresult">
                    <div class="question-bubble-vote-panel" v-if="isPollClosed">
                        <img v-if="questionAccepted && !questionIsSolution" src="../assets/check.svg">
                        <img class="badge" v-if="questionAccepted && questionIsSolution"
                             :src="require(`../assets/${getBadgeTypeOfCurrentPlayer()}-winner-badge.svg`)">
                        <img v-if="fullAbstinence" src="../assets/line.svg">
                        <img v-if="questionDeclined" src="../assets/no.svg">
                    </div>
                </transition>
                <transition-group name="list-complete" tag="div" class="avatars-panel">
                    <term-assigment-avatar v-for="(pl, index) in displayedPlayers"
                                           class="list-complete-item"
                                           :key="pl.id"
                                           v-bind:termAssignmentPlayer="pl"
                                           v-bind:winningPosition="getWinningPosition(pl.id)"
                                           v-bind:isDisconnected="isDisconnected(pl)"
                                           :class="{'center-avatar': currentPlayerId === pl.id, 'on-question-avatar': currentPlayerId === pl.id && isLocalPlayerTurn && !isQuestionPosed,'side-avatar': currentPlayerId !== pl.id, 'is-local-player': pl.id === localPlayerId, 'is-player-solving': currentPlayerId === pl.id && questionIsSolution && isQuestionPosed}"
                                           :style="{marginBottom: getMarginBottom(index),marginLeft:'1vw', marginRight:'1vw'}"
                    ></term-assigment-avatar>
                    <div v-if="currentGame && (players.length === 2 || (players.length === 4 && (spread >= 2)) || (players.length === 6 && spread === 3))"
                         class="mock-avatar"></div>
                </transition-group>
            </div>
            <div class="table-wrapper"
                 :class="{'ontop': (isLocalPlayerTurn && !isQuestionPosed) || (isQuestionPosed && !isLocalPlayerTurn) }">
                <div class="game-bg">
                    <img class="main-bg" src="../assets/game-bg/main-game-bg.svg">
                    <img class="wall-lamp" src="../assets/game-bg/wall-lamp.svg">
                    <img class="standing-lamp" src="../assets/game-bg/standing-lamp.svg">
                    <div class="poster-wrapper">
                        <img class="poster" src="../assets/game-bg/poster.svg">
                        <div class="poster-game-theme">{{gameTheme}}</div>
                    </div>
                    <div class="window-container">
                        <img class="window" src="../assets/game-bg/window.svg">
                        <img class="daylight" v-if="isDayTime" src="../assets/game-bg/tag.svg">
                        <img class="night" v-if="!isDayTime" src="../assets/game-bg/night.svg">
                    </div>
                </div>
                <img class="table"
                     src="../assets/table-only.svg">
                <div class="question-interaction-panel" v-if="currentGame">
                    <span class="button-panel-message-container"> {{getButtonPanelMessage()}}</span>
                    <div class="interaction-button-panel">
                        <!-- on hint -->
                        <button v-on:click="requestAdoptHint()" class="main-button answer-button"
                                v-if="isHintState && !adoptionTimeOutDone && !isLocalPlayerTurn"
                                :class="{'disabled':isLocalPlayerTurn}"
                                :disabled="isLocalPlayerTurn">
                            give a hint
                        </button>

                        <!-- on answer question -->
                        <button v-on:click="requestCastVote(false)" class="main-button answer-button"
                                v-if="showAnswerButton"
                                :class="{'disabled':isLocalPlayerTurn || localPlayerHasVoted || pollTimerRunOut}"
                                :disabled="isLocalPlayerTurn || localPlayerHasVoted || pollTimerRunOut">
                            <div v-if="localPlayerHasVoted || isLocalPlayerTurn">{{noResults}}</div>
                            <img src="../assets/no.svg"
                                 class="answer-icon">
                        </button>
                        <button v-on:click="requestCastVote(true)" class="main-button answer-button"
                                v-if="showAnswerButton"
                                :class="{'disabled':isLocalPlayerTurn || localPlayerHasVoted || pollTimerRunOut}"
                                :disabled="isLocalPlayerTurn || localPlayerHasVoted || pollTimerRunOut">
                            <div v-if="localPlayerHasVoted || isLocalPlayerTurn">{{yesResults}}</div>
                            <img src="../assets/check.svg"
                                 class="answer-icon">
                            <img class="yes-button-badge" v-if="questionIsSolution"
                                 :src="require(`../assets/default-winner-badge.svg`)">
                        </button>

                        <!-- on asking question -->
                        <button v-if="showAskButtons"
                                :disabled="questionTimerRunOut || hintsRemaining <= 0"
                                :class="{'disabled': questionTimerRunOut || hintsRemaining <= 0}"
                                v-on:click="requestHint()" class="main-button ask-button"><img
                                class="question-mark"
                                :src="require(`../assets/idea.svg`)"> hint
                        </button>

                        <button v-if="showAskButtons"
                                :disabled="!isQuestionInputValid || questionTimerRunOut"
                                :class="{'disabled':!isQuestionInputValid || questionTimerRunOut}"
                                v-on:click="requestSolve()" class="main-button ask-button m-1vw"><img
                                class="button-badge"
                                :src="require(`../assets/default-winner-badge.svg`)">
                            Solve
                        </button>

                        <button v-if="!isHintState && (!isQuestionPosed && isLocalPlayerTurn)"
                                :disabled="!isQuestionInputValid || questionTimerRunOut"
                                :class="{'disabled':!isQuestionInputValid || questionTimerRunOut}"
                                v-on:click="requestAskQuestion()" class="main-button ask-button m-1vw"><img
                                class="question-mark"
                                :src="require(`../assets/questionmark.svg`)"> Ask
                        </button>

                        <!-- on hinting -->
                        <button @click="sendHintResponse()" v-if="localPlayerIsHintResponder && !hintIsGiven"
                                :disabled="hintIsGiven"
                                class="main-button hint-ok" :class="{'disabled': hintIsGiven}"> send
                        </button>


                        <button @click="requestHintGivenClose()"
                                v-if="localPlayerIsHintRequester && hintIsGiven && hintGivenTimerRunning"
                                :disabled="hintGivenTimerDone"
                                class="main-button send-hint" :class="{'disabled': hintGivenTimerDone}"> Ok
                        </button>

                    </div>

                </div>

            </div>
            <img class="sub-table" src="../assets/lowertable.svg">

        </div>
        <div class="vertical-spacer"></div>

        <language-selector class="language-selector-absolute"
                           v-if="currentGame"
                           v-bind:disabled="true"
                           v-bind:selection="currentGame.language"
        >
        </language-selector>
        <div class="round-number"> Round {{currentGame ? currentGame.roundNumber : '-'}}</div>

        <button class="main-button alt-mobile-button-left" @click="externalToggleOpenCheatSheet()" v-if="cheatSheet">
            Cheatsheet
        </button>
        <CheatSheet v-bind:cheatSheet="cheatSheet" v-bind:extOpen="extOpenSheetCheat"
                    v-on:onInnerToggleOpenCloseChange="onInnerCheatSheetChange($event)"></CheatSheet>
    </div>

</template>

<script>
    import TermAssigmentAvatar from "@/components/term-assignment-avatar";
    import {AuthenticatedRequest} from "@/model/authenticated-request.model";
    import {RequestMessageType} from "@/constants/vue-constants";
    import TimerContainer from "@/components/timer-container";
    import LanguageSelector from "@/components/language-selector";
    import CheatSheet from "@/components/cheat-sheet";
    import contenteditable from "vue-contenteditable";

    export default {
        name: 'Game',
        components: {CheatSheet, TermAssigmentAvatar, TimerContainer, LanguageSelector, contenteditable},
        beforeMount: function () {
            this.onResize();
            window.addEventListener("resize", this.onResize)
        },
        data() {
            return {
                spread: 2,
                selectedPlayerId: '1',
                questionInput: '',
                windowWidth: 0,
                maxInputLength: 140,
                extOpenSheetCheat: false,
                tempHintResponse: ''
            }
        },
        methods: {
            onInnerCheatSheetChange: function (value) {
                this.extOpenSheetCheat = value;
            },
            externalToggleOpenCheatSheet: function () {
                this.extOpenSheetCheat = !this.extOpenSheetCheat;
            },
            getWinningPosition: function (playerId) {
                return this.currentGame ? this.currentGame.ranking.find(p => p.id === playerId)?.position : -1;
            },
            onInput: function (e) {
                let newContent = e.target.textContent;
                if (newContent.length < this.maxInputLength) {
                    this.questionInput = newContent;
                    return;
                } else {
                    let range = document.createRange();
                    let selection = window.getSelection();
                    let selectedStartPos = selection.anchorOffset;
                    this.questionInput = newContent.substr(0, this.maxInputLength);
                    e.target.textContent = this.questionInput;
                    range.setStart(e.target.firstChild, Math.min(selectedStartPos, this.questionInput.length));
                    range.collapse(true)
                    selection.removeAllRanges()
                    selection.addRange(range)
                }
            },
            onResize: function (event) {
                const windowWidth = window.innerWidth;
                if (windowWidth >= 1680) {
                    this.spread = 3;
                } else if (windowWidth <= 1680 && windowWidth > 768) {
                    this.spread = 2;
                } else if (windowWidth <= 700) {
                    this.spread = 1;
                }

                this.windowWidth = windowWidth;
            },
            getMarginBottom: function (index) {
                const centerIndex = Math.floor(this.displayedSize / 2);
                if (index === centerIndex) {
                    return '0';
                }
                const diffToCenter = Math.abs(centerIndex - index);
                return `-${1.5 * diffToCenter}%`;
            },
            requestHint: function () {
                if (this.isLocalPlayerTurn) {
                    const hintRequest = new AuthenticatedRequest({
                        type: RequestMessageType.HINT_REQUEST,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: null
                    });
                    this.$websocketService.sendMessage(hintRequest);
                    this.questionInput = '';
                }
            },
            sendHintResponse: function () {
                if (this.hintIsAdopted && this.localPlayerIsHintResponder && this.tempHintResponse) {
                    const hintRequest = new AuthenticatedRequest({
                        type: RequestMessageType.HINT_RESPONSE,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: this.tempHintResponse
                    });
                    this.$websocketService.sendMessage(hintRequest);
                    this.tempHintResponse = '';
                }
            },
            requestAdoptHint: function () {
                if (!this.isLocalPlayerTurn && this.isHintState && !this.hintContainer.currentHintRequest.responderId) {
                    const hintAdoptionRequest = new AuthenticatedRequest({
                        type: RequestMessageType.HINT_ADOPT,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: null
                    });
                    this.$websocketService.sendMessage(hintAdoptionRequest);
                }
            },
            requestHintGivenClose: function () {
                if (this.isLocalPlayerTurn && this.hintGivenTimerRunning) {
                    const hintAdoptionRequest = new AuthenticatedRequest({
                        type: RequestMessageType.HINT_GIVEN_CLOSE,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: null
                    });
                    this.$websocketService.sendMessage(hintAdoptionRequest);
                }
            },
            requestSolve: function () {
                this.requestAskQuestion(true);
            },
            requestAskQuestion: function (solve = false) {
                if (this.isLocalPlayerTurn) {
                    const askQuestionRequest = new AuthenticatedRequest({
                        type: RequestMessageType.ASK_QUESTION,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: {
                            value: this.questionInput,
                            asSolution: solve,
                        }
                    });
                    this.$websocketService.sendMessage(askQuestionRequest);
                    this.questionInput = '';
                }
            },
            requestCastVote: function (answer) {
                if (!this.isLocalPlayerTurn) {
                    const answerQuestionRequest = new AuthenticatedRequest({
                        type: RequestMessageType.CAST_VOTE,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: answer
                    });
                    this.$websocketService.sendMessage(answerQuestionRequest);
                    this.questionInput = '';
                }
            },
            getCenterIndex: function (players) {
                return Math.floor(players.length / 2);
            },
            playerMessageSelection: function () {
                return [this.getPlayerMessage()]
            },
            getPlayerMessage: function () {
                if (this.isLocalPlayerTurn) {
                    if (this.isHintState) {
                        if (this.hintGivenTimerDone) {
                            return `Hope this helped you! Next Player.`
                        } else if (this.hintRequestNeedsAdoption) {
                            return `Your are asking for a hint.`;
                        } else if (this.hintIsGiven) {
                            return `There is your hint!`
                        } else if (this.noHintGivenInTime) {
                            return `${this.hintResponderName} didn't send a Hint.`
                        } else if (this.hintIsAdopted) {
                            return `${this.hintResponderName} is preparing a Hint for your.`
                        } else if (this.hintDidNotGetAdopted) {
                            return 'Sadly, Nobody wants to send a hint.'
                        }
                    }

                    if (this.isPollState) {
                        if (this.isPollClosed) {
                            if (this.fullAbstinence) {
                                return `Nobody could answer this. Try again.`;
                            }

                            if (this.questionAccepted) {
                                if (this.questionIsSolution) {
                                    return `You've got it. Congratulations ${this.currentPlayer?.name}!`;
                                }
                                return `Congratulations. That was a yes, your turn again.`;
                            }

                            return `No, that's wrong! Next player's turn.`;
                        }
                        return `Other players are answering now.`;
                    }

                    if (this.questionTimerRunOut) {
                        return 'No Question asked. Next Players Turn.'
                    }
                    return `Go  ${this.currentPlayer?.name}, it's your Turn.`;
                } else {
                    if (this.isHintState) {
                        if (this.hintGivenTimerDone) {
                            return `Hope this helped ${this.currentPlayer?.name}. Next Player.`
                        } else if (this.hintRequestNeedsAdoption) {
                            return `${this.currentPlayer?.name} requests a hint.`;
                        } else if (this.hintIsGiven) {
                            return `Thanks for the hint ${this.hintResponderName}.`
                        } else if (this.noHintGivenInTime) {
                            return `${this.hintResponderName} didn't send a Hint.`
                        } else if (this.hintIsAdopted) {
                            if (this.localPlayerIsHintResponder) {
                                return `${this.hintResponderName} please give your hint.`;
                            }
                            return `${this.hintResponderName} is giving ${this.currentPlayer?.name} a hint.`
                        } else if (this.hintDidNotGetAdopted) {
                            return 'No one really?'
                        }
                    }

                    if (this.isQuestionPosed) {
                        if (this.isPollClosed) {
                            if (this.fullAbstinence) {
                                return `Nobody could answer this. It's ${this.currentPlayer?.name}'s turn again.`;
                            }

                            if (this.questionAccepted) {
                                if (this.questionIsSolution) {
                                    return `${this.currentPlayer?.name} got the solution. Congratulations!`;
                                }
                                return `Correct! It's ${this.currentPlayer?.name}'s turn again.`;
                            }

                            return `Wrong! Next player's turn`;
                        }

                        if (this.isAllowedToVote) {
                            if (this.questionIsSolution) {
                                return `Is this the right Solution?`;
                            }
                            return `What's your answer?`;
                        }

                        return `Please wait a moment while the others vote.`;
                    }

                    if (this.questionTimerRunOut) {
                        return 'Nothing has happened, next Player please.'
                    }

                    return `Waiting for ${this.currentPlayer?.name}'s Question... `;
                }
            },
            getButtonPanelMessage: function () {
                if (this.isLocalPlayerTurn) {
                    if (this.isHintState) {
                     if (this.hintIsGiven && this.hintGivenTimerRunning) {
                         return 'Continue ?'
                     }
                     return '';
                    }
                    if (!this.isQuestionPosed) {
                        return 'What do you want to do ?'
                    }
                    if (this.isQuestionPosed) {
                        return 'Vote Result'
                    }
                } else {
                    if (this.isHintState) {
                        if (this.hintRequestNeedsAdoption) {
                            return `Do you want to give ${this.currentPlayer?.name} a Hint ?`
                        } else if (this.hintIsGiven) {
                            return ''
                        } else if (this.hintIsAdopted) {
                            if(this.localPlayerIsHintResponder) {
                                return 'Ready to send your hint ?'
                            }
                            return ''
                        }
                    }

                    if (this.isPollClosed) {
                        return 'Vote Result'
                    }

                    if (this.isQuestionPosed && !this.isPollClosed) {
                        return 'Please cast your vote'
                    }
                }

            },
            isDisconnected: function (player) {
                return this.currentGame.disconnectedIds.includes(player.id);
            },
            getBadgeTypeOfCurrentPlayer: function () {
                const winningPosition = this.getWinningPosition(this.currentPlayerId);
                switch (winningPosition) {
                    case 1 :
                        return 'gold';
                    case 2 :
                        return 'silver';
                    case 3 :
                        return 'bronze';
                    default :
                        return 'default';
                }
            },
            focusChild: function (e) {
                if (e) {
                    let target = (e.target.children && e.target.children[0]) ?? e.target
                    if (target) {
                        target.focus()
                    }
                }
            },
        },
        computed: {
            isLocalPlayerTurn: function () {
                return this.localPlayerId === this.currentPlayerId;
            },
            localPlayerHasVoted: function () {
                return this.currentGame.currentTurn.question.poll.votes.some(p => p.voterId === this.localPlayerId);
            },
            isQuestionInputValid: function () {
                return this.questionInput.length > 0;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            currentGame: function () {
                return this.$store.state.currentGame;
            },
            termAssignment: function () {
                return this.$store.state.termAssignment;
            },
            hintsRemaining: function () {
                return this.currentGame ? this.currentGame.hintsRemaining : 0;
            },
            hintContainer: function () {
                return this.currentGame?.currentTurn?.hintContainer;
            },
            hintIsAdopted: function () {
                return this.hintContainer?.currentHintRequest.responderId && this.adoptionTimeOutDone;
            },
            adoptionTimeOutDone: function () {
                return this.hintContainer?.adoptHintTimeout?.done;
            },
            hintDidNotGetAdopted: function () {
                return !this.hintContainer?.currentHintRequest.responderId && this.adoptionTimeOutDone;
            },
            noHintGivenInTime: function () {
                return !this.hintContainer?.currentHintRequest.content && this.hintContainer?.giveHintTimeout?.done;
            },
            hintIsGiven: function () {
                return this.hintContainer?.currentHintRequest.responderId && this.hintContainer?.giveHintTimeout?.done && this.hintContainer?.currentHintRequest.content;
            },
            hintGivenTimerRunning: function () {
                return this.hintContainer?.hintGivenTimeout ? !this.hintContainer?.hintGivenTimeout.done : false;
            },
            hintGivenTimerDone: function () {
                return this.hintContainer?.hintGivenTimeout?.done;
            },
            hintRequestNeedsAdoption: function () {
                return !this.hintContainer?.currentHintRequest.responderId && !this.hintContainer?.adoptHintTimeout?.done;
            },
            hintResponderName: function () {
                const responderId = this.hintContainer?.currentHintRequest?.responderId;
                if (responderId) {
                    return this.players.find(p => p.id === responderId)?.name;
                }
                return '?';
            },
            localPlayerIsHintResponder: function () {
                return this.hintContainer?.currentHintRequest.responderId === this.localPlayerId;
            },
            localPlayerIsHintRequester: function () {
                return this.hintContainer?.currentHintRequest.requesterId === this.localPlayerId;
            },
            timer: function () {
                const currentGame = this.currentGame;
                if (currentGame) {
                    if (this.isHintState) {
                        if (this.hintContainer?.adoptHintTimeout && !this.hintContainer?.adoptHintTimeout?.done) {
                            return this.currentGame.currentTurn.hintContainer.adoptHintTimeout
                        }
                        if (!this.hintContainer?.giveHintTimeout?.done && this.hintContainer?.adoptHintTimeout.done && !this.hintContainer?.hintGivenTimeout?.done) {
                            return this.hintContainer?.giveHintTimeout;
                        }
                        if (this.hintContainer?.giveHintTimeout?.done) {
                            return this.hintContainer?.hintGivenTimeout;
                        }
                    }
                    return this.isQuestionState ? this.currentGame.currentTurn.questionTimer : this.currentGame.currentTurn.pollTimer;
                }
                return 0;
            },
            isQuestionState: function () {
                return this.currentGame?.currentTurn.state === 'question-state';
            },
            isPollState: function () {
                return this.currentGame?.currentTurn.state === 'poll-state';
            },
            isHintState: function () {
                return this.currentGame?.currentTurn.state === 'hint-state';
            },
            currentPlayerId: function () {
                return this.$store.state.currentGame?.currentPlayerId;
            },
            displayedPlayersCount: function () {
                return Math.min(this.players.length, (this.spread * 2) + 1);
            },
            isQuestionPosed: function () {
                return this.currentGame?.currentTurn?.question?.value.length > 0 && this.currentGame?.currentTurn?.state === 'poll-state';
            },
            displayedPlayers: function () {
                const sortedPlayers = this.selectedPlayerCenteredList;
                if (sortedPlayers.length) {
                    const centerIndex = this.getCenterIndex(sortedPlayers);
                    return sortedPlayers.slice(Math.max(centerIndex - this.spread, 0), Math.min(centerIndex + this.spread + 1, sortedPlayers.length));
                }
                return [];
            },
            displayedSize: function () {
                if (this.players) {
                    return Math.min(this.players.length, (this.spread * 2) + 1);
                }
                return 0;
            },
            players: function () {
                return this.$store.state.currentGame?.gamePlayers;
            },
            selectedPlayerCenteredList: function () {
                if (this.players) {
                    let players = [...this.players];
                    const currentPlayer = this.currentPlayer;
                    const centerIndex = this.getCenterIndex(players);
                    while (players.indexOf(currentPlayer) !== centerIndex) {
                        const elem = players.shift();
                        players.push(elem);
                    }
                    return players;
                }
                return [];
            },
            currentPlayer: function () {
                return this.players.find(p => p.id === this.currentPlayerId)
            },
            displayedQuestionInput: function () {
                return this.isQuestionPosed ? this.currentGame.currentTurn.question.value : this.questionInput;
            },
            isAllowedToVote: function () {
                return !this.isLocalPlayerTurn && this.isQuestionPosed && !this.localPlayerHasVoted;
            },
            showAnswerButton: function () {
                return this.isQuestionPosed && !this.isHintState;
            },
            showAskButtons: function () {
                return !this.isHintState && (!this.isQuestionPosed && this.isLocalPlayerTurn);
            },
            isPollClosed: function () {
                return this.currentGame?.currentTurn?.question?.poll?.closed;
            },
            questionTimerRunOut: function () {
                return this.currentGame.currentTurn?.questionTimer?.done;
            },
            hintRequestRunning: function () {
                return !this.hintContainer?.adoptHintTimeout?.done || this.hintContainer?.giveHintTimeout?.done;
            },
            pollTimerRunOut: function () {
                return this.currentGame.currentTurn?.pollTimer?.done;
            },
            yesResults: function () {
                return this.currentGame.currentTurn?.question.poll.pollResult.yes;
            },
            noResults: function () {
                return this.currentGame.currentTurn?.question.poll.pollResult.no;
            },
            questionAccepted: function () {
                return this.isPollClosed && !this.fullAbstinence && this.currentGame.currentTurn?.question.poll.pollResult.yes >= this.currentGame.currentTurn?.question.poll.pollResult.no;
            },
            questionDeclined: function () {
                return this.isPollClosed && this.currentGame.currentTurn?.question.poll.pollResult.yes < this.currentGame.currentTurn?.question.poll.pollResult.no;
            },
            fullAbstinence: function () {
                return this.isPollClosed && this.currentGame.currentTurn?.question.poll.pollResult.yes === 0 && this.currentGame.currentTurn?.question.poll.pollResult.no === 0;
            },
            questionIsSolution: function () {
                return this.currentGame.currentTurn?.question.asSolution;
            },
            cheatSheet: function () {
                return this.currentGame?.cheatSheet;
            },
            isDayTime: function () {
                const hours = new Date().getHours()
                const isDayTime = hours > 6 && hours < 19;
                return isDayTime;
            },
            gameTheme: function () {
                return this.$store.state.chosenGameTopic;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    .game-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;

        &.playegr-active {
            background: linear-gradient(black, transparent);
            transition: all 0.5s ease-in-out;
        }

        &.isNight {
            // background-color: rgba(0, 0, 0, 0.55);
        }

        .game-transition-overlay {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.15);
            z-index: 20000;
            font-size: calc(10px + 4vw);
            line-height: calc(18px + 4vw);
            transition: opacity 0.5s;
            color: white;

            &.transparent-overlay {
                background-color: transparent !important;
            }

            &.long-fade {
                transition: opacity 1s;
            }
        }
    }

    .game-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;

        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
        margin-bottom: -2px;
    }

    .game-bg {
        position: absolute;
        background-repeat: no-repeat;
        z-index: -1;
        width: 100vw;
        bottom: 0;

        .main-bg {
            width: 100%;
            height: auto;
        }

        .wall-lamp {
            position: absolute;
            right: -15%;
            top: -55%;
            width: auto;
            height: 100%;
            z-index: 2;
        }

        .standing-lamp {
            position: absolute;
            left: 0;
            bottom: 0;
            width: auto;
            height: 80%;
            z-index: 3;

        }

        .poster-wrapper {
            position: absolute;
            left: 65%;
            bottom: 55%;
            width: min(max(75px, 15%), 195px);
            display: flex;
            justify-content: center;

            .poster {
                width: 100%;
                height: auto;
                z-index: 1;

            }

            .poster-game-theme {
                position: absolute;
                top: 17%;
                color: black;
                z-index: 9;
                line-height: calc(5px + 0.95vw);
                font-size: calc(3px + 0.8vw);
                width: 87%;
                margin: 0 6.5%;
                padding: 4%;
                box-sizing: border-box;
                line-break: auto;
                word-break: break-word;
                color: red;
                display: flex;
                align-items: center;
                text-align: center;
                justify-content: center;
                height: 25%;

            }
        }

        .window-container {
            position: absolute;
            z-index: 0;
            left: 10%;
            bottom: 45%;
            width: min(max(100px, 30%), 500px);

            .window {
                width: 100%;
                height: auto;
            }

            .daylight, .night {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: auto;
                z-index: -1;
            }
        }
    }

    .timer-panel {
        padding: 0 1vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top-section {
        top: 0;
        display: flex;
        flex-direction: column;
        width: 100%;
        z-index: 40;
    }

    .hint-panel {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        width: max(25vw, 25vh);
        z-index: 5555;

        textarea {
            font-size: calc(8px + 0.275vw);
            line-height: calc(11px + 0.275vw);
            font-family: bungee;
            color: white;
            outline: none;
            position: relative;
            background-color: var(--input-bg-color);
            border-radius: 25px;
            border: 3px rgb(190, 180, 233) solid;
            margin-bottom: 5px;
            padding: 8px 12px;
            box-sizing: border-box;
            resize: none;
            transition: all 0.3s ease-in-out;
            z-index: 555;
            width: 100%;
            height: 80px;
            text-align: center;
            box-sizing: border-box;

            &::placeholder {
                color: black;
            }
        }
    }

    .question-panel {
        display: flex;
        align-items: center;
        justify-content: center;
        width: max(35vw, 35vh);
        z-index: 5555;
        min-height: 105px;
    }

    .question-button-panel {
        display: grid;
        grid-template-columns: max-content max-content;
        grid-gap: 2vh;
        margin-bottom: 2vh;
    }

    .highlight-input:focus {
        outline: none;
    }

    .question-bubble-vote-panel img {
        transition: all 0.2s linear;
        width: 6vw;
        height: 6vw;
        min-width: 45px;
        min-height: 45px;
    }

    .answer-icon {
        transition: all 0.2s linear;
        width: 2.2vw;
        height: 2.2vw;
        min-width: 20px;
        min-height: 20px;
    }

    .question-bubble-vote-panel .badge {
        width: 7.5vw;
        height: auto;
        min-width: 75px;
    }

    .question-bubble-vote-panel {
        left: 0;
        bottom: 50%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        z-index: 99999;
    }

    .question-bubble {
        position: relative;
        background-color: var(--input-bg-color);
        border-radius: 25px;
        border: 3px rgb(190, 180, 233) solid;
        margin-bottom: 5px;
        padding: 8px 12px;
        box-sizing: border-box;
        resize: none;
        transition: all 0.3s ease-in-out;
        z-index: 555;
        max-width: 500px;
        min-height: inherit;
        width: inherit;
        box-sizing: border-box;
        user-select: none;


        &.solve {
            border: 3px #c4a465 solid;
            background-color: #deb769;
        }

        &:not(.solve):before,
        &:not(.solve):after {
            content: ' ';
            position: absolute;
            width: 0;
            height: 0;
        }

        &:not(.solve):before {
            left: 30px;
            bottom: -50px;
            border: 25px solid;
            border-color: rgb(190, 180, 233) rgb(190, 180, 233) transparent transparent;
        }

        &:not(.solve):after {
            left: 37px;
            bottom: -38px;
            border: 19px solid;
            border-color: var(--input-bg-color) var(--input-bg-color) transparent transparent;
        }

        .question-bubble-container {
            color: var(--primary-light-text-color);
            resize: none;
            margin: 0;
            border: none;
            min-height: 75px;
            height: 100%;
            width: 100%;
            text-align: center;
            -moz-text-align-last: center; /* Firefox 12+ */
            text-align-last: center;
            align-self: center;

            &:disabled {
                user-select: none;
            }

            display: flex;
            align-items: center;
            justify-content: center;
        }

        .question-bubble-text {
            min-width: 10px;
            font-family: bungee;
            font-size: calc(9px + 0.5vw);
            line-height: calc(11px + 0.5vw);
            outline: none;
            background-color: transparent;
            white-space: normal;
            overflow-wrap: break-word;
        }

        [contenteditable][placeholder]:empty:before {
            content: attr(placeholder);
            color: black;
            background-color: transparent;
        }
    }

    .game-wrapper .game-avatar-carousel-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1vw;

        justify-content: flex-end;
        position: relative;
        overflow: visible;
    }

    .game-avatar-carousel-wrapper .avatars-panel {
        display: flex;
        justify-content: center;
        height: max-content;
        align-items: flex-end;
        width: 100%;
    }

    .question-interaction-panel {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: 11;
        top: 7.5%;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.4);

        .button-panel-message-container {
            font-size: calc(9px + 0.3vw);
            line-height: calc(9px + 0.3vw);
            margin: 10px 10px 0 10px;
        }

        .interaction-button-panel {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1px 4px 4px 4px;
        }

        .question-mark {
            margin-right: max(5px, 0.5vw);
            width: max(2vw, 20px);
            height: auto;
        }

        .yes-button-badge {
            position: absolute;
            right: -6%;
            bottom: -56%;
            margin-left: max(5px, 0.5vw);
            width: max(1.45vw, 20px);
            height: auto;
        }

        .button-badge {
            margin-right: max(5px, 0.5vw);
            width: max(1vw, 12px);
            height: auto;
        }

        .ask-button {
            height: calc(30px + 1vw);
            margin: min(max(5px, 1.5vw), 10px);
        }

        .answer-button {
            margin: min(max(5px, 1.5vw), 10px);
        }

        .hint-ok, .send-hint {
            margin: min(max(5px, 1.5vw), 10px);

        }

    }

    .table-wrapper {
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 25;
    }

    .table {
        width: 100%;
        height: auto;
    }

    .table-wrapper.ontop {
        z-index: 25;
    }

    .sub-table {
        display: none;
        width: 100%;
        height: auto;
        bottom: 0;
        margin-top: -1px;
        z-index: 6;
    }

    .avatar-column {
        height: min-content;
        max-height: inherit;
    }

    @media only screen and (min-aspect-ratio: 20/6) {
        .table {
            width: 60%;
        }

        .game-bg {
            width: 65vw
        }
    }


    @media only screen and (min-aspect-ratio: 20/7) and (max-aspect-ratio: 20/6) {
        .table {
            width: 70%;
        }
        .game-bg {
            width: 75vw
        }
    }

    @media only screen and (min-aspect-ratio: 20/8) and (max-aspect-ratio: 20/7) {
        .table {
            width: 80%;
        }

        .game-bg {
            width: 85vw
        }
    }

    @media only screen and (max-aspect-ratio: 1/1) {
        .game-wrapper {
            background-position-y: bottom;
        }

        .sub-table {
            display: unset;
        }

        .vertical-spacer {
            min-height: 100px;
        }
    }

    .side-avatar {
        width: min(10vw, 20vh);
        height: min(10vw, 20vh);
        min-width: 90px;
        min-height: 90px;
        max-width: 175px;
        max-height: 175px;
        z-index: 30;
    }

    .center-avatar {
        width: min(15vw, 25vh);
        height: min(15vw, 25vh);
        min-width: 135px;
        min-height: 135px;
        max-width: 275px;
        max-height: 275px;
        z-index: 30;
    }

    .on-question-avatar {
        width: min(18vw, 28vh);
        height: min(18vw, 28vh);
        min-width: 150px;
        min-height: 150px;
        max-width: 310px;
        max-height: 310px;
    }

    .mock-avatar {
        width: min(10vw, 20vh);
        height: min(10vw, 20vh);
        min-width: 90px;
        min-height: 90px;
        max-width: 200px;
        max-height: 200px;
        margin-left: 1vw;
        margin-right: 1vw;
    }

    .flip-list-move {
        transition: all 0.8s ease;
    }

    .list-complete-item {
        transition: all 0.8s ease 0s;
    }

    .list-complete-enter-from {
        opacity: 0;
        transform: translateX(50vw);
    }

    .list-complete-leave-to {
        opacity: 0;
        transform: translateX(-50vw);
    }

    .list-complete-leave-active {
        position: absolute;
    }

    .fade-enter-active {
        animation: question-slide-up .5s;
    }

    .fade-leave-active {
        animation: opOut 0.5s;
    }

    @keyframes question-slide-up {
        0% {
            transform: translateY(100%);
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes opOut {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .voteresult-enter-active {
        animation: vote-result-slide 1.0s;
    }

    .voteresult-leave-active {
        transition: opacity 0.5s;
        opacity: 0;
    }

    @keyframes vote-result-slide {
        0% {
            transform: translateY(150%);
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(0%);
        }
    }

    .game-transition-overlay-transition-enter-active {
        transition: opacity 0.33s;
        opacity: 0;
    }

    .game-transition-overlay-transition-leave-active {
        transition: opacity 0.5s;
        opacity: 0;
    }

    .cheat-sheet-container {
        position: absolute;
        bottom: 0px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .game-section-header {
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .player-message-group-item {
        font-size: min(max(17px, 4vw), 30px);
        line-height: min(max(17px, 4vw), 30px);
        text-align: center;
        text-shadow: 1px 1px 1px darkgrey;
        transition: all 0.8s ease 0s;
        margin-bottom: min(max(5px, 1vw), 10px);
        background-color: #9F92C8;
        padding: 7px;
        border-radius: 10px;
        max-width: 90%;
        color: black;
    }

    .player-message-group-enter-from {
        opacity: 0;
        color: green;
        transform: translateX(-75vw);
    }

    .player-message-group-leave-to {
        opacity: 0;
        transform: translateX(75vw);
    }

    .player-message-group-enter-active {
        position: absolute;
    }

    .round-number {
        box-sizing: border-box;
        position: absolute;
        left: 2vw;
        width: 125px;
        font-family: bungee;
        background-color: #4430a0ba;
        border: none;
        border-radius: 15px;
        color: white;
        -webkit-appearance: none;
        -moz-text-align-last: center;
        text-align-last: center;
        z-index: 10000;
        padding: 10px;
        line-height: 16px;
        font-size: 16px;
        bottom: 75px;
    }

    .non-selectable-text {
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
    }

    .alt-mobile-button-left {
        position: absolute !important;
        top: calc(100% - 60px);
        max-height: min(max(35px, 2vw), 50px);
        z-index: 100;
        left: 2vw;

        @media only screen and (max-width: 800px) {
            top: calc(100% - 50px);
        }
    }
</style>
