<template>
    <div class="term-assignment-player-container">
        <div class="term-assignment-avatar-container">
            <div class="term-assignment-avatar-hair" v-html="displayedAvatar?.hair"
            ></div>
            <div class="term-assignment-avatar-head"
                    v-html="displayedAvatar?.head"></div>
            <div class="term-assignment-avatar-shirt"
                    v-html="displayedAvatar?.shirt"
            ></div>
            <note v-if="!hideNote" v-bind:termAssignmentPlayer="termAssignmentPlayer"></note>
        </div>
        <transition name="badge-transition">
            <div class="winner-flag" v-if="winningPosition > 0">
                <img :src="require(`../assets/${getBadgeType(winningPosition)}-winner-badge.svg`)">
                <span>{{ winningPosition }}</span>
            </div>
        </transition>

        <div v-if="!hidePlayerName"
             class="term-assignment-player-name"
             :title="termAssignmentPlayer.name">
            <span> {{ termAssignmentPlayer.name }}</span>
        </div>

        <transition name="disconnect-transition">
            <img class="disconnect-symbol blink" v-if="isDisconnected" src="../assets/disconnect.svg">
        </transition>
    </div>
</template>

<script>
    import * as avatars from "@/assets/avatar/avatar-constants.ts";
    import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";
    import {AvatarElement} from "@/model/avatar-element";
    import {
        HAIR_COLOR_PLACEHOLDER,
        SHIRT_COLOR_PLACEHOLDER,
        SKIN_COLOR_PLACEHOLDER
    } from "@/assets/avatar/avatar-constants.ts";
    import Note from "@/components/note";
    import {Logger} from "@/services/util";

    export default {
        name: "TermAssigmentAvatar",
        props: ["termAssignmentPlayer", "hideNote", "hidePlayerName", "winningPosition", "isDisconnected"],
        data() {
            return {
                displayedAvatar: null,
                noteFontSize: 0
            };
        },
        components: {Note},
        watch: {
            termAssignmentPlayer: function (
                newtermAssignmentPlayer,
                oldtermAssignmentPlayer
            ) {
                // watch it
                this.externalUpdate(newtermAssignmentPlayer.avatar);
            },
        },
        methods: {
            findElementByTypeAndCode: function (options, code) {
                return options.find((o) => +o.code === +code);
            },
            getBadgeType: function (winningPosition) {
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
            getNoteFontSizeNoteWidth: function (elem) {
                if (elem) {
                    Logger.log(elem.offsetWidth + ' | ' + elem.offsetWidth / 15)
                    this.noteFontSize = (elem.offsetWidth / 15) + 'px';
                }
                this.noteFontSize = 0;
            },
            getNoteWidth: function () {
                return '100px';
            },
            getNoteHeight: function () {
                return '100px';
            },
            externalUpdate: function (updatedAvatar) {
                if (this.termAssignmentPlayer && this.termAssignmentPlayer.avatar) {
                    const hair = this.findElementByTypeAndCode(
                        avatars.avatarHairsOptions,
                        updatedAvatar.hair.code
                    );
                    const head = this.findElementByTypeAndCode(
                        avatars.avatarHeadsOptions,
                        updatedAvatar.head.code
                    );
                    const shirt = this.findElementByTypeAndCode(
                        avatars.avatarShirtsOptions,
                        updatedAvatar.shirt.code
                    );
                    const displayedAvatar = {
                        hair: hair.value.replaceAll(HAIR_COLOR_PLACEHOLDER, updatedAvatar.hair.color),
                        head: head.value.replaceAll(SKIN_COLOR_PLACEHOLDER, updatedAvatar.head.color),
                        shirt: shirt.value.replaceAll(SHIRT_COLOR_PLACEHOLDER, updatedAvatar.shirt.color)
                    }
                    this.displayedAvatar = displayedAvatar;
                }
            },
            getDisplayedTerm: function () {
                if ('term' in this.termAssignmentPlayer) {
                    return this.termAssignmentPlayer.term;
                }
                return this.termAssignmentPlayer?.assignment ? this.termAssignmentPlayer.assignment.term : '';
            }
        },
        beforeMount: function () {
            this.externalUpdate(this.termAssignmentPlayer?.avatar);
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .disconnect-symbol {
        position: absolute;
        right: 0;
        height: 35%;
        width: 35%;
        animation: blink 1.25s 2.5 linear;
    }

    @keyframes blink {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .disconnect-transition-enter-active {
        animation: blink 0.33s ease;
    }

    .disconnect-transition-leave-active, .badge-transition-leave-active {
        transition: opacity 0.5s ease;
        opacity: 0;
    }

    .badge-transition-enter-active {
        opacity: 0;
    }

    .term-assignment-player-container {
        position: relative;
        display: flex;
        flex-direction: column;
        transition: all 0.8s ease;
    }

    .term-assignment-avatar-container {
        position: relative;
        width: 100%;
        height: 100%;
        max-width: inherit;
        max-height: inherit;
        background-color: var(--light-background-color);
        border-radius: 50%;
        overflow: hidden;
        box-shadow: rgb(0 0 0 / 50%) 1.95px 3.95px 3.6px;

    }

    .term-assignment-player-container.player-selected .term-assignment-avatar-container {
        box-shadow: var(--highlight-color) 0px 0px 1px 4px;
    }

    .term-assignment-player-container.is-local-player .term-assignment-avatar-container {
        background-color: var(--highlight-color-light-shade);
    }

    .term-assignment-player-container.is-player-solving {
        animation: shake 1.5s ease infinite;
        @keyframes shake {
            0% {
                transform: rotateZ(5deg) scale(1);
            }
            50% {
                transform: rotateZ(-5deg) scale(0.9);

            }
            100% {
                transform: rotateZ(5deg) scale(1);

            }
        }
    }

    .term-assignment-player-container.is-player-solving .term-assignment-avatar-container {
        // animation: animBgColor 1.5s infinite ease-in-out

        background: linear-gradient(-45deg, #362a57, #673a97, #b4a7f2, white);
        animation: gradient 1.5s ease infinite;
        background-size: 250% 250%;

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }

        @keyframes animBgColor {
            0% {
                //background-color: white;
                box-shadow: 5px 5px 5px 4px  #E9E363;
            }
            50% {
                //background-color: #E9E363;
                box-shadow: 5px 5px 5px 4px  white;
            }
            100% {
                //background-color: white;
                box-shadow: 5px 5px 5px 4px #E9E363;
            }
        }
    }

    .term-assignment-player-name {
        position: absolute;
        box-sizing: border-box;
        z-index: 9999;
        bottom: -1.5vw;
        width: 100%;
        display: flex;
        justify-content: center;
        user-select: none;
    }

    .term-assignment-player-name span {
        font-size: min(max(8px, 0.525vw), 15px);
        line-height: min(max(8px, 0.6vw), 15px);
        overflow-wrap: break-word;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: clip;
        box-sizing: border-box;
        z-index: 250;
        background-color: var(--primary-dark-transparent-color);
        border-radius: 23px;
        border: 2px rgba(190, 180, 233, 0.55) solid;
        color: var(--primary-light-text-color);
        padding: 7px 12px 6px 12px;
    }


    .term-assignment-avatar-hair {
        z-index: 5000;
        width: 100%;
    }

    .term-assignment-avatar-head {
        z-index: 4998;
        width: 100%;
    }

    .term-assignment-avatar-shirt {
        z-index: 4999;
        width: 100%;
    }

    .term-assignment-avatar-hair svg {
        position: absolute;
        top: 3.5%;
        width: 100%;
        height: auto;
        z-index: 3;
    }

    .term-assignment-avatar-head svg {
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

    .term-assignment-avatar-shirt svg {
        position: absolute;
        bottom: -0.0%;
        left: 0%;
        z-index: 2;
        width: 100%;
        height: auto;
    }

    .winner-flag {
        position: absolute;
        left: 10px;
        width: 25%;
        height: 50%;
        min-width: 15px;
        min-height: 30px;
        z-index: 10000;
        user-select: none;
        transition: opacity 0.5s ease;


        svg, img {
            width: 100%;
            height: auto;
        }

        span {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: calc(7px + 0.75vw);
            color: rgba(0, 0, 0, 0.85);
        }
    }


</style>
