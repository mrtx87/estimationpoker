<template>
    <div class="voting-information-wrapper">
        <span v-if="votingState === VOTING_STATE.VOTING">Schätzrunde läuft</span>
        <span v-if="votingState === VOTING_STATE.CLOSED">Schätzrunde beendet</span>
        <span v-if="votingState === VOTING_STATE.REVEALED">Auswertung der Schätzung</span>
        <span>Es haben {{ votes.length }} von {{ participants.length }} abgestimmt.</span>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {Roles, VOTING_STATE} from "@/constants/vue-constants";

export default {
    name: "voting-information",
    components: {},
    props: ['estimation'],
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {},
    computed: {
        VOTING_STATE() {
            return VOTING_STATE
        },
        votes() {
            return this.appStore.room ? this.appStore.room.currentEstimation.votes : [];
        },
        participants() {
            return this.appStore.users ? this.appStore.users.filter(u => u.roles.includes(Roles.PARTICIPANT)) : [];
        },
        votingState() {
            return this.appStore.room ? this.appStore.room.currentEstimation.state : 0;
        }
    }
};
</script>

<style lang="scss">

.voting-information-wrapper {
  display: flex;
  flex-direction: column;
}

</style>
