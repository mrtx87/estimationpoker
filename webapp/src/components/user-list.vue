<template>
  <div class="user-wrapper" v-for="user in users" :key="user.id">
    <div class="user-avatar-container">
      <User class="avatar-icon" v-bind:avatar="user.avatar"></User>
      <div :class="[isModerator(user) ? 'is-admin' : '']"></div>
      <div :class="[isOnline(user.id) ? 'is-online' : 'is-offline' ]"></div>
    </div>
    <div class="user-name"> {{ user.name }}</div>
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
  methods: {
    isModerator(user) {
       return user && user.roles.includes(Roles.MODERATOR)
    },
    isOnline(userId) {
      return this.room.connections.find(uid => uid === userId);
    }
  },
  computed: {
    room() {
      return this.appState.room ? this.appState.room : null;
    },
    users() {
      return this.appState.room ? this.appState.room.users : [];
    },
    onlineUsers() {
      const connections = this.room ? this.room.connections : [];
      return this.users.filter(u => connections.includes(u.id));
    }
  }
};

</script>

<style lang="scss">

.user-wrapper {
  display: flex;
  align-items: center;
}

.user-avatar-container{
  position: relative;
  display: flex;
}

.avatar-icon {
  position: relative;
}

.is-admin {
  position: absolute;
  top: 0;
  right: 0;
  background-color: yellow;
  width: 10px;
  height: 10px;
}

.is-online {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #49ff49;
  width:10px;
  height: 10px;
  border-radius: 15px;
}

.is-offline {
  position: absolute;
  right: 0;
  bottom: 0;
  background-color: #9a9a9a;
  width:10px;
  height: 10px;
  border-radius: 15px;
}


.user-name {
  width: 100%;
}

</style>
