<template>
    <div class="app-content">
        <general-input class="heading1"
                       v-bind:text="room?.roomSettings.title"
                       v-bind:isDisabled="!isLocalUserModerator()"
                       v-bind:placeholder="'Name des Raums'"
                       v-on:onTextInputChange="changeRoomTitle($event)"></general-input>
        <general-input class="heading2"
                       v-bind:text="room?.currentEstimation.title"
                       v-bind:isDisabled="!isLocalUserModerator()"
                       v-bind:placeholder="'Name der Schätzung'"
                       v-on:onTextInputChange="updateEstimationName($event)"></general-input>

        <div class="room-status-container">
            <voting-information></voting-information>
        </div>
        <user-list></user-list>
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
                <button v-if="isLocalUserModerator()"
                        :disabled="room?.currentEstimation.state !== VOTING_STATE.VOTING || room?.currentEstimation.votes.length === 0"
                        class="button-activate" v-on:click="triggerRevealVotes()"><img
                        src="../assets/reveal.svg"><span>Aufdecken</span></button>
                <button v-if="isLocalUserModerator()"
                        :disabled="room?.currentEstimation.state !== VOTING_STATE.REVEALED"
                        class="button-activate" v-on:click="triggerResetVotes()"><img
                        src="../assets/repeat.svg"><span>Zurücksetzen</span></button>
                <button v-if="isLocalUserModerator()"
                        :disabled="room?.currentEstimation.state !== VOTING_STATE.REVEALED"
                        class="button-activate"
                        v-on:click="triggerNextEstimation()"><img
                        src="../assets/estimationicon.svg"><span>Neue Schätzung</span></button>
                <button class="button-activate" v-on:click="openRoomSettings()"><img style="width:30px;"
                                                                                     src="../assets/gear.svg"> Settings
                </button>
            </div>
        </div>
        <estimation-history v-if="estimationHistory.length"></estimation-history>
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
import GeneralInput from "@/components/general-input.vue";


export default {
    name: "App-Content",
    components: {
        GeneralInput,
        EstimationHistory,
        VotingInformation,
        VoteCard,
        UserList,
        Evaluation,
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
            return this.localUser?.roles.includes(Roles.PLAYER);
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
  padding-top: 15px;
  max-width: 1280px;
  box-sizing: border-box;
  height: calc(100vh - 60px - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;


  .action-area {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 25px;

    .vote-cards {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding: 15px;
      gap: 20px 20px;
      box-sizing: border-box;
      height: min-content;
    }

    .moderator-actions {
      display: flex;
      justify-content: center !important;
      gap: 20px;
      box-sizing: border-box;
      width: 100%;
      flex-wrap: wrap;
      padding: 15px;
    }
  }

  .large-screen {
    margin-top: 25px;
  }


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


@media only screen and (max-width: 775px) {

  .button-activate {
    padding: 5px 10px;
    font-size: 13px;
    letter-spacing: normal;
    line-height: 1.3;
    height: min-content;

    img {
      height: 20px;
      width: auto;
    }
  }

  .moderator-actions {
    justify-content: center !important;
  }
}


</style>
