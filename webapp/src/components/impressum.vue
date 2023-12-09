<template>
    <div class="impressum-wrapper">
        <div v-on:click="closeOverlay" class="close-btn"><img src="../assets/close.svg"></div>
        <div class="impressum">
            Lorem ipsum dolor sit amet,
            DAS IST IMPRESSUM DU KÖPEK
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


</style>
