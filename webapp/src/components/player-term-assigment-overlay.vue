<template>
    <div class="player-term-assignment-overlay-wrapper overlay">
        <div class="theme-wrapper">
            <span class="theme-header">Game Theme</span>
            <span class="game-theme">{{gameTheme ? gameTheme : '-'}}</span>
        </div>
        <div class="your-term-container">
            <input v-model="displayedPlayerTerm"
                   v-on:input="changedTerm()"

                   spellcheck="false"
                   :title="`Use your imagination and think of an identity for ${displayedTermAssigmentPlayerName} so that the game can begin.`"
                   placeholder="enter an identity..."
                   class="input-term-field"/>
        </div>
        <div class="player-term-assignment-content">
            <div class="player-term-assignment-avatar-container">
                <div v-if="termAssignment && termAssignment.mode !== AssignmentModes.FULL_RANDOM">
                    <div class="player-term-assignment-avatar-hair" v-html="displayedAvatar?.hair">
                    </div>
                    <div class="player-term-assignment-avatar-head" v-html="displayedAvatar?.head">
                    </div>
                    <div class="player-term-assignment-avatar-shirt" v-html="displayedAvatar?.shirt">
                    </div>
                </div>
                <div class="anonymous-avatar"
                     v-if="!termAssignment || termAssignment.mode === AssignmentModes.FULL_RANDOM">
                    <img src="../assets/anonymousAvatar.svg">
                </div>
                <note v-bind:termAssignmentPlayer="{term: displayedPlayerTerm}"></note>
            </div>
        </div>
        <div class="button-panel">
            <button class="main-button m-10px" :disabled="!termValid" :class="{'disabled': !termValid}"
                    v-on:click="requestAssignTerm()"> Assign Identity
            </button>
            <button class="main-button m-10px-v"
                    v-if="termAssignment.mode === AssignmentModes.SELECT_ASSIGNEE"
                    v-on:click="requestCancelTermAssignment()"> Cancel
            </button>
        </div>
        <span class="info-overlay-text">Think of an identity for {{ displayedTermAssigmentPlayerName}} so that the game can begin.</span>

    </div>

</template>

