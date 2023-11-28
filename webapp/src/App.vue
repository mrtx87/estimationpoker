<template>
    <div class="app-wrapper">
        <overlay v-if="appStore.overlayId > DISPLAY_OVERLAY_STATE.NO_OVERLAY"></overlay>
        <HeaderVue></HeaderVue>
        <div class="app-content">
            <div class="left-content">
                <div class="room-title-container">
                    {{room?.roomSettings.title}}
                </div>
                <div class="estimation-title-container">
                    SCHÄTZUNG TITLE
                </div>
                <div class="action-area">
                    ACTION AREA
                </div>
                <div class="estimation-history">
                    SCHÄTZUNG HISTORY
                </div>
            </div>
            <div class="right-content">
                <div class="moderator-actions">
                    Moderator Actions
                </div>
                <div class="user-list">
                    <user-list></user-list>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import {
    DISPLAY_OVERLAY_STATE, VALUE_TYPE_OPTIONS,
} from "@/constants/vue-constants";
import {useAppStateStore} from "@/stores/app-state";
import HeaderVue from "@/components/header-vue.vue";
import Overlay from "@/components/overlay.vue";
import {restService} from "@/services/rest-service";
import Footer from "@/components/footer.vue";
import UserList from "@/components/user-list.vue";


export default {
    name: "App",
    components: {
        UserList,
        HeaderVue,
        Overlay,
        Footer
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
        onRouteChange(routeTo) {
            this.$appService.setRouteOn(routeTo);
            this.$appService.initApp();
        },
        initUserRandom() {
            this.appStore.addAvatar(this.$appService.getRandomAvatar());
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
  max-width: 1400px;
  background-color: grey;
 box-sizing: border-box;
  height: calc(100vh - 60px - 40px);
  width: 1400px;

  padding: 10px;

  display: grid;
  grid-template-columns: 80% 20%;
  grid-gap: 10px;

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .room-title-container, .estimation-title-container {
      height: fit-content;
      background-color: #9f92e4;
    }

    .action-area {
      height: 100%;
      background-color: #9f9254;

    }

    .estimation-history {
      height: 20%;
      background-color: #9f9214;

    }
  }

  .right-content {
    display: flex;
    flex-direction: column;
    gap: 10px;

      .moderator-actions {
          height: 20%;
          background-color: #9f9284;
      }

      .user-list {
          height: 100%;
          background-color: #9f9234;
      }
  }
}

</style>
