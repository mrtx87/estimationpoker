<template>
    <div class="join-room-wrapper">
        <div class="join-room-heading">{{ tl8('join.room.title') }}</div>
        <div class="input-elem-container">
            <input type=text v-model="userNameInput" :placeholder="tl8('create.room.user.name.placeholder')">
            <div v-if="userNameTooLong" class="validation-message">{{ tl8('validation.text.user.name') }}</div>
        </div>
        <div class="join-room-buttons-panel">
            <button class="button-activate" :disabled="!inputValid" v-on:click="joinRoom()">{{
                tl8('join.room.text')
                }}
            </button>
            <button class="button-activate invers" v-on:click="cancel()">{{ tl8('main.button.cancel') }}</button>
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
import {languageService} from "@/services/language";

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
        tl8(key, vars) {
            return languageService.t(key, this.appStore.langKey, vars);
        },
        joinRoom() {
            restService.sendPostRequest('/join-room', {
                roomId: this.roomId,
                userName: this.userNameInput,
                avatar: this.$appService.getRandomAvatar()
            }, false, false)
                .then(
                    this.$appService.onJoinRoomResponse.bind(this.$appService),
                    this.$appService.onJoinRoomErrorResponse.bind(this.$appService)
                );
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
            return this.userNameInput.length > 1 && !this.userNameTooLong
        },
        userNameTooLong() {
            return this.userNameInput.length > 25;
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
