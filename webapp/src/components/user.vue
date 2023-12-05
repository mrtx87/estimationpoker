<template>
    <div class="user-wrapper" :title="user ? user.name + ' - ' + user.roles.join(',') : ''">
        <div class="readyonly-player-container">
            <div class="readonly-avatar-container">
                <div class="readyonly-avatar-hair" v-html="displayedAvatar?.hair">
                </div>
                <div class="readyonly-avatar-head" v-html="displayedAvatar?.head">
                </div>
                <div class="readyonly-avatar-shirt" v-html="displayedAvatar?.shirt">
                </div>
            </div>
            <div v-if="!noUserRoleIcon" class="online-status"
                 :class="[isOnline(user?.id) ? 'is-online' : 'is-offline' ]"></div>
            <img v-if="isModerator(user) && !noUserRoleIcon" :src="require('../assets/crown2.svg')"
                 class="is-moderator">
            <img v-if="isSpectator(user) && !noUserRoleIcon" :src="require('../assets/eye.svg')" class="is-spectator">
        </div>
        <div v-if="!noUserName" class="user-name"> {{ user?.name }}</div>
    </div>
</template>

<script>

import * as avatars from "@/assets/avatar/avatar-constants.ts";
import {
    HAIR_COLOR_PLACEHOLDER,
    SHIRT_COLOR_PLACEHOLDER,
    SKIN_COLOR_PLACEHOLDER
} from "@/assets/avatar/avatar-constants.ts";
import {useAppStateStore} from "@/stores/app-state";
import {Roles} from "@/constants/vue-constants";

export default {
    name: 'User',
    props: ['noUserName', 'user', 'noUserRoleIcon'],
    components: {},
    created() {
        this.appState = useAppStateStore();
    },
    data() {
        return {
            displayedAvatar: null
        }
    },
    watch: {
        user: function (user, oldUser) { // watch it
            this.externalUpdate(user.avatar);
        }
    },
    methods: {
        isModerator(user) {
            return user && user.roles.includes(Roles.MODERATOR)
        },
        isSpectator(user) {
            return user && user.roles.includes(Roles.SPECTATOR)
        },
        isOnline(userId) {
            return this.room?.connections.find(uid => uid === userId);
        },
        findElementByTypeAndCode: function (options, code) {
            const found = options.find(o => +o.code === +code);
            return found ? found : options[0];
        },
        externalUpdate: function (updatedAvatarConfig) {
            if (!updatedAvatarConfig) {
                return;
            }

            const hair = this.findElementByTypeAndCode(avatars.avatarHairsOptions, updatedAvatarConfig.hair.code);
            const head = this.findElementByTypeAndCode(avatars.avatarHeadsOptions, updatedAvatarConfig.head.code);
            const shirt = this.findElementByTypeAndCode(avatars.avatarShirtsOptions, updatedAvatarConfig.shirt.code);
            this.displayedAvatar = {
                hair: hair.value.replaceAll(HAIR_COLOR_PLACEHOLDER, updatedAvatarConfig.hair.color),
                head: head.value.replaceAll(SKIN_COLOR_PLACEHOLDER, updatedAvatarConfig.head.color),
                shirt: shirt.value.replaceAll(SHIRT_COLOR_PLACEHOLDER, updatedAvatarConfig.shirt.color)
            }
        }
    },
    computed: {
        room() {
            return this.appState.room;
        }
    },
    beforeMount: function () {
        if (!this.user) {
            return;
        }
        this.externalUpdate(this.user.avatar);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.user-wrapper {
  display: flex;
  gap: 8px;
  align-items: center;
  box-sizing: border-box;
  color: black;
}

.readyonly-player-container {
  display: flex;
  margin: 0.5vh;
  position: relative;
  height: 4vh;
  width: 4vh;
  min-width: 2vh;
  min-height: 2vh;
}

.readyonly-player-container.is-local-player .readonly-avatar-container {
  background-color: var(--highlight-color-light-shade);
}

.readonly-avatar-container {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: inherit;
  min-height: inherit;
  background-color: #daf3ff;
  box-shadow: rgb(0 0 0 / 50%) 1.95px 3.95px 3.6px;
  border-radius: 50%;
  overflow: hidden;
}

.readyonly-avatar-hair {
  z-index: 5000;
  width: 100%;
}

.readyonly-avatar-head {
  z-index: 4998;
  width: 100%;

}

.readyonly-avatar-shirt {
  z-index: 4999;
  width: 100%;
}

.readyonly-avatar-hair svg {
  position: absolute;
  top: 3.5%;
  width: 100%;
  height: auto;
  z-index: 3;
  left: 0;
}

.readyonly-avatar-head svg {
  position: absolute;
  height: auto;
  z-index: 1;
  margin: auto;
  top: 10%;
  left: 0;
  bottom: 0;
  right: 0;
  width: 87%;
}

.readyonly-avatar-shirt svg {
  position: absolute;
  bottom: -0.0%;
  left: 0%;
  z-index: 2;
  width: 100%;
  height: auto;
}

.online-status {
  position: absolute;
  right: 0px;
  bottom: 0px;
  background-color: #49ff49;
  width: 1vh;
  height: 1vh;
  border-radius: 15px;
  z-index: 9999;
}

.is-online {
  background-color: #49ff49;
}

.is-offline {
  background-color: #9a9a9a;
}

.is-moderator, .is-spectator {
  position: absolute;
  top: 0;
  right: 0;
  width: 1vh;
  height: 1vh;
  z-index: 9999;
}

</style>
