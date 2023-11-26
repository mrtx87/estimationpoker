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
            userNameInput: '',
            hairOptions: [...avatars.avatarHairsOptions],
            headsOptions: [...avatars.avatarHeadsOptions],
            shirtOptions: [...avatars.avatarShirtsOptions],
            colorOptions: [...avatars.colorOptions]
        }
    },
    methods: {
        joinRoom() {
            restService.sendPostRequest('/join-room', {
                roomId: this.roomId,
                userName: this.userNameInput,
                avatar: this.appState.avatar
            }).then(response => {
                setCookie(response.data.roomId, response.data.token);
                this.$websocketService.finalizeJoinRoom(response.data.roomId);
            }).then(rawResponse => this.processJoinResponse(rawResponse.data));
        },
        processJoinResponse(response) {
            setCookie(response.roomId, response.token);
            router.push(ROOM_ROUTE + response.roomId);
            this.appState.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
        },
        initUserRandom() {
            const randomAvatar = getRandomAvatar(
                this.headsOptions.length,
                this.hairOptions.length,
                this.shirtOptions.length,
                this.colorOptions);
            this.appState.addAvatar(randomAvatar);
        }
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
