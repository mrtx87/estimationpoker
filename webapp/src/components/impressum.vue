<template>
  <div class="impressum-wrapper">
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