<script>

    import * as avatars from "@/assets/avatar/avatar-constants.ts";
    import {AuthenticatedRequest} from "@/model/authenticated-request.model";
    import {MAX_PLAYER_IDENTITY_LENGTH, RequestMessageType} from "@/constants/vue-constants";
    import {
        HAIR_COLOR_PLACEHOLDER,
        SHIRT_COLOR_PLACEHOLDER,
        SKIN_COLOR_PLACEHOLDER
    } from "@/assets/avatar/avatar-constants.ts";
    import {AssignmentModes} from '@/constants/vue-constants';
    import Note from "@/components/note";

    export default {
        name: 'PlayerTermAssignmentOverlay',
        props: ['termAssigmentPlayer', 'mode'],
        components: {Note},
        data() {
            return {
                displayedAvatar: null,
                displayedPlayerTerm: '',
                AssignmentModes
            }
        },
        watch: {
            termAssigmentPlayer: function (newTermAssignmentPlayer, oldTermAssignmentPlayer) { // watch it
                this.externalUpdate(newTermAssignmentPlayer.avatar);
            }
        },
        methods: {
            restrictWhiteSpace: function () {
                let modifiedText = this.displayedPlayerTerm.replaceAll(/\s+/gm, " ").replace(/^\s+?(.*)\s+?$/, "$1");
                if (modifiedText !== this.displayedPlayerTerm) {
                    let selection = window.getSelection();
                    let inputNode = selection.anchorNode.childNodes[0];
                    let caretPos = Math.max(0, Math.min(inputNode.selectionStart - 1, modifiedText.length));
                    this.displayedPlayerTerm = modifiedText;
                    this.$nextTick(function () {
                        inputNode.focus();
                        inputNode.setSelectionRange(caretPos, caretPos);
                    })
                }
            },
            changedTerm: function () {
                this.restrictWhiteSpace();
                if (this.displayedPlayerTerm.length > MAX_PLAYER_IDENTITY_LENGTH) {
                    this.displayedPlayerTerm = this.displayedPlayerTerm.substring(0, MAX_PLAYER_IDENTITY_LENGTH);
                }
            },
            findElementByTypeAndCode: function (options, code) {
                return options.find(o => +o.code === +code);
            },
            externalUpdate: function (updatedAvatar) {
                if (this.termAssigmentPlayer && this.termAssigmentPlayer.avatar) {
                    const hair = this.findElementByTypeAndCode(avatars.avatarHairsOptions, updatedAvatar.hair.code);
                    const head = this.findElementByTypeAndCode(avatars.avatarHeadsOptions, updatedAvatar.head.code);
                    const shirt = this.findElementByTypeAndCode(avatars.avatarShirtsOptions, updatedAvatar.shirt.code);
                    const displayedAvatar = {
                        hair: hair.value.replaceAll(HAIR_COLOR_PLACEHOLDER, updatedAvatar.hair.color),
                        head: head.value.replaceAll(SKIN_COLOR_PLACEHOLDER, updatedAvatar.head.color),
                        shirt: shirt.value.replaceAll(SHIRT_COLOR_PLACEHOLDER, updatedAvatar.shirt.color)
                    }
                    this.displayedAvatar = displayedAvatar;
                }
            },
            onChangePlayerTerm: function (value) {
                this.displayedPlayerTerm = value;
            },
            requestAssignTerm: function () {
                this.restrictWhiteSpace();
                if (this.termValid) {

                    const updatedTermAssignment = {
                        ...this.termAssigmentPlayer.assignment,
                        term: this.displayedPlayerTerm
                    };

                    const assignTermRequest = new AuthenticatedRequest({
                        type: RequestMessageType.ASSIGN_TERM,
                        playerAuthentication: this.$store.state.playerAuthentication,
                        gameSessionId: this.$store.state.gameSessionId,
                        data: updatedTermAssignment
                    });
                    this.$websocketService.sendMessage(assignTermRequest);
                }
            },
            requestCancelTermAssignment: function () {
                const cancelTermAssignment = {
                    ...this.termAssigmentPlayer.assignment
                };
                const cancelAssignTermRequest = new AuthenticatedRequest({
                    type: RequestMessageType.CANCEL_ASSIGN_TERM,
                    playerAuthentication: this.$store.state.playerAuthentication,
                    gameSessionId: this.$store.state.gameSessionId,
                    data: cancelTermAssignment
                });
                this.$websocketService.sendMessage(cancelAssignTermRequest);
            }
        },
        computed: {
            termValid: function () {
                return this.displayedPlayerTerm.length >= 2 && this.displayedPlayerTerm !== '?';
            },
            termAssignment: function () {
                return this.$store.state.termAssignment;
            },
            gameTheme: function () {
                return this.$store.state.chosenGameTopic;
            },
            displayedTermAssigmentPlayerName: function () {
                return this.termAssignment?.mode === AssignmentModes.FULL_RANDOM ? 'Unknown' : this.termAssigmentPlayer?.name;
            }
        },
        beforeMount: function () {
            this.externalUpdate(this.termAssigmentPlayer.avatar);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    .player-term-assignment-overlay-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 9999;
        height: unset;
        overflow: auto;

        @media only screen and (max-aspect-ratio: 1/1) {
            bottom: 0 !important;
        }
    }

    .theme-wrapper {
        display: flex;
        top: 0;
        background-color: #463a7b;
        width: min(max(200px, 40%), 500px);
        flex-direction: column;
        align-items: center;
        box-shadow: 3px 2px 2px 1px #020104;
        border-radius: 0px 0px 10px 10px;
        padding: 8px;
        font-size: calc(11px + 0.75vw);
        line-height: calc(13px + 0.75vw);

        .theme-header {
            margin-bottom: 12px;
            text-shadow: 2px 2px 2px black;
        }

        .game-theme {
            color: var(--highlight-color);
            text-align: center;
            word-break: break-word;
            font-size: calc(11px + 1vw);
            line-height: calc(13px + 1vw);
        }
    }

    .player-term-assignment-content {
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .player-term-assignment-avatar-container {
        position: relative;
        height: min(30vw, 50vh);
        width: min(30vw, 50vh);
        min-width: 275px;
        min-height: 275px;
        background-color: #ab9ee9;
        border-radius: 50%;
        box-shadow: rgb(0 0 0 / 50%) 1.95px 3.95px 3.6px;
        overflow: hidden;

        .anonymous-avatar {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .player-term-assignment-avatar-hair {
        z-index: 5000;
        width: 100%;
    }

    .player-term-assignment-avatar-head {
        z-index: 4998;
        width: 100%;

    }

    .player-term-assignment-avatar-shirt {
        z-index: 4999;
        width: 100%;
    }

    .player-term-assignment-avatar-hair svg {
        position: absolute;
        top: 3.5%;
        width: 100%;
        height: auto;
        z-index: 3;
    }

    .player-term-assignment-avatar-head svg {
        position: absolute;
        height: auto;
        z-index: 1;
        margin: auto;
        top: 10%;
        left: 0;
        bottom: 0;
        right: 0;
        width: 87%;
    }

    .player-term-assignment-avatar-shirt svg {
        position: absolute;
        bottom: -0.0%;
        left: 0%;
        z-index: 2;
        width: 100%;
        height: auto;
    }

    .info-overlay-text {
        text-align: center;
        width: min(max(295px, 50vw), 1000px);
        text-shadow: 2px 3px 2px rgb(156, 141, 226);
        font-style: italic;
        font-size: calc(11px + 1.15vw);
        line-height: calc(15px + 1.3vw);
        margin: 2vh;

    }

    .your-term-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 2vh;
    }

    .input-term-field {
        background-color: var(--primary-dark-transparent-color);
        border-radius: 23px;
        border: 4px rgba(190, 180, 233, 0.55) solid;
        width: 33vw;
        min-width: 275px;
        height: 35px;
        font-family: bungee;
        color: var(--primary-light-text-color);
        font-size: 15px;
        text-align: center;
        outline: none;
    }

    .button-panel {
        display: flex;
        justify-content: center;
        grid-template-columns: min-content min-content;
        grid-gap: 30px;
    }

</style>
