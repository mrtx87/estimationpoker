<template>
    <div class="cheat-sheet-wrapper" v-if="cheatSheet" :class="{'open':open, 'close':animClose}"  @animationend="onAnimEnd">
        <button class="cheat-sheet-header" v-on:click="interToggleOpenClose()">Cheat Sheet</button>
        <button class="close-cheatsheet" v-on:click="interToggleOpenClose()">
            <img src="../assets/close.svg">
        </button>
        <div class="cheat-sheet-content" :class="{'open':open}">
            <div class="cheat-sheet-question-container" v-for="(question, index) in cheatSheet.questions"
                 :key="question.question">
                <span class="question-counter">{{cheatSheet.questions.length - index}}</span>
                <span class="cheat-sheet-question-text">{{question.question}}</span>
                <div class="cheat-sheet-answer-is-solution">
                    <img v-if="question.solution" :src="require(`../assets/default-winner-badge.svg`)">
                </div>
                <div class="cheat-sheet-answer">
                    <img :src="require(`../assets/${getAnswerSvg(question.answer)}.svg`)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'CheatSheet',
        emits: ['onInnerToggleOpenCloseChange'],
        data() {
            return {
                open: false,
                animClose: false
            }
        },
        watch: {
            extOpen: function (newVal, oldVal) {
                this.open = newVal;
            }
        },
        props: [
            'cheatSheet', 'extOpen'
        ],
        methods: {
            onAnimEnd: function() {
                this.animClose = false;
            },
            interToggleOpenClose: function () {
                this.open = !this.open;
                if(!this.open) {
                    this.animClose = true;
                }else{
                    this.animClose = false;
                }
                this.$emit('onInnerToggleOpenCloseChange', this.open);
            },
            getAnswerSvg: function (answer) {
                switch (answer) {

                    case 1:
                        return 'check';
                    case -1:
                        return 'no';
                    case 0 :
                    default:
                        return 'line'
                }
            }
        },
        computed: {}
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .cheat-sheet-wrapper {
        position: absolute;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        width: 333px;
        min-width: 200px;
        background-color: #000000ad;
        border: none;
        border-radius: 15px 15px 0px 0px;
        color: white;
        text-align: center;
        justify-content: center;
        user-select: none;
        overflow: hidden;
        bottom: 0;
        left: -350px;;

        &.close {
            animation: slideDown 0.25s ease-in-out;
            @keyframes slideDown {
                from {
                    left: 2vw;
                }
                to {
                    left: -350px;;
                }
            }
        }

        &.open {
            animation: slideOpen 0.25s ease-in-out;
            left: 2vw;

            @keyframes slideOpen {
                from {
                    left: -350px;
                }
                to {
                    left: 2vw;
                }
            }

        }

        .close-cheatsheet {
            cursor: pointer;
            appearance: none;
            background-color: transparent;
            border: none;
            outline: none;
            position: absolute;
            right: 2px;
            top: 0px;

            img {
                width: 20px;
                height: auto;
            }

            :hover {
                transform: scale(1.15);
            }

        }

        .cheat-sheet-header {
            font-family: bungee;
            font-size: calc(11px + 0.75vw);
            line-height: calc(14px + 0.75vw);
            padding: 5px;
            -webkit-appearance: none;
            -moz-text-align-last: center;
            text-align-last: center;
            cursor: pointer;
            background-color: transparent;
            outline: none;
            border: none;
            user-select: none;
            box-sizing: border-box;
            color: turquoise;
        }

        .cheat-sheet-content {
            box-sizing: border-box;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            width: 100%;
            padding: 5px;
            background-color: rgba(52, 52, 105, 0.91);
            height: 300px;
            max-height: 300px;
            overflow-y: auto;

            .cheat-sheet-question-container {
                display: grid;
                grid-template-columns: 7.5% 68% 10% 10%;
                grid-column-gap: 5px;
                width: 100%;
                margin: 0.5vh 0;

                .question-counter {
                    display: flex;
                    align-items: center;
                    font-size: calc(10px + 0.35vw);
                    font-family: 'Source Sans Pro', sans-serif;
                    overflow: hidden;
                }

                .cheat-sheet-question-text {
                    display: flex;
                    align-items: center;
                    font-family: 'Source Sans Pro', sans-serif;
                    width: 100%;
                    text-align: left;
                    font-size: calc(10px + 0.35vw);
                }

                .cheat-sheet-answer-is-solution {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1px;
                    box-sizing: border-box;

                    img {
                        max-width: 18px;
                        height: auto;
                    }
                }

                .cheat-sheet-answer {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    padding: 1px;
                    box-sizing: border-box;

                    img {
                        max-width: 25px;
                        height: auto;
                    }
                }

            }

        }
    }

    @media only screen and (max-aspect-ratio: 1/1) {
        .cheat-sheet-wrapper {
            width: 100%;
            z-index: 999999;
            background-color: #17141f;
            border: none;
            border-radius: 0px;
            bottom: -233px;

            &.close {
                animation: slideDown 0.35s ease-in-out;
                left: unset;
                @keyframes slideDown {
                    from {
                        bottom: 0;
                    }
                    to {
                        bottom: -233px;
                    }
                }
            }

            &.open {
                animation: slideOpen 0.35s ease-in-out;
                bottom: 0;
                left: unset;
                @keyframes slideOpen {
                    from {
                        bottom: -233px;
                    }
                    to {
                        bottom: 0;
                    }
                }
            }

            .cheat-sheet-header {
                font-size: calc(9px + 2.75vw);
            }

            .cheat-sheet-content {
                height: 200px;
                max-height: 200px;
            }
        }

    }

</style>
