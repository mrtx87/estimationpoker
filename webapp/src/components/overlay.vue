<template>
  <div v-if="this.appState.overlayId > 0 && this.appState.overlayId < 5" class="overlay-wrapper">
    <div class="overlay-container">
      <div v-on:click="closeOverlay" class="close-btn">X</div>
      <avatar-configurator v-if="globalPlayerCookie && appState.overlayId === 1"
                           v-bind:globalPlayerCookie="globalPlayerCookie"
                           v-bind:disabled="false"
                           v-on:onToggleSelectorsHidden="avatarConfiguratorToggle"
                           v-on:onChangeGlobalPlayerCookie="onAvatarConfiguratorChange($event)">
      </avatar-configurator>
      <Impressum v-if="appState.overlayId === 2"></Impressum>
      <dsgvo v-if="appState.overlayId === 3"></dsgvo>
    </div>
  </div>

  <div v-if="this.appState.overlayId === 5" class="burger-menu-wrapper">
    <div class="burger-menu">
      <div v-on:click="openAvatarEditor" class="change-avatar-Btn">Change Avatar</div>
    </div>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import AvatarConfigurator from "@/components/avatar-configurator.vue";
import {setCookie} from "@/services/cookie-service";
import Impressum from "@/components/impressum.vue";
import Dsgvo from "@/components/dsgvo.vue";

export default {
  name: "Overlay",
  components: {
    AvatarConfigurator,
    Impressum,
    Dsgvo,
  },
  created() {
    this.appState = useAppStateStore();
  },
  data: function () {
    return {
      isAvatarConfiguratorOpen: false,
      appState: null,
    }
  },
  methods: {
    openAvatarEditor: function () {
      this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.AVATAR_EDITOR);
      console.log(this.appState._overlayId)
    },
    closeOverlay: function () {
      this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
    },
    onAvatarConfiguratorChange: function (glbCookieUpdate) {
      console.log(glbCookieUpdate);
      setCookie('wtfi_globalPlayer', JSON.stringify(glbCookieUpdate));
      this.appState.addGlobalCookie(glbCookieUpdate);
    },
    avatarConfiguratorToggle: function (value) {
      this.avatarConfiguratorActive = !!value;
    },
  },
  computed: {
    globalPlayerCookie: function () {
      console.log(this.appState.globalPlayerCookie);
      return this.appState.globalCookie;
    },
  }
};
</script>

<style lang="scss">

.overlay-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(128, 128, 128, 0.57);
}

.overlay-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f0f8ffb3;
  padding: 2vh;
  border-radius: 10px;
  box-shadow: 4px 3px 15px -2px rgb(0 0 0 / 20%);
  width: fit-content;
}

.avatar-configurator {
  display: flex;

  justify-content: center;
  align-items: center;
}

.impressum-container {
  display: flex;
  background: #f0f8ffb3;
  width: 50vw;
  height: 55h;
  padding: 2vh;
  border-radius: 10px;
  box-shadow: 4px 3px 15px -2px rgb(0 0 0 / 20%);
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  padding: 5px;

  background: rgba(255, 255, 255, 0.61);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: #dcdcdc;
}

.close-btn:hover {
  background: #ffffff3d;
  color: white;
}

.burger-menu-wrapper {
  position: fixed;
  top: 50px;
  right: 40px;
  width: fit-content;
  height: fit-content;
  background: white;
  border: solid 1px #d5d9de ;
  color: black;
  border-radius: 5px;
}

.change-avatar-Btn {
  cursor: pointer;
  padding: 10px;
}

.change-avatar-Btn:hover {
  background: #f3f3f3;
  border-radius: 10px;
}

</style>
