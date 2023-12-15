<template>
    <div class="footer-wrapper">
        <div class="footer">
            <div class="footer-btn" v-on:click="openImpressumOnClick">{{ tl8('footer.impressum.title') }}</div>
            <div class="footer-btn" v-on:click="openDatenschutzOnClick">{{ tl8('footer.datenschutz.title') }}</div>
            <div class="footer-btn" v-on:click="openDsgvoOnClick">{{ tl8('footer.cookie.policy.title') }}</div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import {languageService} from "@/services/language";

export default {
    name: "FooterVue",
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
        openDatenschutzOnClick: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.DATENSCHUTZ);
        },
        openImpressumOnClick: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.IMPRESSUM);
        },
        openDsgvoOnClick: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.DSGVO);
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
