<template>
    <div class="timer-wrapper">
        {{ formattedTime }}
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {ESTIMATION_TIMER_STATE, RequestMessageType, Roles, VOTING_STATE} from "@/constants/vue-constants";
import {formatTime} from "@/services/util";

export default {
    name: "Timer",
    props: ['timer'], // {startTime: 1000, state: 1 = running, = Stopped, passedTime: 0}
    created() {
        this.appStore = useAppStateStore();
    },
    watch: {
        timer(nextTimer, previousTimer) {
            if (!nextTimer) {
                return;
            }
            if (nextTimer.state === ESTIMATION_TIMER_STATE.RUNNING) {
                this.startTimer();
                return;
            }
            this.stopTimer();
        }
    },
    data: function () {
        return {
            appStore: null,
            formattedTime: null,
            intervalId: null
        }
    },
    methods: {
        startTimer() {
            if (this.intervalId) {
                this.stopTimer();
            }

            this.updateTimer();
            this.intervalId = setInterval(this.updateTimer.bind(this), 500);
        },
        stopTimer() {
            if (!this.timer) {
                return;
            }
            this.formattedTime = formatTime(this.timer.passedTime);
            clearInterval(this.intervalId)
        },
        updateTimer() {
            if (!this.timer) {
                return;
            }
            let elapsedTime = Date.now() - this.timer.startTime;
            elapsedTime += this.timer.passedTime;
            this.formattedTime = formatTime(elapsedTime);
        }
    },
    computed: {}
};
</script>

<style lang="scss">

.timer-wrapper {

}

</style>
