<template>
    <div class="user-list-wrapper">
        <div class="user-and-submenu" v-for="user in sortedOnlineUsers" :key="user.id">
            <User v-bind:user="user"></User>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import User from "@/components/user.vue";
import {sortUser} from "@/services/util";

export default {
    name: "User-List",
    components: {
        User
    },
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
            userNameInput: '',
            displayOfflineUsers: false,
            showMenu: false
        }
    },
    methods: {
        openUserMenu(userId) {
            this.showMenu = userId;
        }
    },
    computed: {
        room() {
            return this.appStore.room;
        },
        users() {
            return this.appStore.room ? this.appStore.room.users : [];
        },
        onlineUsers() {
            return [...this.users.filter(u => this.room.connections.includes(u.id))];
        },
        offlineUsers() {
            return [...this.users.filter(u => !this.room.connections.includes(u.id))];
        },
        sortedOnlineUsers() {
            const users = [...this.onlineUsers];
            users.sort(sortUser);
            return users;
        },
        sortedOfflineUsers() {
            if (!this.displayOfflineUsers) {
                return [];
            }
            const users = [...this.offlineUsers];
            users.sort(sortUser);
            return users;
        }
    }
};

</script>

<style lang="scss" scoped>

.user-list-wrapper {
  display: flex;
  box-sizing: border-box;
  gap: 10px;

  .users-heading {
    border-bottom: 1px solid #f2f3f4;
    padding: 5px;
    font-weight: bold;
    font-size: 1rem;
  }

  .user-and-submenu {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    background-color: white;
    border-radius: 5px;
    width: 125px;
    aspect-ratio: 1/1;
    position: relative;

    .show-on-hover {
      position: absolute;
      z-index: 2;
      right: 0px;
      top: 5px;
    }
  }

  .user-menu-icon {
    height: 20px;
    width: auto;
    border-radius: 50%;
    padding: 2px;
    transition: 0.15s ease-in-out;

    &:hover {
      background-color: #f2f3f4;
    }
  }

}


</style>
