<template>
    <div class="user-menu-wrapper">
        <div class="user-menu-item" v-on:click="toggleSelectRole(Roles.MODERATOR)">
            <span>Moderator</span>
            <img v-if="user.roles.includes(Roles.MODERATOR)" src="../assets/ok.svg">
        </div>
        <div class="user-menu-item" v-on:click="toggleSelectRole(Roles.PLAYER)">
            <span>Player</span>
            <img v-if="user.roles.includes(Roles.PLAYER)" src="../assets/ok.svg">
        </div>
        <div class="user-menu-item" v-on:click="toggleSelectRole(Roles.OBSERVER)">
            <span>Observer</span>
            <img v-if="user.roles.includes(Roles.OBSERVER)" src="../assets/ok.svg">
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {RequestMessageType, Roles} from "@/constants/vue-constants";

export default {
    name: "user-menu",
    components: {},
    props: ['user'],
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {
        toggleSelectRole(role) {
            const currentRoles = this.user.roles;
            if (currentRoles.includes(role)) {
                if (currentRoles.length === 1) {
                    this.appStore.toast.warning(`Du kannst nicht alle Rollen entfernen`);
                    return;
                }
                const updatesRoles = currentRoles.filter(r => r !== role);
                this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROLE, updatesRoles);
                return;
            }

            let updatedRoles = [...currentRoles];
            if (role === Roles.OBSERVER) {
                updatedRoles = [Roles.OBSERVER];
            }

            if (role === Roles.MODERATOR || role === Roles.PLAYER) {
                updatedRoles = updatedRoles.filter(r => r !== Roles.OBSERVER);
                updatedRoles.push(role);
            }
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROLE, updatedRoles);
        }
    },
    computed: {
        Roles() {
            return Roles
        }
    }
};
</script>

<style lang="scss">

.user-menu-wrapper {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 4px;
  z-index: 5;
  width: 100px;
  font-size: 13px;
  gap: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  padding: 5px 0;
  top: 85%;
  right: 50px;


  .user-menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    transition: 0.15s;

    &:hover {
      background-color: #dae2ec;
    }

    img {
      width: 20px;
    }
  }
}

</style>
