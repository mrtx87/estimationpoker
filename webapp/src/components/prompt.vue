<template>
    <div class="prompt-wrapper" v-if="prompt">
        <div class="question-container">{{ prompt.question }}</div>
        <div class="prompt-btn-panel">
            <div v-on:click="confirmAction" class="button-activate small-btn">
                <img v-if="!prompt?.crucial " src="../assets/ok_white.svg">
                <img v-if="prompt?.crucial " src="../assets/warn.svg">
                <span>confirm</span></div>
            <div v-on:click="closeOverlay" class="button-activate small-btn invers">cancel</div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";

export default {
    name: "prompt",
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
        confirmAction() {
          this.prompt.confirmAction();
        },
        closeOverlay: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
        },
    },
    computed: {
        prompt() {
            return this.appStore.prompt;
        }
    }
};
</script>

<style lang="scss">

.prompt-wrapper {
  display: flex;
  flex-direction: column;

  .question-container {
      padding: 20px;

  }

  .prompt-btn-panel {
    display: flex;
    gap: 20px;
  }
}

</style>
