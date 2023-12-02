<template>
    <div class="user-list-wrapper">
        <div class="users-heading">Users</div>
        <div class="user-and-submenu" v-for="user in sortedUsers" :key="user.id">
            <User v-bind:user="user"></User>
            <button class="plain-button-with-image show-on-hover"><img src="../assets/three_dots.svg"></button>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import User from "@/components/user.vue";
import {Roles} from "@/constants/vue-constants";

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
            userNameInput: ''
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
        sortedUsers() {
            const users = [...this.users];
            users.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
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
  padding: 10px;

  .users-heading {
    border-bottom: 1px solid #f2f3f4;
    padding: 5px;
    font-weight: bold;
    font-size: 1.333rem;
  }

  .user-and-submenu {
    display: flex;
    width: 100%;
    justify-content: space-between;
    border-bottom: 1px solid #f2f3f4;

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
