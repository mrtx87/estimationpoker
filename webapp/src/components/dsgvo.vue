<template>
  <div class="dsgvo-wrapper">
    <div class="dgvo">
      Lorem ipsum dolor sit amet,
        DAS IST DSGVO DU PIC
    </div>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";

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

  },
  computed: {}
};
</script>

<style lang="scss">



</style>
