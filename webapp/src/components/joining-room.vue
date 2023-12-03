<template>
    <div class="home-wrapper">
        <input v-model="userNameInput">
        <button v-on:click="joinRoom()">Raum beitreten</button>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, ROOM_ROUTE} from "@/constants/vue-constants";
import {CREATE_DOCUMENT_ENDPOINT, restService} from "@/services/rest-service";
import {getRandomAvatar, setCookie} from "@/services/cookie-service";
import {router} from "@/main";
import {GlobalPlayerCookie} from "@/model/global-player-cookie.model";
import * as avatars from "@/assets/avatar/avatar-constants";

export default {
    name: "Joining-Room",
    components: {},
    created() {
        this.appState = useAppStateStore();
    },
    data: function () {
        return {
            appState: null,
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
    },
    computed: {
        roomId() {
            return this.appState.roomId;
        }
    }
};
</script>

<style lang="scss">


</style>
