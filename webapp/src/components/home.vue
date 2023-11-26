<template>
  <div class="home-wrapper">
      <button v-on:click="createRoom()"> create room </button>
      <button> join room</button>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, ROOM_ROUTE} from "@/constants/vue-constants";
import {CREATE_DOCUMENT_ENDPOINT, restService} from "@/services/rest-service";
import {setCookie} from "@/services/cookie-service";
import {router} from "@/main";

export default {
  name: "Home",
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
      createRoom() {
          console.log('create room')
          restService.sendPostRequest(
              CREATE_DOCUMENT_ENDPOINT,
              {userName: 'Padde', roomTitle: "Kakkraum"},
              true,
              false)
              .then(rawResponse => this.processJoinResponse(rawResponse.data))
      },
      processJoinResponse(response) {
          this.$websocketService.establishConnection();
          setCookie(response.roomId, response.token)
          router.push(ROOM_ROUTE + response.roomId)
      },
  },
  computed: {}
};
</script>

<style lang="scss">



</style>
