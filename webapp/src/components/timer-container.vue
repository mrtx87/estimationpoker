<template>
    <div class="timer-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="66.769" height="72.81" viewBox="0 0 66.769 72.81">
            <g id="clock" transform="translate(-1493.656 -183.783)">
                <g id="Ellipse_21" data-name="Ellipse 21" transform="translate(1496.396 187.593)" fill="none"
                   stroke="#fff" stroke-width="6">
                    <ellipse cx="31" cy="31.5" rx="31" ry="31.5" stroke="none"/>
                    <ellipse cx="31" cy="31.5" rx="28" ry="28.5" fill="none"/>
                </g>
                <g id="Ellipse_22" data-name="Ellipse 22" transform="translate(1521.396 213.593)" fill="none"
                   stroke="#fff" stroke-width="4">
                    <circle cx="6" cy="6" r="6" stroke="none"/>
                    <circle cx="6" cy="6" r="4" fill="none"/>
                </g>
                <line id="Line_1" data-name="Line 1" y2="12.381" transform="translate(1527.385 201.712)" fill="none"
                      stroke="#fff" stroke-linecap="round" stroke-width="4"/>
                <line id="Line_2" data-name="Line 2" x2="11.254" y2="11.254" transform="translate(1530.137 222.719)"
                      fill="none" stroke="#fff" stroke-linecap="round" stroke-width="4"/>
                <path id="Path_34" data-name="Path 34" d="M-1.062,13.714S-8.839,7.436-.111-1.291s14.054,0,14.054,0"
                      transform="translate(1500.438 191.5)" fill="none" stroke="#fff" stroke-linecap="round"
                      stroke-width="5"/>
                <path id="Path_35" data-name="Path 35" d="M10.752,13.714S18.529,7.436,9.8-1.291s-14.054,0-14.054,0"
                      transform="translate(1543.953 191.5)" fill="none" stroke="#fff" stroke-linecap="round"
                      stroke-width="5"/>
                <path id="Path_36" data-name="Path 36" d="M8.179,0S-.867,6.372.068,7.268s10.85-3.016,10.85-3.016"
                      transform="translate(1503.447 248.232) rotate(-30)" fill="none" stroke="#fff" stroke-width="3"/>
                <path id="Path_37" data-name="Path 37" d="M8.179,7.4S-.867,1.029.068.133,10.918,3.15,10.918,3.15"
                      transform="translate(1547.414 254.642) rotate(-150)" fill="none" stroke="#fff" stroke-width="3"/>
            </g>
        </svg>
        <span>{{remainingTimeString}}</span>
    </div>
</template>

<script>
    export default {
        name: 'TimerContainer',
        props: ['timer', 'format'],
        watch: {
            timer: function (timer, oldtimer) {
                this.externalUpdate(timer);
            }
        },
        beforeMount: function () {
            this.externalUpdate(this.timer);
        },
        beforeUnmount: function () {
            this.remainingTime = 0;
            clearTimeout(this.timeoutId)
        },
        data() {
            return {
                innerStartTime: 0,
                startTime:  0,
                endTime: 0,
                currentTime: 0,
                remainingTime: 0,
                remainingTimeString: '',
                lastTimeUpdate: 0
            }
        },
        methods: {
            externalUpdate: function (timer) {
                this.initRemainingTime(timer);
                this.tick();
            },
            tick: function () {
                window.requestAnimationFrame(function () {
                    this.updateRemainingTime();
                    if (this.currentTime < this.endTime) {
                        this.tick();
                    } else {
                        //TODO CALLBACK
                    }
                }.bind(this));
            },
            toTimeString: function (millis) {
                millis = Math.max(0, millis);
                if (this.format === 'seconds-plain') {
                    return `${Math.floor(millis / 1000)}`;
                }

                if (this.format === 'seconds-unit') {
                    return `${Math.floor(millis / 1000)} sec`;
                }

                if (this.format === 'min:sec') {
                    const minutes = Math.floor(millis / 60000);
                    const seconds = ((millis % 60000) / 1000).toFixed(0);
                    return (
                        seconds == 60 ?
                            (minutes + 1) + ":00" :
                            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
                    );
                }
                return millis;
            },
            updateRemainingTime: function () {
                const currentTimeDiff = Date.now() - this.innerStartTime;
                this.currentTime = this.startTime + currentTimeDiff;
                this.remainingTime = this.endTime - this.currentTime;
                this.remainingTimeString = this.toTimeString(this.remainingTime);
            },
            initRemainingTime: function (timer) {
                this.innerStartTime = Date.now();
                this.startTime = timer.updateTimestamp;
                this.endTime = timer.ttl;
                this.currentTime = this.startTime;
                this.remainingTime = this.endTime - this.currentTime;
                this.remainingTimeString = this.toTimeString(this.remainingTime);
            }
        }
    }
</script>

<style scoped="true">

    .timer-wrapper {
        display: flex;
        justify-content: center;
        user-select: none;
    }

    .timer-wrapper.plain-timer {
        display: block !important;
    }

    .timer-wrapper.plain-timer svg {
        display: none;
    }

    span {
        white-space: nowrap;
        margin-left: 5px;
        box-sizing: border-box;
        user-select: none;
        display: flex;
        align-items: center;
    }

    svg {
        margin-right: 0.3vw;
        width: min(max(15px, 3vw),25px);
        height: auto;
    }
</style>
