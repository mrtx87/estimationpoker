<template>
    <div class="ban-poll-wrapper">
        <div class="ban-poll-heading">
            <span class="main-heading-text"> Vote on Ban </span> |
            <span class="sub-heading-text" v-if="banPoll"> Ban {{playerVotedOn?.name}} ?</span>
            <span class="sub-heading-text" v-if="!banPoll"> Pick the player you want to ban!</span>
        </div>

        <!-- Init Ban Poll View -->
        <div class="choose-player-to-ban-content" v-if="!banPoll">
            <div class="filter-row">
                <span>filter by name</span>
                <input v-on:input="filterChange($event)"></div>
            <div class="available-players-to-ban">
                <lobby-avatar
                        :class="{'is-selected-ban-player': selectedPlayer === player?.id, 'is-not-selected-ban-player': selectedPlayer !== player?.id}"
                        v-for="player in filteredPlayers" :key="player.id"
                        class="ban-player"
                        v-bind:lobbyPlayer="player"
                        v-bind:plainName="true"
                        v-on:click="selectPlayer(player)"
                ></lobby-avatar>
            </div>

            <label class="reason-title">Reason: </label>
            <textarea class="reason-text-input" maxlength="100" v-model="reasonInput">reason</textarea>
            <div class="ban-poll-btn-panel">
                <button class="main-button m-1vw small" :disabled="!banSelectionValid"
                        :class="{'disabled': !banSelectionValid}"
                        v-on:click="initBanPoll()">Vote on Ban
                </button>
                <button class="main-button m-1vw small"
                        v-on:click="closeBanPollMenu()">cancel
                </button>
            </div>
        </div>

        <!-- Vote View -->
        <div class="ban-poll-content" v-if="banPoll">
            <div class="on-ban-vote-title">
                <span class="current-title">{{initiatedBy?.name}} wants to ban {{playerVotedOn?.name}}</span>
                <timer-container class="ban-timer" v-if="banPoll.banPollTimeOut" v-bind:timer="banPoll.banPollTimeOut"
                                 v-bind:format="'seconds-plain'"></timer-container>
            </div>

            <lobby-avatar class="ban-player"
                          v-if="playerVotedOn"
                          v-bind:lobbyPlayer="playerVotedOn"
                          v-bind:plainName="true"
            ></lobby-avatar>
            <span class="reason-title">Reason:</span>
            <div class="reason-text" maxlength="100">{{banPoll.reason}}</div>
            <span class="poll-action-title">{{getPollAction()}}</span>
            <div class="ban-poll-btn-panel" v-if="localPlayerHasNotVoted && localPlayerIsNoBanCandidate && !banPoll.closed">
                <button class="main-button m-1vw small" v-on:click="voteOnBan(true)">yes</button>
                <button class="main-button m-1vw small" v-on:click="voteOnBan(false)">no</button>
            </div>
            <div class="ban-poll-result-container" v-if="!(localPlayerHasNotVoted && localPlayerIsNoBanCandidate)">
                <div class="poll-result-message"><span>will not be banned</span> <span>will be banned</span></div>
                <div class="poll-beam" :class="{'banned':playerWillBeBanned()}" :style="{minWidth: getPollBeamWidth()}">
                </div>
                <hr class="poll-limit"/>
            </div>
        </div>


    </div>
</template>

