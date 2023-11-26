<template>
    <div class="dsgvo-wrapper">
        <div class="dsgvo">
            DSGVO TEST

        </div>
        <div>
            <button v-on:click="confirmDSGVO()">confirm</button>
            <button v-on:click="declineDGSVO()">decline</button>
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
        this.appState = useAppStateStore();
    },
    data: function () {
        return {
            appState: null,
        }
    },
    methods: {
        confirmDSGVO() {
            setCookie(PRIVACY_POLICY_COOKIE_KEY, 'true');
            if(this.appState.pendingRedirect) {
                router.push(this.appState.pendingRedirect.path);
                this.appState.setPendingRedirect(null);
            }else{
                this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.HOME);
            }
        },
        declineDGSVO() {
            removeAllCookies();
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.DSGVO);
            router.push(HOME_ROUTE);
        }
    },
    computed: {}
};
</script>

<style lang="scss">

.dsgvo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dsgvo {
  display: flex;
}


</style>
