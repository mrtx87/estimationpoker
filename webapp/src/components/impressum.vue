<template>
    <div class="impressum-wrapper">
        <div v-on:click="closeOverlay" class="close-btn"><img src="../assets/close.svg"></div>
        <div class="impressum-title">Impressum</div>
        <div class="impressum">
            <div class="impressum-row">
                <span class="impressum-row-title">{{tl8('impressum.owner')}}:</span>
                <span>Patrick Beiersdörfer</span>
            </div>
            <div class="impressum-row">
                <span class="impressum-row-title">{{tl8('impressum.address')}}:</span>
                <span>10245 Berlin Palmkernzeile 7</span>
            </div>
            <div class="impressum-row">
                <span class="impressum-row-title">{{tl8('impressum.email')}}:</span>
                <span>contact@curview.net</span>
            </div>
            <div class="impressum-row">
                <span class="impressum-row-title">{{tl8('impressum.domain')}}:</span>
                <span>https://estimation-poker.online</span>
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import {languageService} from "@/services/language";

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
        tl8(key, vars) {
            return languageService.t(key, this.appStore.langKey, vars);
        },
        closeOverlay: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
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
