<template>
  <div class="header-wrapper">
    <div class="header">
      <span>hello</span>
      <button v-on:click="openAvatarEditor" class="change-avatar-Btn">Change Avatar</button>
    </div>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
export default {
  name: "HeaderVue",
  components: {

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
    openAvatarEditor: function() {
      this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.AVATAR_EDITOR);
    }
  },
  computed: {

  }
};
</script>

<style lang="scss">

  .header-wrapper {
    width: 100%;
    position: fixed;
    top: 0;
  }

  .header {
    display: flex;
    width: 100%;
    height: 60px;
    background-color: black;
    align-items: center;
  }

  .change-avatar-Btn {

  }

</style>
