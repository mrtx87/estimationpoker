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
import {getCookie, removeAllCookies, setCookie} from "@/services/cookie-service";
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
            if(getCookie(PRIVACY_POLICY_COOKIE_KEY)){
                this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
                return;
            }
            setCookie(PRIVACY_POLICY_COOKIE_KEY, 'true');
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

.dsgvo-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.dsgvo {
  display: flex;
}


</style>
