<template>
    <div class="app-wrapper">
        <overlay v-if="appStore.overlayId > DISPLAY_OVERLAY_STATE.NO_OVERLAY"></overlay>
        <HeaderVue></HeaderVue>
        <app-content v-if="isOnRoomRoute"></app-content>
        <room-history v-else></room-history>
        <Footer></Footer>
    </div>
</template>

<script>
import {
    DISPLAY_OVERLAY_STATE
} from "@/constants/vue-constants";
import {useAppStateStore} from "@/stores/app-state";
import HeaderVue from "@/components/header-vue.vue";
import Overlay from "@/components/overlay.vue";
import {restService} from "@/services/rest-service";
import Footer from "@/components/footer.vue";
import {useToast} from "vue-toastification";
import AppContent from "@/components/app-content.vue";
import RoomHistory from "@/components/room-history.vue";


export default {
    name: "App",
    components: {
        RoomHistory,
        AppContent,
        HeaderVue,
        Overlay,
        Footer,
    },
    created() {
        this.appStore = useAppStateStore();
        restService.setAppState(this.appStore);
        this.$websocketService.registerStore(this.appStore);
        this.$websocketService.registerAppService(this.$appService);
        this.$appService.setStore(this.appStore);
        this.$appService.setWebsocketService(this.$websocketService);

        this.onRouteChange(this.$route)
        const toast = useToast();
        this.appStore.addToastImpl(toast);
        this.getDimensions();

    },
    mounted() {
        window.addEventListener('resize', this.getDimensions, { passive: true });
    },
    unmounted() {
        window.removeEventListener('resize', this.getDimensions);
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
        getDimensions() {
            this.appStore.setScreenDimensions({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            });
        }
    },
    computed: {
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        },
        isOnRoomRoute() {
            return this.appStore.isOnRoomRoute;
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
  background-color: #f5f5f5;
}

</style>