<script>
    import {AuthenticatedRequest} from "@/model/authenticated-request.model";
    import {RequestMessageType} from "@/constants/vue-constants";
    import LobbyAvatar from "@/components/lobby-avatar";
    import TimerContainer from "@/components/timer-container";

    export default {
        name: 'BanPoll',
        props: ['banPoll', 'players'],
        emits: ['onClose'],
        components: {TimerContainer, LobbyAvatar},
        data() {
            return {
                selectedPlayer: null,
                reasonInput: '',
                filter: '',
                pollCloseTimer: null
            }
        },
        methods: {
            initBanPoll: function () {
                if (this.banSelectionValid) {
                    const initBanPollRequest = new AuthenticatedRequest({
                        type: RequestMessageType.INIT_BAN_VOTE,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: {reason: this.reasonInput, playerId: this.selectedPlayer}
                    });
                    this.$websocketService.sendMessage(initBanPollRequest);
                    this.closeBanPollMenu();
                }
            },
            getPollAction: function() {
              return   this.banPoll.closed ? ((this.playerWillBeBanned() ? 'Vote on ban successful ' : 'Vote on ban failed ') + this.banPoll.result.yes + '/' + this.yesVotesRequired()) : ((this.localPlayerHasNotVoted && this.localPlayerIsNoBanCandidate) ? 'Your Vote:' : 'Yes Votes ' + this.banPoll.result.yes + '/' + this.yesVotesRequired());
            },
            playerWillBeBanned : function() {
                return this.banPoll && this.banPoll.result.yes >= this.yesVotesRequired();
            },
            getPollBeamWidth: function () {
                const unitLength = 150 / this.yesVotesRequired();
                return this.banPoll.result.yes * unitLength + 'px';
            },
            yesVotesRequired: function () {
                return Math.max(2, this.players.length / 2);
            },
            voteOnBan: function (vote) {
                if (this.banPoll && !this.banPoll.closed) {
                    const initBanPollRequest = new AuthenticatedRequest({
                        type: RequestMessageType.BAN_VOTE,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: vote
                    });
                    this.$websocketService.sendMessage(initBanPollRequest);
                }
            },
            closeBanPollMenu: function () {
                this.$emit('onClose', false);
            },
            selectPlayer: function (player) {
                if (this.selectedPlayer === player.id) {
                    this.selectedPlayer = null;
                } else {
                    this.selectedPlayer = player.id;
                }
            },
            filterChange: function (event) {
                this.filter = event.target?.value || '';
            }
        },
        computed: {
            playerVotedOn: function () {
                return this.players && this.banPoll ? this.players.find(p => p.id === this.banPoll.banCandidate) : null;
            },
            initiatedBy: function () {
                return this.players && this.banPoll ? this.players.find(p => p.id === this.banPoll.initiatedBy) : null;
            },
            banSelectionValid: function () {
                return this.selectedPlayer && this.reasonInput.length > 0
            },
            filteredPlayers: function () {
                return this.banOptions ? this.banOptions.filter(p => p.id === this.selectedPlayer || p.name.includes(this.filter)) : [];
            },
            localPlayerHasNotVoted: function () {
                return this.banPoll ? !this.banPoll.votes.find(v => v.voterId === this.localPlayerId) : false;
            },
            localPlayerIsNoBanCandidate: function () {
                return this.banPoll ? this.banPoll.banCandidate !== this.localPlayerId : false;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            banOptions: function () {
                return this.players.filter(player => player.id !== this.localPlayerId); //
            }
        }
    }
</script>

<style scoped lang="scss">

    .ban-poll-wrapper {
        box-shadow: 5px 5px 3px 0px rgb(94 79 163 / 65%);
        font-family: 'Source Sans Pro', sans-serif;
        background-color: #6151aa;
        max-width: 25vw;
        min-width: 275px;
        display: flex;
        flex-direction: column;
        position: absolute;
        z-index: 999999;
        border-radius: 9px;
        bottom: 10px;
        right: 10px;
        overflow: hidden;

        .ban-poll-heading {
            padding: 3px;
            background-color: #3d0602;
            display: flex;

            .main-heading-text {
                font-size: calc(14px + 0.2vw);
                line-height: calc(14px + 0.2vw);
                font-weight: bold;
                padding: 3px 5px;
            }

            .sub-heading-text {
                padding-left: 10px;
                font-size: calc(14px + 0.2vw);
                line-height: calc(14px + 0.2vw);
                padding: 3px 5px;
            }
        }

        .choose-player-to-ban-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px 10px;

            input, textarea {
                outline: none;
                border: none;
                border-radius: 5px;
                background-color: #8474e6;
            }

            .filter-row {
                display: grid;
                grid-template-columns: 100px auto;
                margin: 5px;
                justify-content: flex-start;
                grid-column-gap: 5px;
                width: 85%;
                align-items: center;

                span {
                    font-family: 'Source Sans Pro', sans-serif;
                    font-weight: bold;
                }

                input {
                    height: 25px;
                    width: 100%;
                }
            }

            .available-players-to-ban {
                display: flex;
                flex-wrap: wrap;
                overflow: auto;
                height: 150px;

                .ban-player {
                    width: 3vw;
                    height: 3vw;
                    min-width: 50px;
                    min-height: 50px;

                    &.is-selected-ban-player {
                        background-color: #aa1900;
                        border-radius: 5px;
                        outline: 5px solid #aa1900;
                    }

                    &.is-not-selected-ban-player {
                        opacity: 0.75;
                    }
                }
            }


            .reason-title {
                margin-top: 10px;
                font-family: bungee;
                line-height: 12px;
            }

            .reason-text-input {
                margin: 5px;
                width: 85%;
                border-radius: 5px;
                resize: none;
                height: 55px;
            }
        }

        .ban-poll-content {
            position: relative;
            display: flex;
            flex-direction: column;
            padding: 5px 10px;
            align-items: center;

            .on-ban-vote-title {
                display: flex;
                width: 100%;
                justify-content: space-between;

                .ban-timer {
                    width: min-content;
                }

                .current-title {
                    color: black;
                    font-weight: bold;
                    z-index: 555;
                    font-size: calc(10px + 0.5vw);
                    margin-right: 5px;
                    max-width: 250px;
                }
            }


            .reason-title {
                margin-top: 10px;
                font-family: bungee;
                line-height: 12px;
            }

            .reason-text {
                font-size: calc(14px + 0.2vw);
                line-height: calc(14px + 0.2vw);
                margin: 5px;
                width: 85%;
                border-radius: 5px;
                resize: none;
                height: 55px;
                color: black;
                padding: 6px;
                background-color: #8474e6;
            }

        }

        .poll-action-title {
            margin: 10px 0;
            font-family: bungee;
            line-height: 12px;
        }

        .ban-poll-btn-panel {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .ban-poll-result-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 95%;

            .poll-beam {
                position: relative;
                background-color: var(--highlight-color);
                height: 18px;
                max-width: 250px;

                &.banned{
                    background-color: red;
                }
            }

            .poll-limit {
                position: absolute;
                border: none;
                left: 50%;
                border-left: 2px solid white;
                height: 30px;
            }

            .poll-result-message {
                width: 100%;
                justify-content: center;
                display: grid;
                grid-template-columns: 1fr 1fr;
                font-size: 13px;
                font-weight: bold;
                color: black;
                padding-bottom: 2px;

                span {
                    text-align: center;
                }
            }
        }

    }


</style>