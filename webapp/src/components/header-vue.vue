<template>
  <div class="header-wrapper">
    <div class="header">
      <button class="button-activate" v-on:click="shareLink()"><img style="width:30px;"
                                                                    src="../assets/sharelink.svg"> invite link
      </button>
      <timer v-bind:timer="estimationTimer"></timer>
      <div class="user-icon-and-menu">
        <user v-if="localUser" v-bind:user="localUser" v-bind:noUserName="true" v-bind:noUserRoleIcon="true"
              v-on:click="toggleUserMenu"></user>
        <div v-if="displayUserMenu" class="user-menu">
          <div class="user-menu-header"> {{ localUser.name }}</div>
          <span v-on:click="openAvatarEditor">Edit User</span>
          <span>delete user</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import User from "@/components/user.vue";
import Timer from "@/components/timer.vue";

export default {
  name: "HeaderVue",
  components: {Timer, User},
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
  height: 5.5vh;
  box-sizing: border-box;
  background-color: #ebebeb;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

.header {
  position: relative;
  display: flex;
  width: 1150px;
  height: 5.5vh;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  justify-content: flex-end;
}

.user-icon-and-menu {
  padding: 0 10px;

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
