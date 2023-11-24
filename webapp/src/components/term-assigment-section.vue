<template>
    <div class="term-assignment-wrapper">
        <span class="term-assignment-section-title">Identity Assignment</span>
        <span class="content-title">{{ currentAction }}</span>
        <div class="term-assigment-section-content">
            <div class="local-user-content-wrapper">
                <div class="term-assignment-section-local-player-avatar-container">
                    <term-assignment-avatar class="local-term-assignment-player"
                                            v-bind:termAssignmentPlayer="localAssignmentPlayer"
                                            v-bind:hideNote="!localAssignmentPlayer.assignment.assignerId"
                    ></term-assignment-avatar>
                </div>
                <div class="connector">
                </div>
                <div class="term-assignment-section-local-player-assignee-avatar-container">
                    <term-assignment-avatar class="local-term-assignment-player"
                                            v-bind:termAssignmentPlayer="localPlayerAssignee"
                                            v-if="localAssignmentPlayer.assignment.assigneeId && localPlayerAssignee"
                                            v-bind:hideNote="false"
                                            v-bind:hidePlayerName="false">
                    </term-assignment-avatar>
                </div>
            </div>
            <transition name="hide-player-list-container">
                <div class="term-assignment-player-list-container" v-if="!localPlayerAssignee">
                    <div class="term-assignment-section-avatar-container" v-for="pl in filteredAssigmentPlayerOptions"
                         :key="pl.id">
                        <term-assignment-avatar class="term-assignment-player-option"
                                                v-on:click="requestLockAssignee(pl)"
                                                v-bind:termAssignmentPlayer="pl"
                                                v-bind:hideNote="!pl.assignment.assignerId"></term-assignment-avatar>
                    </div>
                </div>
            </transition>
        </div>
      <div class="player-options-title">
        <span>Identities assigned</span>
        <span class="assigned-players-ratio">{{assignedPlayersCount}} / {{ allAssignmentPlayers.length }}</span>
      </div>
        <language-selector class="language-selector-absolute"
                           v-bind:disabled="true"
                           v-bind:selection="termAssignment.language"
        >

        </language-selector>
    </div>
</template>

