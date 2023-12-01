<template>
  <div class="user-list-wrapper">
    <User v-for="user in users" :key="user.id" class="avatar-icon" v-bind:user="user"></User>
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
    this.appState = useAppStateStore();
  },
  data: function () {
    return {
      appState: null,
      userNameInput: ''
    }
  },
  methods: {},
  computed: {
    room() {
      return this.appState.room ? this.appState.room : null;
    },
    users() {
      return this.appState.room ? this.appState.room.users : [];
    }
  }
};

</script>

<style lang="scss" scoped>

.user-wrapper {
  display: flex;
  align-items: center;
}

.user-avatar-container {
  position: relative;
  display: flex;
}

.avatar-icon {
  position: relative;
}

.user-name {
  width: 100%;
}

</style>
