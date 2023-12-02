<template>
    <div class="user-list-wrapper">
        <User v-for="user in sortedUsers" :key="user.id" v-bind:user="user"></User>
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
}


</style>
