<template>
    <div class="users-wrapper">
        <div v-for="user in onlineUsers" :key="user.id">
            <div> {{user.name}} </div>
        </div>
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
    name: "User-List",
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
    },
    computed: {
        room() {
            return this.appState.room ? this.appState.room : null;
        },
        users() {
            return this.appState.room ? this.appState.room.users : [];
        },
        onlineUsers() {
            const connections = this.room ? this.room.connections : [];
            return this.users.filter(u => connections.includes(u.id));
        }
    }
};
</script>

<style lang="scss">

.users-wrapper {

}

</style>