<script>
    import TermAssignmentAvatar from "@/components/term-assignment-avatar";
    import {AuthenticatedRequest} from "@/model/authenticated-request.model";
    import {RequestMessageType} from "@/constants/vue-constants";
    import LanguageSelector from "@/components/language-selector";

    export default {
        name: 'TermAssignmentSection',
        components: {LanguageSelector, TermAssignmentAvatar},
        props: {
            msg: String
        },
        data() {
            return {}
        },
        methods: {
            requestLockAssignee: function (assignee) {
                if (!this.assigneeIsLocked(assignee)) {
                    const requestLockAssignee = new AuthenticatedRequest({
                        type: RequestMessageType.LOCK_ASSIGNEE,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: assignee.id
                    });
                    this.$websocketService.sendMessage(requestLockAssignee);
                }
            },
            assigneeIsLocked: function (assignee) {
                return !!assignee.assignerId;
            }
        },
        computed: {
            allAssignmentPlayers: function () {
                return this.$store.state.termAssignment.assignmentPlayers;
            },
            filteredAssigmentPlayerOptions: function () {
                const deadlockPrevention = this.deadLockPrevention;
                const localPlayerAssignee = this.localPlayerAssignee;
                return this.$store.state.termAssignment.assignmentPlayers.filter(ap =>
                    ap.id !== this.localPlayerId &&
                    ap.id !== localPlayerAssignee?.id &&
                    !ap.assignment.assignerId &&
                    (ap.id !== this.localAssignmentPlayer.assignment.assignerId || this.allAssignmentPlayers.length < 3) &&
                    (!deadlockPrevention || !(deadlockPrevention.forbidden === ap.id && deadlockPrevention.localPlayer === this.localPlayerId))
                );
            },
            assignedPlayersCount: function () {
                return this.termAssignment.assignedPlayersCount;
            },
            deadLockPrevention: function () {
                return this.termAssignment.deadLockPrevention;
            },
            termAssignment: function () {
                return this.$store.state.termAssignment;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            localAssignmentPlayer: function () {
                return this.$store.state.termAssignment.assignmentPlayers?.find(lp => lp.id === this.localPlayerId);
            },
            currentAction: function () {
                const assignee = this.localPlayerAssignee;
                if (assignee) {
                    return 'Waiting for other Players to assign an Identity.';
                }
                return 'You need to pick a player and assign an identity'
            },
            localPlayerAssignee: function () {
                return this.allAssignmentPlayers ? this.allAssignmentPlayers.find(ap => ap.assignment.assignerId === this.localPlayerId) : null;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .term-assignment-wrapper {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 100%;
        max-width: 1920px;
        height: 90%;
        padding: 1%;
        margin: 10% 1% 10% 1%;
        box-sizing: border-box;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position-y: bottom;

        .you-title {
            margin-top: 1vw;
            text-align: center;
            font-size: calc(10px + 1vw);
            line-height: calc(11px + 1vw);
            padding: 0.5vw;
            color: black;
            z-index: 9999;
        }

        .content-title {
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: calc(18px + 1vw);
            line-height: calc(19px + 1vw);
            color: #3f3068;
            margin-bottom: calc(10px + 0.5vw);
            width: 50vw;
            align-self: center;
            min-width: 325px;

        }

        .player-options-title {

            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: calc(8px + 1vw);
            line-height: calc(8px + 1vw);
            color: #3f3068;

            .assigned-players-ratio {
                margin-top: 0.2vw;
                font-size: calc(9px + 1vw);
                line-height: calc(9px + 1vw);
                letter-spacing: -0.1vw;
            }
        }

        .term-assignment-section-title {
            justify-self: center;
            padding: 10px;
            color: #a295dea6;
            text-align: center;
            font-size: calc(25px + 1vw);
            line-height: calc(28px + 1vw);
        }

    }


    .term-assigment-section-content {
        display: flex;
        width: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        margin-bottom: 50px;
        justify-content: center;

        .local-user-content-wrapper {
            display: flex;
            flex-direction: row;
            align-items: center;
            box-sizing: border-box;
            padding: 2vw;
            justify-self: center;
            width: fit-content;

            .term-assignment-section-local-player-avatar-container {
                position: relative;
                width: min-content;
                height: fit-content;
                justify-self: center;
                //margin: calc(5px + 0.25vw);
                box-sizing: border-box;
                border: 5px rgba(29, 29, 27, .15) solid;
                box-shadow: inset 0px 2px 0px 0px rgb(255 255 255 / 15%), 0px 2px 0px 0px rgb(255 255 255 / 15%);
                border-radius: 100%;
                padding: 20px;


            }

            .connector {
                width: 25px;
                border: 3px rgba(29, 29, 27, .15) solid;
                box-shadow: inset 0px 2px 0px 0px rgb(255 255 255 / 15%), 0px 2px 0px 0px rgb(255 255 255 / 15%);
            }

            .term-assignment-section-local-player-assignee-avatar-container {
                position: relative;
                width: min-content;
                height: fit-content;
                justify-self: center;
                //margin: calc(5px + 0.25vw);
                box-sizing: border-box;
                border: 5px rgba(29, 29, 27, .15) solid;
                box-shadow: inset 0px 2px 0px 0px rgb(255 255 255 / 15%), 0px 2px 0px 0px rgb(255 255 255 / 15%);
                border-radius: 100%;
                padding: 15px;

                .local-player-assignee {
                    width: calc(18vw / 2);
                    height: calc(18vw / 2);
                    min-width: calc(115px / 2);
                    min-height: calc(115px / 2);
                }

            }

            .local-term-assignment-player {
                width: min(18vw, 25vh);
                height: min(18vw, 25vh);
                min-width: 115px;
                min-height: 115px;
            }

        }
    }

    .term-assignment-section-avatar-container {
        position: relative;
        width: min-content;
        height: fit-content;
        justify-self: center;
        margin: calc(5px + 0.25vw);
        box-sizing: border-box;
    }

    .term-assignment-player-list-container {
        position: relative;
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        padding: 5px;
        border: 3px rgba(29, 29, 27, .15) solid;
        box-shadow: inset 0px 2px 0px 0px rgb(255 255 255 / 15%), 0px 3px 0px 0px rgb(255 255 255 / 15%);
        border-radius: 15px;
        padding: 1vw;
        box-sizing: border-box;
        overflow-y: auto;

        .term-assignment-player-option {
            width: min(12vw, 19vh);
            height: min(12vw, 19vh);
            min-width: 100px;
            min-height: 100px;
            cursor: pointer;
        }
    }


    @media only screen and (max-width: 700px) {
        .term-assigment-section-content {
            flex-direction: column;
            align-items: center;
            margin-bottom: 0px;
        }

        .local-term-assignment-player {
            justify-self: center;
        }
    }


    .hide-player-list-container-enter-active {
        transition: all 0.5s ease;
    }

    .hide-player-list-container-enter-from {
        position: absolute;
        transform: translateX(100%);
    }

</style>
