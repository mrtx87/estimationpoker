<template>
    <div class="header-wrapper">
        <div class="header">
            <user v-if="localUser" v-bind:avatar="localUser.avatar" v-on:click="toggleUserMenu"></user>
            <div v-if="displayUserMenu" class="user-menu">
                <span v-on:click="openAvatarEditor">Edit User</span>
                <span>-punkt2</span>
                <span>-punkt3</span>
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import User from "@/components/user.vue";

export default {
    name: "HeaderVue",
    components: {User},
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
        }
    }
};
</script>

<style lang="scss">

.header-wrapper {
  width: 100%;
  #position: fixed;
  top: 0;
}

.header {
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom: 1px #d5d9de solid;
  align-items: center;
  gap: 10px;
}

.user-menu {
  background-color: #9f92e4;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40px;
  right: 25px;
  z-index: 5;
}

</style>
