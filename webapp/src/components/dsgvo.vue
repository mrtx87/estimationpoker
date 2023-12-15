<template>
    <div class="dsgvo-wrapper">
        <div class="dsgvo-title">{{ tl8('dsgvo.cookie.guidelines') }}</div>
        <div class="dsgvo-subtitle">{{ tl8('dsgvo.privacy') }}</div>
        <div class="dsgvo">
            <p>{{ tl8('dsgvo.text1') }} </p>
            <p>{{ tl8('dsgvo.text2') }} </p>
            <ul>
                <li>{{ tl8('dsgvo.text3') }} </li>
                <li>{{ tl8('dsgvo.text4') }} </li>
            </ul>
            <p>{{ tl8('dsgvo.text5') }} </p>
            <p>{{ tl8('dsgvo.text6') }} </p>

        </div>
        <div class="dsgvo-btn-panel">
            <button class="button-activate" v-on:click="confirmDSGVO()">{{ tl8('dsgvo.confirm.btn') }}</button>
            <button class="button-activate" v-on:click="declineDGSVO()">{{ tl8('dsgvo.decline.btn') }}</button>
        </div>

    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, PRIVACY_POLICY_COOKIE_KEY} from "@/constants/vue-constants";
import {getCookie, removeAllCookies, setCookie, setPrivacyCookie} from "@/services/cookie-service";
import {router} from "@/main";
import {languageService} from "@/services/language";

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
        tl8(key) {
          return languageService.t(key, this.appStore.langKey);
        },
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
