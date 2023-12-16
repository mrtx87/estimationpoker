<template>
    <div class="user-menu-wrapper">
        <div class="user-menu-item-heading">{{ tl8('user.menu.roles') }}</div>
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
        <div v-on:click="openEditUser()" class="user-menu-item-heading active-item top">{{ tl8('user.menu.edit.user') }}</div>
  
        <div v-on:click="openDeleteUserPrompt()" class="user-menu-item-heading active-item">
            <span>{{ tl8('user.menu.delete.user') }}</span>
            <img style="width:17px;" src="../assets/warn.svg">
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, RequestMessageType, Roles} from "@/constants/vue-constants";
import {languageService} from "@/services/language";

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
        tl8(key, vars) {
            return languageService.t(key, this.appStore.langKey, vars);
        },
        openEditUser() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.AVATAR_EDITOR);
        },
        openDeleteUserPrompt() {
            this.appStore.setPrompt({
                question: 'toast.remove.user.message',
                crucial: true,
                confirmAction: this.sendDeleteUser.bind(this)
            });
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.PROMPT);
        },
        sendDeleteUser() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.DELETE_USER, {userId: this.appStore.localUserId})
        },
        toggleSelectRole(role) {
            const currentRoles = this.user.roles;
            if (currentRoles.includes(role)) {
                if (currentRoles.length === 1) {
                    this.appStore.toast.warning(this.tl8('toast.warning.no.role.left'));
                    return;
                }
                const updatesRoles = currentRoles.filter(r => r !== role);
                this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROLE, updatesRoles);
                return;
            }

            let updatedRoles = [...currentRoles];
            if (role === Roles.OBSERVER) {
                updatedRoles = updatedRoles.filter(r => r !== Roles.PLAYER);
            }

            if (role === Roles.PLAYER) {
                updatedRoles = updatedRoles.filter(r => r !== Roles.OBSERVER);
            }
            updatedRoles.push(role);
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
  z-index: 5;
  width: 125px;
  font-size: 13px;
  gap: 2px;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  top: 85%;
  right: 50px;
  border-radius: 4px;


  .user-menu-item-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3px;
    transition: 0.15s;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12);
    font-weight: 400;

    &.top {
      border-top: 1px solid #cbcbcb;
    }

    &.active-item {
      &:hover {
        background-color: #dae2ec;
        cursor: pointer;
      }

      &:active {
        padding-left: 6px;
      }

    }

  }

  .user-menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    height: 20px;
    transition: 0.15s;
    cursor: pointer;
    font-weight: 300;


    &:hover {
      background-color: #dae2ec;
    }

    img {
      width: 20px;
    }
  }
}

</style>
