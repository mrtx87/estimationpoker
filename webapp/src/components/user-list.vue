<template>
    <div class="user-list-wrapper">
        <div class="user-tile" v-for="user in sortedOnlineUsers" :key="user.id">
          <vote-card v-if="userVote(user.id)?.value && user.roles.includes(Roles.PLAYER) && hasBeenRevealed()" v-bind:value="userVote(user.id)?.value" v-bind:disabled="true" class="user-tile-size"></vote-card>
          <div class="card" :class="{'grey-card': !userVote(user.id), 'green-card': userVote(user.id)}" v-if="!hasBeenRevealed()">
          </div>
          <User class="poker-area-user" v-bind:user="user"></User>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import User from "@/components/user.vue";
import {sortUser} from "@/services/util";
import VoteCard from "@/components/vote-card.vue";
import {Roles, VOTING_STATE} from "@/constants/vue-constants";

export default {
    name: "User-List",
    components: {
      VoteCard,
        User,
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
      userVote(userId) {
        return this.estimation.votes.find(vote => vote.userId === userId)
      },
      hasBeenRevealed() {
        return this.estimation.state === VOTING_STATE.REVEALED;
      },
    },
    computed: {
      Roles() {
        return Roles
      },
        room() {
            return this.appStore.room;
        },
        estimation() {
            return this.room.currentEstimation;
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

  .user-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    aspect-ratio: 1/1;
    position: relative;
    padding: 15px;
    width: 130px;
  }

  .card {
    width: 40px;
    aspect-ratio: 2/3;
    font-size: 0.8rem;
    position: absolute;
    z-index: 13;
    border-radius: 4px;
    left: 5px;
    top: 0;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  }

  .grey-card {
    background: #c7c7c7;
  }

  .green-card {
    background: #b3efa2;
  }

}


</style>
