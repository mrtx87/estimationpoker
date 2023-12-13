<template>
    <div class="footer-wrapper">
        <div class="footer">
            <div class="footer-btn" v-on:click="openImpressumOnClick">Impressum</div>
            <div class="footer-btn" v-on:click="openDatenschutzOnClick">Datenschutzerklärung</div>
            <div class="footer-btn" v-on:click="openDsgvoOnClick">Cookie-Richtlinien</div>
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
    components: {},
    created() {
        this.appState = useAppStateStore();
    },
    data: function () {
        return {
            appState: null,
        }
    },
    methods: {
        openDatenschutzOnClick: function () {
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.DATENSCHUTZ);
        },
        openImpressumOnClick: function () {
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.IMPRESSUM);
        },
        openDsgvoOnClick: function () {
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.DSGVO);
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
  padding: 3px;
  box-sizing: border-box;
}

.footer {
  display: flex;
  gap: 20px;
}

.footer-btn {
  color: #bbbbbb;
  cursor: pointer;

  &:hover {
    color: white;
  }
}


</style>
