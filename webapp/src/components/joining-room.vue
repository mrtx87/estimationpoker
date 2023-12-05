<template>
    <div class="join-room-wrapper">
        <div class="join-room-heading">Raum beitreten</div>
        <div class="input-elem-container">
            <input type=text v-model="userNameInput" placeholder="Dein Benutzername">
        </div>
        <div class="join-room-buttons-panel">
            <button class="button-activate" :disabled="!inputValid" v-on:click="joinRoom()">Raum beitreten</button>
            <button class="button-activate invers" v-on:click="cancel()">abbrechen</button>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, HOME_ROUTE, ROOM_ROUTE} from "@/constants/vue-constants";
import {CREATE_DOCUMENT_ENDPOINT, restService} from "@/services/rest-service";
import {getRandomAvatar, setCookie} from "@/services/cookie-service";
import {router} from "@/main";
import {GlobalPlayerCookie} from "@/model/global-player-cookie.model";
import * as avatars from "@/assets/avatar/avatar-constants";

export default {
    name: "Joining-Room",
    components: {},
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
            userNameInput: ''
        }
    },
    methods: {
        joinRoom() {
            restService.sendPostRequest('/join-room', {
                roomId: this.roomId,
                userName: this.userNameInput,
                avatar: this.$appService.getRandomAvatar()
            }, false, false).then(this.$appService.onJoinRoomResponse.bind(this.$appService));
        },
        cancel() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
            router.push(HOME_ROUTE);
        }
    },
    computed: {
        roomId() {
            return this.appStore.roomId;
        },
        inputValid() {
            return this.userNameInput.length > 2
        }
    }
};
</script>

<style lang="scss">


.join-room-wrapper {
  width: 315px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;
  padding: 15px;

  .join-room-heading {
    color: black;
    font-size: 1.5rem;
    line-height: 1.5rem;
    padding: 5px 0;
  }

  .join-room-buttons-panel {
    display: flex;
    gap: 15px;

    input[type=text] {
      padding: 15px;
      outline: 1px solid #d7d7d7;
      border: none;
      border-radius: 3px;
      margin-bottom: 10px;
      width: 100%;
      box-sizing: border-box;
      color: #2C3E50;
      font-size: 13px;
      font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
    }

  }
}

</style>
