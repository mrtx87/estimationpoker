<template>
    <div class="app-wrapper">
        <HeaderVue></HeaderVue>
        <overlay v-if="appState.overlayId !== DISPLAY_OVERLAY_STATE.NO_OVERLAY"></overlay>
        <Footer></Footer>
    </div>
</template>

<script>
import {
    getCookie,
    getRandomAvatar,
} from "@/services/cookie-service";
import {GlobalPlayerCookie} from "./model/global-player-cookie.model";
import * as avatars from "@/assets/avatar/avatar-constants.ts";
import {
    DISPLAY_OVERLAY_STATE,
    GLOBAL_PLAYER_COOKIE_KEY,
    PRIVACY_POLICY_COOKIE_KEY,
    ROOM_ROUTE
} from "@/constants/vue-constants";
import {useAppStateStore} from "@/stores/app-state";
import HeaderVue from "@/components/header-vue.vue";
import Overlay from "@/components/overlay.vue";
import {restService} from "@/services/rest-service";
import Footer from "@/components/footer.vue";
import {router} from "@/main";


export default {
    name: "App",
    components: {
        HeaderVue,
        Overlay,
        Footer
    },
    created() {
        this.appState = useAppStateStore();
        restService.setAppState(this.appState);
        this.$websocketService.registerStore(this.appState);

        this.initUserRandom();
    },
    mounted() {

        const privatePolicyCookie = getCookie(PRIVACY_POLICY_COOKIE_KEY);
        if (privatePolicyCookie && Boolean(privatePolicyCookie)) {
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.HOME);
        } else {
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.DSGVO);
        }
    },
    beforeMount() {
        console.log(router.currentRoute.value.fullPath.startsWith(ROOM_ROUTE))
        console.log(router.currentRoute.value.fullPath)
    },
    data: function () {
        return {
            appState: null,
            hairOptions: [...avatars.avatarHairsOptions],
            headsOptions: [...avatars.avatarHeadsOptions],
            shirtOptions: [...avatars.avatarShirtsOptions],
            colorOptions: [...avatars.colorOptions]
        }
    },
    methods: {
        initUserRandom() {
            const randomAvatar = getRandomAvatar(
                this.headsOptions.length,
                this.hairOptions.length,
                this.shirtOptions.length,
                this.colorOptions);
            let randomNumber = Date.now().toString();
            randomNumber = randomNumber.substring(randomNumber.length - 3, randomNumber.length);
            const newGlobalPlayerCookie = new GlobalPlayerCookie({
                name: 'funnyname' + randomNumber,
                avatar: randomAvatar,
                bgSoundMuted: false
            });
            this.appState.addGlobalCookie(newGlobalPlayerCookie);
        }
    },
    computed: {
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        }
    }
};
</script>

<style lang="scss">
.app-wrapper {
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;

  .hidden-bg-sound {
    display: none !important;
  }

  .connection-not-possible {
    position: absolute;
    background-color: #000000dd;
    border-radius: 8px;
    font-size: calc(12px + 1.25vw);
    line-height: calc(15px + 1.35vw);
    padding: 15px;
    z-index: 99999;
    text-align: center;
    box-shadow: 3px 3px 3px 1px #111111;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 15px 0;
    max-width: 800px;

    .warn-icon {
      min-width: 50px;
      width: 15%;
      height: auto;
    }
  }

  .connecting-to-server {
    position: absolute;
    font-size: calc(7px + 0.1vw);
    line-height: calc(7px + 0.1vw);
    z-index: 99999;
    bottom: 5px;
    right: 5px;
  }
}

.overlay-transition {
  transition: all 0.25s;
}

.termassignoverlay-enter-active {
  animation: opIn 0.25s;
}

.termassignoverlay-leave-active {
  opacity: 0;
}

@media only screen and (max-width: 800px) {
  .app-wrapper {
    height: 100%;
    overflow-y: auto;
  }

  .header {
    display: grid !important;
  }
}


.logo {
  position: absolute;
  padding: 5px;
  top: 0px;
  left: 0px;
  z-index: 99999;
}

.logo img {
  height: calc(50px + 8vw);
  width: auto;
}

.menu-button {
  position: absolute;
  padding: 5px;
  top: 0;
  right: 0;
  z-index: 9999;
}

.menu-button svg {
  width: 30px;
}

.disconnect-warning-container {
  z-index: 999999;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  width: 40vw;
  min-width: 250px;
  max-width: 600px;
  position: fixed;
  top: 10px;
  justify-self: center;
  background-color: rgb(98, 6, 2);
  padding: 15px;
  font-size: calc(12px + 1vw);
  line-height: calc(14px + 1vw);
  font-family: 'Source Sans Pro', sans-serif;
  box-shadow: rgb(61, 6, 2) 2.95px 2.95px 0.6px;

}

.disconnect-warning-container span {
  width: 100%;
  display: inline-block;
  margin: 5px;
}

/* slide in of pages */
.change-section-enter-active {
  transition: all 0.33s ease;
}

.change-section-leave-active {
  transition: all 0.33s ease;
}

.change-section-leave-to {
  opacity: 0;
}

.change-section-enter-from {
  opacity: 0;
}

.main-menu-button {
  position: absolute;
  top: 10px;
  right: 5px;
  transition: all 0.25s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transition: all 0.1s;
    transform: scale(0.95);
  }
}

.menuslide-enter-active, .menuslide-leave-active {
  transition: all 0.2s ease;
}

.menuslide-leave-to {
  position: absolute;
  transform: translateX(110%);
}

.menuslide-enter-from {
  position: absolute;
  transform: translateX(110%);
}


.lobby-host-disconnected-enter-active, .term-assignment-disconnected-enter-active {
  animation: lobby-host-disconnected-slide 0.5s;
}

.lobby-host-disconnected-leave-active, .term-assignment-disconnected-leave-active {
  animation: lobby-host-disconnected-slide 0.33s reverse;
}

@keyframes lobby-host-disconnected-slide {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


.footer-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;

  .footer-overlay-content {
    position: relative;
    max-height: 60vh;
    overflow: hidden;
    border-radius: 15px;

    .close-overlay {
      position: absolute;
      right: 15px;
      top: 15px;
      width: 1.5vw;
      min-width: 15px;
      height: auto;
      cursor: pointer;
    }
  }
}

.alt-button-right {
  position: absolute !important;
  top: calc(100% - 60px);
  max-height: min(max(35px, 2vw), 50px);
  right: 2vw;
  z-index: 99999;

  @media only screen and (max-width: 800px) {
    top: calc(100% - 50px);
  }

  .users-icon {
    width: min(max(25px, 3vw), 35px);
    margin-right: 5px;
  }
}

</style>
