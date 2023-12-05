<template>
  <div class="timer-wrapper">

  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {RequestMessageType, Roles} from "@/constants/vue-constants";

export default {
  name: "Timer",
  props: ['timer'], // {startTime: 1000, state: 1 = running, = Stopped, passedTime: 0}
  created() {
    this.appStore = useAppStateStore();
    const now = Date.now() // 15000
  },
  data: function () {
    return {
      appStore: null,
    }
  },
  methods: {
  },
  computed: {
  }
};
</script>

<style lang="scss">

.timer-wrapper {

}

</style>
