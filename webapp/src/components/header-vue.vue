<template>
    <div class="header-wrapper">
        <div class="header">
            <button class="button-activate small-btn" v-if="appStore.isOnRoomRoute" v-on:click="shareLink()"><img
                    src="../assets/sharelink.svg"> invite link
            </button>
            <timer v-bind:timer="estimationTimer"></timer>
            <div class="user-icon-and-menu">
                <user class="header-user" v-if="localUser" v-bind:user="localUser" v-bind:noUserName="true" v-bind:noUserRoleIcon="true"
                      v-on:click="toggleUserMenu"></user>
                <user-menu v-bind:user="localUser" v-if="displayUserMenu"
                           v-on-click-outside="clickedOutside"></user-menu>
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import User from "@/components/user.vue";
import Timer from "@/components/timer.vue";
import UserMenu from "@/components/user-menu.vue";
import {vOnClickOutside} from "@vueuse/components/index";

export default {
    name: "HeaderVue",
    components: {UserMenu, Timer, User},
    directives: {
        onClickOutside: vOnClickOutside
    },
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            isAvatarConfiguratorOpen: false,
            appStore: null,
            displayUserMenu: false
        }
    },
    methods: {
        clickedOutside() {
            this.displayUserMenu = null;
        },
        shareLink() {
            navigator.clipboard.writeText(window.location.href).then(() => this.appStore.toast.info('In Zwischenablage kopiert'));
        },
        toggleUserMenu: function () {
            this.displayUserMenu = !this.displayUserMenu;
        },
        openAvatarEditor: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.AVATAR_EDITOR);
            this.toggleUserMenu();
        },
    },
    computed: {
        localUserId() {
            return this.appStore.localUserId;
        },
        localUser() {
            return this.appStore.room && this.localUserId ? this.appStore.room.users.find(u => u.id === this.localUserId) : null;
        },
        estimationTimer() {
            return this.appStore.room ? this.appStore.room.currentEstimation.timer : null;
        }
    }
};
</script>

<style lang="scss">

.header-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #ebebeb;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  height: 75px;

}

.header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  justify-content: flex-end;
  max-width: 1280px;
}

.user-icon-and-menu {

  .user-menu {
    background-color: #9f92e4;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 45px;
    right: 25px;
    z-index: 5;

    .user-menu-header {
      min-width: 150px;
      min-height: 30px;
    }
  }
}


</style>
