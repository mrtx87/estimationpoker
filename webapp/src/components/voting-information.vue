<template>
    <div class="voting-information-wrapper">
        <span class="fat" v-if="votingState === VOTING_STATE.VOTING">Schätzrunde läuft</span>
        <span v-if="votingState === VOTING_STATE.VOTING">Es haben {{ votes.length }} von {{ onlineParticipants.length }} aktiven Teilnehmern abgestimmt.</span>

        <span class="fat" v-if="votingState === VOTING_STATE.REVEALED">Auswertungsphase</span>
        <span v-if="votingState === VOTING_STATE.REVEALED">Durchschnittlicher Schätzwert ist {{ estimation.evaluation.avg }}.</span>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {Roles, VOTING_STATE} from "@/constants/vue-constants";

export default {
    name: "voting-information",
    components: {},
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
            return this.appStore.room ? this.appStore.room.currentEstimation.votes.filter(vote => this.appStore.room.connections.includes(vote.userId)) : [];
        },
        participants() {
            return this.appStore.users ? this.appStore.users.filter(u => u.roles.includes(Roles.PLAYER)) : [];
        },
        onlineParticipants() {
            return this.participants.filter(u => this.appStore.room.connections.includes(u.id));
        },
        votingState() {
            return this.appStore.room ? this.appStore.room.currentEstimation.state : 0;
        },
        estimation() {
            return this.appStore.room ? this.appStore.room.currentEstimation : null;
        }
    }
};
</script>

<style lang="scss">

.voting-information-wrapper {
  background-color: var(--primary-color);
  width: 100%;
  height: 90px;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: flex;
  flex-direction: column;

  .fat {
    font-weight: bold;
    font-style: italic;
  }
}

</style>
