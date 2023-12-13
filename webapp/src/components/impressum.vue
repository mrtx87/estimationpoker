<template>
    <div class="impressum-wrapper">
        <div v-on:click="closeOverlay" class="close-btn"><img src="../assets/close.svg"></div>
        <div class="impressum-title">Impressum</div>
        <div class="impressum">
            <div class="impressum-row">
                <span class="impressum-row-title">Owner:</span>
                <span>Patrick Beiersdörfer</span>
            </div>
            <div class="impressum-row">
                <span class="impressum-row-title">Address:</span>
                <span>10245 Berlin Palmkernzeile 7</span>
            </div>
            <div class="impressum-row">
                <span class="impressum-row-title">E-Mail:</span>
                <span>contact@curview.net</span>
            </div>
            <div class="impressum-row">
                <span class="impressum-row-title">Domain:</span>
                <span>??????.net</span>
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";

export default {
    name: "Impressum",
    components: {},
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {
        closeOverlay: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
        },
    },
    computed: {}
};
</script>

<style lang="scss">

.impressum-wrapper {
  position: relative;
  padding: 10px;
  box-sizing: border-box;

  .close-btn {
    top: -5px;
    right: -5px;
  }

  .impressum-title {
    font-size: 26px;
    font-weight: 600;
    padding-bottom: 15px;
  }

  .impressum {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .impressum-row {
      display: flex;
      gap: 20px;

      .impressum-row-title {
        font-weight: bold;
      }
    }
  }
}


</style>
