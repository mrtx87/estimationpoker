<template>
  <div class="footer-wrapper">
    <div class="footer">
      <div class="impressum-btn" v-on:click="openImpressumOnClick">Impressum</div>
      <div class="dsgvo-btn" v-on:click="openDsgvoOnClick">DSGVO</div>
    </div>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import Impressum from "@/components/impressum.vue";
import Dsgvo from "@/components/dsgvo.vue";

export default {
  name: "FooterVue",
  components: {
  },
  created() {
    this.appState = useAppStateStore();
  },
  data: function () {
    return {
      appState: null,
    }
  },
  methods: {
    openImpressumOnClick: function () {
      this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.IMPRESSUM);
      console.log(this.appState._overlayId)
    },
    openDsgvoOnClick: function () {
      this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.DSGVO);
      console.log(this.appState._overlayId)
    },
  },
  computed: {}
};
</script>

<style lang="scss">

.footer-wrapper {
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: center;
  bottom: 0px;
}

.footer {
  display: flex;
  gap: 20px;
}

.impressum-btn {
  color: #dedede;
  cursor: pointer;
}

.impressum-btn:hover {
  color: white;
}

.dsgvo-btn {
  color: #dedede;
  cursor: pointer;
}

.dsgvo-btn:hover {
  color: white;
}

</style>
