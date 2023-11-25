<template>
  <div v-if="this.appState.overlayId > 0" class="overlay-wrapper">
    <div v-if="appState.overlayId" class="avatar-configurator-overlay">
      <div class="avatar-configurator">
        <avatar-configurator v-if="globalPlayerCookie"
                             v-bind:globalPlayerCookie="globalPlayerCookie"
                             v-bind:disabled="false"
                             v-on:onToggleSelectorsHidden="avatarConfiguratorToggle"
                             v-on:onChangeGlobalPlayerCookie="onAvatarConfiguratorChange($event)"></avatar-configurator>
      </div>
      <div v-on:click="closeOverlay" class="close-btn">X</div>
    </div>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import AvatarConfigurator from "@/components/avatar-configurator.vue";
import {setCookie} from "@/services/cookie-service";

export default {
  name: "Overlay",
  components: {
    AvatarConfigurator

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
    closeOverlay : function() {
      this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
    },
    onAvatarConfiguratorChange: function (glbCookieUpdate) {
      setCookie('wtfi_globalPlayer', JSON.stringify(glbCookieUpdate));
      this.$store.commit('updateGlobalCookie', glbCookieUpdate);
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
  position: fixed;
  width: 50vw;
  height: 50vh;
  background: #2f2f2f;
  border-radius: 20px;
}

.avatar-configurator-overlay {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
}

.avatar-configurator {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.close-btn {
  display: flex;
  margin-right: 20px;
  cursor:pointer;
}
</style>
