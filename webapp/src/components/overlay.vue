<template>
    <div class="overlay-wrapper">
        <div class="overlay-container">
            <div v-on:click="closeOverlay" class="close-btn">X</div>
            <avatar-configurator v-if="overlayId === DISPLAY_OVERLAY_STATE.AVATAR_EDITOR"
                                 v-bind:avatar="appStore.localUser.avatar"
                                 v-bind:disabled="false"
                                 v-on:onAvatarChange="onAvatarConfiguratorChange($event)">
            </avatar-configurator>
            <Impressum v-if="overlayId === DISPLAY_OVERLAY_STATE.IMPRESSUM"></Impressum>
            <dsgvo v-if="overlayId === DISPLAY_OVERLAY_STATE.DSGVO"></dsgvo>
            <JoiningRoom v-if="overlayId === DISPLAY_OVERLAY_STATE.JOIN_ROOM"></JoiningRoom>
            <CreateRoom v-if="overlayId === DISPLAY_OVERLAY_STATE.CREATE_ROOM"></CreateRoom>
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

export default {
    name: "Overlay",
    components: {
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
    methods: {

        closeOverlay: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
        },
        onAvatarConfiguratorChange: function (avatar) {
            this.appStore.addAvatar(avatar);
        },
    },
    computed: {
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        },
        overlayId() {
            return this.appStore.overlayId;
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
}

.overlay-container {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #f0f8ffb3;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 5px 15px #00000080;
  width: fit-content;
}

.avatar-configurator {
  display: flex;

  justify-content: center;
  align-items: center;
}

.impressum-container {
  display: flex;
  background: #f0f8ffb3;
  width: 50vw;
  height: 55 h;
  padding: 2vh;
  border-radius: 10px;
  box-shadow: 4px 3px 15px -2px rgb(0 0 0 / 20%);
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  padding: 5px;

  background: rgba(255, 255, 255, 0.61);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  color: #dcdcdc;
}

.close-btn:hover {
  background: #ffffff3d;
  color: white;
}

.burger-menu-wrapper {
  position: fixed;
  top: 50px;
  right: 40px;
  width: fit-content;
  height: fit-content;
  background: white;
  border: solid 1px #d5d9de;
  color: black;
  border-radius: 5px;
}

.change-avatar-Btn {
  cursor: pointer;
  padding: 10px;
}

.change-avatar-Btn:hover {
  background: #f3f3f3;
  border-radius: 10px;
}

</style>
