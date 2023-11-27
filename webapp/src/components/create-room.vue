<template>
    <div class="create-room-wrapper">
        <div v-if="!creatingRoomClicked">
            <button v-on:click="triggerCreateRoom()">Raum erstellen </button>
        </div>
        <div v-if="creatingRoomClicked">
            <div class="input-elem-container">
                <span>Username</span>
                <input v-model="userNameInput">
            </div>
            <div class="input-elem-container">
                <span>Raumname</span>
                <input v-model="roomTitleInput">
            </div>
            <button v-on:click="createRoom()">Raum erstellen</button>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";


export default {
    name: "Create-Room",
    components: {},
    created() {
        this.appState = useAppStateStore();
    },
    data: function () {
        return {
            appState: null,
            userNameInput: '',
            roomTitleInput: '',
            creatingRoomClicked: false
        }
    },
    methods: {
        triggerCreateRoom() {
            this.creatingRoomClicked = true;
        },
        createRoom() {
            restService.sendPostRequest(
                '/create-room',
                {userName: this.userNameInput, roomTitle: this.roomTitleInput, avatar: this.$appService.getRandomAvatar()},
                true,
                false)
                .then(this.$appService.onJoinRoomResponse.bind(this.$appService));
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

.create-room-wrapper {

}

.input-elem-container {
    display: flex;
    flex-direction: column;
}


</style>
