<template>
    <div class="app-content">
        <div class="room-header">
            <div class="title-container">
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
            </div>
            <voting-information></voting-information>
            <timer class="estimation-timer" v-bind:timer="estimationTimer"></timer>
        </div>


        <user-list></user-list>
        <Evaluation v-bind:estimation="room?.currentEstimation"
                    v-if="room?.currentEstimation.state !== VOTING_STATE.VOTING"></Evaluation>
        <div class="action-area">
            <div class="vote-cards">
                <VoteCard v-for="value in displayedVoteOptions"
                          v-bind:disabled="room?.currentEstimation.state !== VOTING_STATE.VOTING"
                          v-bind:isSelected="isLocalSelected(value)"
                          :key="value" class="vote-size"
                          v-bind:value="value">
                    {{ value }}
                </VoteCard>
            </div>
            <div class="actions">
                <div class="moderator-actions" v-if="isLocalUserModerator()">
                    <button :disabled="room?.currentEstimation.state !== VOTING_STATE.VOTING || room?.currentEstimation.votes.length === 0"
                            class="button-activate" v-on:click="triggerRevealVotes()"><img
                            src="../assets/reveal.svg"><span>{{ tl8('app.content.btn.reveal') }}</span></button>
                    <button :disabled="room?.currentEstimation.state !== VOTING_STATE.REVEALED"
                            class="button-activate" v-on:click="triggerResetVotes()"><img
                            src="../assets/repeat.svg"><span>{{ tl8('app.content.btn.reset') }}</span></button>
                    <button :disabled="room?.currentEstimation.state !== VOTING_STATE.REVEALED"
                            class="button-activate"
                            v-on:click="triggerNextEstimation()"><img
                            src="../assets/estimationicon.svg"><span>{{ tl8('app.content.btn.new.estimation') }}</span>
                    </button>
                </div>

                <div class="all-users-buttons">
                    <button class="button-activate" v-on:click="openRoomSettings()"><img style="width:30px;"
                                                                                         src="../assets/gear.svg">
                        {{ tl8('app.content.btn.settings') }}
                    </button>
                    <button class="button-activate" v-if="appStore.isOnRoomRoute" v-on:click="shareLink()"><img
                            style="width:30px;" src="../assets/sharelink.svg"> invite link
                    </button>
                </div>

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
import Timer from "@/components/timer.vue";
import {languageService} from "@/services/language";


export default {
    name: "App-Content",
    components: {
        Timer,
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
        tl8(key) {
            return languageService.t(key, this.appStore.langKey);
        },
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
        },
        isLocalSelected(value) {
            return this.localVoteValue?.label === value.label;
        },
        shareLink() {
            navigator.clipboard.writeText(window.location.href).then(() => this.appStore.toast.info('In Zwischenablage kopiert'));
        },
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
        },
        estimationTimer() {
            return this.appStore.room ? this.appStore.room.currentEstimation.timer : null;
        },
        localVoteValue() {
            return this.appStore.localVoteValue;
        },
    }
};
</script>

<style lang="scss" scoped>

.app-content {
  padding-top: 15px;
  max-width: 1280px;
  box-sizing: border-box;
  //height: calc(100vh - 60px - 40px);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px;

  .room-header {
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 35% 30% 35%;
    box-sizing: border-box;
    max-width: 1280px;
    width: 100%;

    .title-container {
      display: flex;
      flex-direction: column;
    }

    .estimation-timer {
      font-size: max(20px, min(1.7vw, 28px));
      justify-self: center;
    }
  }


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
      gap: 15px;
      box-sizing: border-box;
      height: min-content;
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      .moderator-actions {
        display: flex;
        justify-content: center !important;
        gap: 20px;
        box-sizing: border-box;
        padding: 15px;
      }

      .all-users-buttons {
        display: flex;
        gap: 20px;
        width: 30%;
      }
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
}


</style>
