<template>
    <div class="overlay-wrapper">
        <div class="overlay-container">
            <avatar-configurator v-if="overlayId === DISPLAY_OVERLAY_STATE.AVATAR_EDITOR"
                                 v-bind:avatar="appStore.localUser.avatar"
                                 v-bind:userName="appStore.localUser.name"
                                 v-bind:disabled="false">
            </avatar-configurator>
            <Impressum v-if="overlayId === DISPLAY_OVERLAY_STATE.IMPRESSUM"></Impressum>
            <dsgvo v-if="overlayId === DISPLAY_OVERLAY_STATE.DSGVO"></dsgvo>
            <JoiningRoom v-if="overlayId === DISPLAY_OVERLAY_STATE.JOIN_ROOM"></JoiningRoom>
            <CreateRoom v-if="overlayId === DISPLAY_OVERLAY_STATE.CREATE_ROOM"></CreateRoom>
            <room-settings v-bind:roomSettings="roomSettings"
                           v-if="overlayId === DISPLAY_OVERLAY_STATE.ROOM_SETTINGS"></room-settings>
            <prompt v-if="overlayId === DISPLAY_OVERLAY_STATE.PROMPT"></prompt>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import AvatarConfigurator from "@/components/avatar-configurator.vue";
import Impressum from "@/components/impressum.vue";
import Dsgvo from "@/components/dsgvo.vue";
import JoiningRoom from "@/components/joining-room.vue";
import CreateRoom from "@/components/create-room.vue";
import RoomSettings from "@/components/room-settings.vue";
import Prompt from "@/components/prompt.vue";

export default {
    name: "Overlay",
    components: {
        Prompt,
        RoomSettings,
        CreateRoom,
        JoiningRoom,
        AvatarConfigurator,
        Impressum,
        Dsgvo
    },
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            isAvatarConfiguratorOpen: false,
            appStore: null,
        }
    },
    computed: {
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        },
        overlayId() {
            return this.appStore.overlayId;
        },
        roomSettings() {
            return this.appStore.room ? this.appStore.room.roomSettings : null;
        }
    }
};
</script>

<style lang="scss">

.overlay-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000a6;
  z-index: 99;
}

.overlay-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  box-shadow: 0 5px 15px #00000080;
  width: fit-content;
  box-sizing: border-box;
  max-width: 90%;
  padding: 15px;

}
</style>
