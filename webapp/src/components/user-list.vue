<template>
    <div class="user-list-wrapper">
        <div class="users-heading">Online - {{ onlineUsers.length }}</div>
        <div class="user-and-submenu" v-for="user in sortedOnlineUsers" :key="user.id">
            <User v-bind:user="user"></User>
            <button class="plain-button-with-image show-on-hover"><img src="../assets/three_dots.svg"></button>
        </div>
        <div class="offline-users-heading" v-on:click="displayOfflineUsers = !displayOfflineUsers">
            <span>Offline - {{ offlineUsers.length }}</span>
            <svg class="triangle" :class="{'updown':displayOfflineUsers}" xmlns="http://www.w3.org/2000/svg" width="24"
                 height="24"
                 viewBox="0 0 24 24">
                <path d="M24 22h-24l12-20z"/>
            </svg>
        </div>
        <div class="user-and-submenu" v-for="user in sortedOfflineUsers" :key="user.id">
            <User v-bind:user="user"></User>
            <button class="plain-button-with-image show-on-hover"><img src="../assets/three_dots.svg"></button>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import User from "@/components/user.vue";
import {Roles} from "@/constants/vue-constants";
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
            displayOfflineUsers: false
        }
    },
    methods: {},
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
  flex-direction: column;
  box-sizing: border-box;
  background-color: white;

  .users-heading {
    border-bottom: 1px solid #f2f3f4;
    padding: 5px;
    font-weight: bold;
    font-size: 1.1rem;
  }

  .offline-users-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ebebeb;
    padding: 5px;
    font-weight: bold;
    font-size: 1.1rem;
    cursor: pointer;

    .triangle {
      transition: all 0.2s ease-in-out;

      &.updown {
        transform: rotate(60deg) translateY(-3px) translateX(-1px);
      }
    }

  }

  .user-and-submenu {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #f2f3f4;
    padding: 7px;

    &:hover {
      .show-on-hover {
        display: flex;
      }
    }

    .show-on-hover {
      display: none;
    }
  }


}


</style>
