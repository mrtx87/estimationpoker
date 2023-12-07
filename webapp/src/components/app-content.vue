<template>
    <div class="app-content">
        <div class="left-content">
            <input class="general-input heading1" :disabled="!isLocalUserModerator()" placeholder="Name des Raums"
                   :value="room?.roomSettings.title"
                   v-on:change="changeRoomTitle($event.target.value)">
            <input class="general-input heading2" :disabled="!isLocalUserModerator()"
                   placeholder="Name der Schätzung"
                   :value="room?.currentEstimation.title"
                   v-on:change="updateEstimationName($event.target.value)">

            <div class="action-area">
                <div class="vote-cards" v-if="room?.currentEstimation.state === VOTING_STATE.VOTING">
                    <VoteCard v-for="value in displayedVoteOptions" :key="value" class="vote-size"
                              v-bind:value="value">
                        {{ value }}
                    </VoteCard>
                </div>

                <Evaluation v-bind:estimation="room?.currentEstimation"
                            v-if="room?.currentEstimation.state !== VOTING_STATE.VOTING"></Evaluation>
                <div class="moderator-actions">
                    <button v-if="isLocalUserModerator()" :disabled="room?.currentEstimation.state !== VOTING_STATE.VOTING || room?.currentEstimation.votes.length === 0"
                            class="button-activate" v-on:click="triggerRevealVotes()"><img
                            src="../assets/reveal.svg"><span>Aufdecken</span></button>
                    <button v-if="isLocalUserModerator()" :disabled="room?.currentEstimation.state !== VOTING_STATE.REVEALED"
                            class="button-activate" v-on:click="triggerResetVotes()"><img
                            src="../assets/repeat.svg"><span>Zurücksetzen</span></button>
                    <button v-if="isLocalUserModerator()" :disabled="room?.currentEstimation.state !== VOTING_STATE.REVEALED" class="button-activate"
                            v-on:click="triggerNextEstimation()"><img
                            src="../assets/estimationicon.svg"><span>Neue Schätzung</span></button>
                    <button class="button-activate" v-on:click="openRoomSettings()"><img style="width:30px;"
                                                                                         src="../assets/gear.svg"> Settings
                    </button>
                </div>
            </div>
            <estimation-history v-if="estimationHistory.length" class="large-screen"></estimation-history>
        </div>
        <div class="right-content">
            <div class="room-status-container">
                <voting-information></voting-information>
            </div>
            <user-list></user-list>
        </div>
        <estimation-history v-if="estimationHistory.length" class="small-screen"></estimation-history>
    </div>
</template>

<script>
import {
    DISPLAY_OVERLAY_STATE, RequestMessageType, Roles, VALUE_TYPE_OPTIONS, VOTING_STATE,
} from "@/constants/vue-constants";
import {useAppStateStore} from "@/stores/app-state";
import UserList from "@/components/user-list.vue";
import Evaluation from "@/components/evaluation.vue";
import VoteCard from "@/components/vote-card.vue";
import VotingInformation from "@/components/voting-information.vue";
import EstimationHistory from "@/components/estimation-history.vue";


export default {
    name: "App-Content",
    components: {
        EstimationHistory,
        VotingInformation,
        VoteCard,
        UserList,
        Evaluation
    },
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {
        openRoomSettings() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.ROOM_SETTINGS);
        },
        onRouteChange(routeTo) {
            this.$appService.setRouteOn(routeTo);
            this.$appService.initApp();
        },
        triggerRevealVotes() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.REVEAL_VOTES);
        },
        triggerResetVotes() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.RESET_VOTES);
        },
        triggerNextEstimation() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.NEXT_ESTIMATION);
        },
        updateEstimationName(value) {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ESTIMATION_TITLE, {
                estimationId: this.room.currentEstimation.id,
                title: value
            })
        },
        changeRoomTitle(value) {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROOM_SETTINGS, {
                ...this.room.roomSettings,
                title: value
            })
        },
        isLocalUserModerator() {
            return this.localUser?.roles.includes(Roles.MODERATOR);
        }
    },
    computed: {
        VOTING_STATE() {
            return VOTING_STATE
        },
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        },
        room() {
            return this.appStore.room;
        },
        localUser() {
            return this.appStore.localUser;
        },
        isLocalUserParticipant() {
            return this.localUser?.roles.includes(Roles.PARTICIPANT);
        },
        estimationHistory() {
            return this.appStore.sortedEstimationHistory;
        },
        displayedVoteOptions() {
            return this.room ? VALUE_TYPE_OPTIONS.find(vto => vto.id === this.room.currentEstimation.valueOptionsId).values : [];
        }
    }
};
</script>

<style lang="scss" scoped>

.app-content {
  padding-top: 20px;
  max-width: 1280px;
  box-sizing: border-box;
  height: calc(100vh - 60px - 40px);
  width: 1280px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    width: 100%;
    max-width: 750px;

    .action-area {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 25px;

      .vote-cards {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 20px 20px;
        box-sizing: border-box;
        height: min-content;
      }

      .moderator-actions {
        display: flex;
        justify-content: flex-end;
        gap: 1.25vw;
        box-sizing: border-box;
        width: 100%;
      }
    }

    .large-screen {
      margin-top: 25px;
    }
  }

  .right-content {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    color: black;
    border-radius: 4px;
    height: min-content;
    background-color: white;
    width: 100%;
    max-width: 350px;

    .room-status-container {
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
    }
  }

  .small-screen {
    display: none;
  }
}

.heading1 {
  font-size: 1.8rem;
  margin-bottom: 0.25vh;
}

.heading2 {
  font-size: 1.3rem;
  margin-bottom: 0.25vh;
  text-align: center;
}

.general-input {
  color: rgb(36, 35, 42);
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 4px 8px;
  transition: all 0.1s ease 0s;

  &:focus {
    #border: 1px solid transparent;
    #box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    background: rgb(251, 251, 251);
    border-radius: 4px;
    border: none;
    appearance: none;
    outline: 1px solid #d7d7d7;
    text-align: left !important;

  }
}

@media only screen and (max-width: 1280px) {
  .app-content {
    width: unset !important;
  }

  .right-content, .left-content {
    width: 90% !important;
    max-width: unset !important;
  }

  .large-screen {
    display: none !important;
  }

  .small-screen {
    display: flex !important;
    width: 90%;
  }
}


</style>
