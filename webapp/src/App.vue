<template>
    <div class="app-wrapper">
        <overlay v-if="appStore.overlayId > DISPLAY_OVERLAY_STATE.NO_OVERLAY"></overlay>
        <HeaderVue></HeaderVue>
        <div class="app-content">
            <div class="left-content">
                <button v-on:click="openRoomSettings()">RS</button>
                <input :disabled="!isLocalUserModerator()" :value="room?.roomSettings.title"
                       v-on:change="changeRoomTitle($event.target.value)" class="room-title-container">
                <input :disabled="!isLocalUserModerator()" :value="room?.currentEstimation.title"
                       v-on:change="updateEstimationName($event.target.value)" class="estimation-title-container">
                <voting-information></voting-information>
                <div class="action-area">
                    <div class="vote-cards" v-if="room?.currentEstimation.state === 1">
                        <VoteCard v-for="value in room?.currentEstimation.valueOptions.values" :key="value"
                                  v-bind:value="value">
                            {{ value }}
                        </VoteCard>
                    </div>

                    <Evaluation v-bind:estimation="room?.currentEstimation"
                                v-if="room?.currentEstimation.state !== 1"></Evaluation>
                </div>
                <estimation-history></estimation-history>
            </div>
            <div class="right-content">
                <div class="moderator-actions" v-if="isLocalUserModerator()">
                    <button v-on:click="triggerRevealVotes()">Aufdecken</button>
                    <button v-on:click="triggerResetVotes()">Zurücksetzen</button>
                    <button v-on:click="triggerNextEstimation()">Neue Schätzung</button>
                </div>
                <user-list></user-list>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import {
    DISPLAY_OVERLAY_STATE, RequestMessageType, Roles, VALUE_TYPE_OPTIONS,
} from "@/constants/vue-constants";
import {useAppStateStore} from "@/stores/app-state";
import HeaderVue from "@/components/header-vue.vue";
import Overlay from "@/components/overlay.vue";
import {restService} from "@/services/rest-service";
import Footer from "@/components/footer.vue";
import UserList from "@/components/user-list.vue";
import Evaluation from "@/components/evaluation.vue";
import VoteCard from "@/components/vote-card.vue";
import VotingInformation from "@/components/voting-information.vue";
import EstimationHistory from "@/components/estimation-history.vue";
import {Logger} from "@/services/util";


export default {
    name: "App",
    components: {
        EstimationHistory,
        VotingInformation,
        VoteCard,
        UserList,
        HeaderVue,
        Overlay,
        Footer,
        Evaluation
    },
    created() {
        this.appStore = useAppStateStore();
        restService.setAppState(this.appStore);
        this.$websocketService.registerStore(this.appStore);
        this.$websocketService.registerAppService(this.$appService);
        this.$appService.setStore(this.appStore);
        this.$appService.setWebsocketService(this.$websocketService);

        this.onRouteChange(this.$route)
        this.initUserRandom();
    },
    watch: {
        $route(to) {
            this.onRouteChange(to);
        }
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {
        openRoomSettings(){
          this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.ROOM_SETTINGS);
        },
        onRouteChange(routeTo) {
            Logger.log(`routechange: ${routeTo.path}`);
            this.$appService.setRouteOn(routeTo);
            this.$appService.initApp();
        },
        initUserRandom() {
            this.appStore.addAvatar(this.$appService.getRandomAvatar());
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
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        },
        room() {
            return this.appStore.room;
        },
        valueTypeOptions() {
            return VALUE_TYPE_OPTIONS;
        },
        localUser() {
            return this.appStore.localUser;
        },
        isLocalUserParticipant() {
            return this.localUser?.roles.includes(Roles.PARTICIPANT);
        }
    }
};
</script>

<style lang="scss">
.app-wrapper {
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
}

.app-content {
  max-width: 1280px;
  background-color: grey;
  box-sizing: border-box;
  height: calc(100vh - 60px - 40px);
  width: 1280px;
  padding: 10px;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-gap: 10px;

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;


    .room-title-container, .estimation-title-container {
      height: fit-content;
      background-color: #9f92e4;
    }

    .action-area {
      height: 100%;
      background-color: #9f9254;
      box-sizing: border-box;

      .vote-cards {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 20px 20px;
        padding: 15px;
        box-sizing: border-box;
        height: min-content;
      }
    }

  }

  .right-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;

    .moderator-actions {
      display: grid;
      box-sizing: border-box;
      gap: 10px;
      grid-template-columns: calc(50% - 5px) calc(50% - 5px);
      height: 20%;
      padding: 10px;
      background-color: #9f9284;
      box-sizing: border-box;

    }

  }
}

</style>
