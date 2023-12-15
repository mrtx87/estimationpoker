<template>
    <div class="dsgvo-wrapper">
        <div class="dsgvo-title">Cookie Richtlinien</div>
        <div class="dsgvo-subtitle">Ihre Privatsphäre ist uns wichtig</div>
        <div class="dsgvo">
            <p>Damit Sie EstimationPoker nutzen können, müssen Sie der Verwendung von
                First-Party-Cookies zustimmen. </p>
            <p>Wir verwenden diese Cookies nur auf dieser Website für folgende Zwecke:</p>
            <ul>
                <li>Informationen über besuchte und erstelle Räume</li>
                <li>Speicherung des ausgewählten Sprache</li>
            </ul>
            <p>Durch die Bestätigung erlauben Sie die Verwendung dieser Cookies und damit auch die Speicherung im lokalen Speicher ihres Browsers.</p>
            <p>Bei Widerruf werden alle gespeicherten Daten gelöscht. Dadurch geht der Zugang zu gespeicherten Räumen verloren.</p>

        </div>
        <div class="dsgvo-btn-panel">
            <button class="button-activate" v-on:click="confirmDSGVO()">confirm</button>
            <button class="button-activate" v-on:click="declineDGSVO()">decline</button>
        </div>

    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";
import {getCookie, removeAllCookies, setCookie, setPrivacyCookie} from "@/services/cookie-service";
import {router} from "@/main";

export default {
    name: "Dsgvo",
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
        confirmDSGVO() {
          const cookie = getCookie(PRIVACY_POLICY_COOKIE_KEY);
          if (cookie) {
                this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
                return;
            }
            setPrivacyCookie();
            this.$appService.initApp();
        },
        declineDGSVO() {
            removeAllCookies();
            this.appStore.reset();
            router.push(HOME_ROUTE);
            this.appStore.setIsOnRoomRoute(false);
        }
    },
    computed: {}
};
</script>

<style lang="scss">


.dsgvo-title {
  font-size: 26px;
  font-weight: 600;
}

.dsgvo-subtitle {
    font-size: 21px;
    font-weight: 600;
}

.dsgvo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
}

.dsgvo {
  display: flex;
  flex-direction: column;
}

.dsgvo-btn-panel {
  display: flex;
  gap: 20px;
}


</style>
