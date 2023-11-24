<template>
    <div class="game-over-wrapper">
        <div class="game-round-counter">Game {{currentGameOverResult.gameId}}</div>
        <div class="confetti">
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
            <div class="confetti-piece"></div>
        </div>
        <div class="game-over-title">
      <span class="game-over-front">
          Game Over
        </span>
            <span class="game-over-middle">
          Game Over
        </span>
            <span class="game-over-back">
          Game Over
        </span>
        </div>

        <div class="rank-header">
            Ranking
        </div>
        <div class="game-over-content">
            <div class="pedestal-container">
                <span class="game-over-players-title">Winners</span>
                <div class="avatar-wrapper">
                    <div class="avatar-step-column">
                        <div v-if="!place2" class="top3-avatar "></div>
                        <term-assigment-avatar v-if="place2"
                                               v-bind:termAssignmentPlayer="place2"
                                               v-bind:winningPosition="place2?.rank"
                                               :class="{'is-local-player': place2?.id === localPlayerId}"
                                               class="top3-avatar"
                        ></term-assigment-avatar>
                        <div class="place-step place-2-step">
                            {{place2 ? place2.rank : 2}}
                        </div>
                    </div>
                    <div class="avatar-step-column">
                        <div v-if="!place1" class="top3-avatar "></div>
                        <term-assigment-avatar v-if="place1"
                                               v-bind:termAssignmentPlayer="place1"
                                               v-bind:winningPosition="place1?.rank"
                                               :class="{'is-local-player': place1?.id === localPlayerId}"
                                               class="top3-avatar"
                        ></term-assigment-avatar>
                        <div class="place-step place-1-step">
                            {{place1 ? place1.rank : 1}}
                        </div>
                    </div>
                    <div class="avatar-step-column">
                        <div v-if="!place3" class="top3-avatar "></div>
                        <term-assigment-avatar v-if="place3"
                                               v-bind:termAssignmentPlayer="place3"
                                               v-bind:winningPosition="place3?.rank"
                                               :class="{'is-local-player': place3?.id === localPlayerId}"
                                               class="top3-avatar"
                        ></term-assigment-avatar>
                        <div class="place-step place-3-step">
                            {{place3 ? place3.rank : 3}}
                        </div>
                    </div>

                </div>
            </div>
            <div class="bottom-players-container" v-if="playerRanking?.length > 0">
                <span class="game-over-players-title">Other Players</span>
                <div class="bottom-players-content">
                    <term-assigment-avatar v-for="bpl in playerRanking"
                                           :key="bpl.id"
                                           v-bind:termAssignmentPlayer="bpl"
                                           v-bind:winningPosition="bpl?.rank"
                                           class="bottom-player"
                    ></term-assigment-avatar>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import TermAssigmentAvatar from "@/components/term-assignment-avatar";
    import {RequestMessageType} from "@/constants/vue-constants";


    export default {
        name: 'GameOverSection',
        components: {TermAssigmentAvatar},
        props: ['currentGameOverResult'],
        methods: {},
        computed: {
            gameOverResult: function () {
                return this.currentGameOverResult;
            },
            localPlayerId: function () {
                return this.$store.state.playerId;
            },
            top3: function () {
                return this.gameOverResult?.top3;
            },
            bottomPlayers: function () {
                return this.gameOverResult?.bottomPlayers;
            },
            disconnectedPlayers: function () {
                return this.gameOverResult?.disconnectedPlayers;
            },
            playerRanking: function () {
                return this.bottomPlayers;
            },
            place1: function () {
                return (this.top3 && this.top3?.length > 0) ? this.top3[0] : null;
            },
            place2: function () {
                return (this.top3 && this.top3?.length > 1) ? this.top3[1] : null;
            },
            place3: function () {
                return (this.top3 && this.top3?.length > 2) ? this.top3[2] : null;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .game-over-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        overflow-y: hidden;
        overflow-x: hidden;
        padding: 1vw;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .game-round-counter {
            font-size: calc(17px + 0.8vw);
            line-height: calc(22px + 0.8vw);
            text-shadow: 1px 1px 1px black;
        }

        @function randomNum($min, $max) {
            $randomNum: $min + floor(random() * (($max - $min) + 1));
            @return $randomNum;
        }

        .confetti {
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 0px;
            width: 100%;
            height: 50vh;
            overflow: hidden;
            z-index: 00;
        }

        .confetti-piece {
            position: absolute;
            width: 8px;
            height: 16px;
            background: #ffd300;
            top: 0;
            opacity: 0;

            @for $i from 1 through 13 {
                &:nth-child(#{$i}) {
                    left: $i * 7%;
                    transform: rotate(#{randomNum(-80, 80)}deg);
                    animation: makeItRain 1000 * 1ms infinite ease-out;
                    animation-delay: #{randomNum(0, 1000 * .1)}ms;
                    animation-duration: #{randomNum(1000 * .7, 1000 * 1.2)}ms
                }
            }

            &:nth-child(odd) {
                background: #17d3ff;
            }

            &:nth-child(even) {
                z-index: 1;
            }

            &:nth-child(4n) {
                width: 5px;
                height: 12px;
                animation-duration: 1000 * 2ms;
            }

            &:nth-child(3n) {
                width: 3px;
                height: 10px;
                animation-duration: 1000 * 2.5ms;
                animation-delay: 1000 * 1ms;
            }

            &:nth-child(4n-7) {
                background: #ff4e91;
            }
        }

        @keyframes makeItRain {
            from {
                opacity: 1;
            }

            50% {
                opacity: 1;
            }

            to {
                transform: translateY(600px);
            }
        }


        .game-over-title {
            position: relative;
            display: flex;
            margin-bottom: 10px;


            .game-over-front {
                font-size: calc(20px + 4vw);
                line-height: calc(35px + 4vw);
                color: white;
                z-index: 5002;
                animation: LightsOut 1.5s infinite;
                animation-delay: 1.2s;
            }

            .game-over-middle {
                position: absolute;
                left: 4px;
                top: 4px;
                font-size: calc(19px + 4vw);
                line-height: calc(26px + 4vw);
                color: #f5955a;
                z-index: 5001;
                animation: LightsOut 1.5s infinite;
                animation-delay: 0.8s;
            }

            .game-over-back {
                position: absolute;
                left: 8px;
                top: 8px;
                position: absolute;
                font-size: calc(18px + 4vw);
                line-height: calc(25px + 4vw);
                color: #ec7171;
                z-index: 5000;
                animation: LightsOut 1.5s infinite;
                animation-delay: 0.4s;
            }
        }

        .game-over-players-title {
            text-align: center;
            margin-bottom: 10px;
            font-size: min(max(10px, 1vw), 20px);
            width: 100%;
        }

        .rank-header {
            padding: 10px;
            color: var(--highlight-color);
            text-shadow: 1px 1px 2px black;
            font-size: calc(18px + 2vw);
            line-height: calc(23px + 2vw);
            text-align: center;
        }

        .game-over-content {
            justify-content: center;
            height: min-content;
            z-index: 50;
            width: 100%;
            gap: 2%;

            display: flex;
            box-sizing: border-box;

            @media only screen and (max-width: 800px) {
                display: flex;
                flex-direction: column;
            }

            .bottom-players-container {
                display: flex;
                flex-direction: column;
            }

            .bottom-players-content {
                display: flex;
                flex-wrap: wrap;
                width: auto;
                max-height: 100%;
                overflow: auto;
                animation: bottomPlayersFadeIn 1s ease-in-out;
                min-height: 400px;
                min-width: 48vw;

                @media only screen and (max-width: 1200px) {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    border: none;
                    max-height: 33vh;
                    background-color: transparent;
                    box-shadow: unset;
                    width: unset;
                    margin: 25px 0;
                }

                .bottom-player {
                    width: 8.5vw;
                    height: 8.5vw;
                    min-width: 95px;
                    min-height: 95px;
                    max-width: 150px;
                    max-height: 150px;
                    margin: 1vw 0.5vw;
                }

            }
        }
    }

    @keyframes bottomPlayersFadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes LightsOut {

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

    .pedestal-container {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: center;

        .avatar-wrapper {
            display: grid;
            grid-template-columns: min-content min-content min-content;

            .avatar-step-column {

                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;

                .top3-avatar {
                    width: 10vw;
                    height: 10vw;

                    max-width: 200px;
                    max-height: 200px;
                    min-width: 100px;
                    min-height: 100px;
                    margin: 1vw;
                }

                .place-2-step {
                    border-radius: 10px 0 0 0;
                    animation: pedestal-growing-animation 4.5s;
                    height: 7vh;
                }

                .place-1-step {
                    height: 10vh;
                    border-radius: 10px 10px 0 0;
                    animation: pedestal-growing-animation 3.5s;
                }

                .place-3-step {
                    height: 5vh;
                    border-radius: 0 10px 0 0;
                    animation: pedestal-growing-animation 5.5s;
                }

                .place-step {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #dac371;
                    font-size: calc(18px + 1vw);
                    overflow: hidden;
                    box-shadow: 3px -2px 0px 2px #d29c56;
                    width: 15vw;
                    min-width: 115px;
                }


            }


        }

        @keyframes pedestal-growing-animation {

            0% {
                max-height: 0%;

                box-shadow: none;
            }
            20% {
                max-height: 0%;
                box-shadow: none;
            }
            30% {
                box-shadow: 3px -2px 0px 2px #b58028;
            }
            100% {
                max-height: 100%;
            }
        }
    }

</style>
