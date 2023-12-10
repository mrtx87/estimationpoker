<template>
    <div class="user-wrapper" :class="{'no-user-name':noUserName}"
         :title="user ? user.name + ' - ' + user.roles.join(',') : ''">
        <div class="readyonly-player-container" :class="{clickable: isLocalUserInstance}"
             v-on:dblclick="openAvatarEditor">
            <div class="readonly-avatar-container">
                <div class="readyonly-avatar-hair" v-html="displayedAvatar?.hair">
                </div>
                <div class="readyonly-avatar-head" v-html="displayedAvatar?.head">
                </div>
                <div class="readyonly-avatar-shirt" v-html="displayedAvatar?.shirt">
                </div>
            </div>
            <div class="role-icon-container bottom-left" v-if="isModerator(user) && !noUserRoleIcon">
                <img :src="require('../assets/crown2.svg')"
                     class="is-moderator">
            </div>
            <div class="role-icon-container bottom-right" v-if="isObserver(user) && !noUserRoleIcon">
                <img :src="require('../assets/eye.svg')" class="is-observer">
            </div>
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
import {DISPLAY_OVERLAY_STATE, Roles} from "@/constants/vue-constants";

export default {
    name: 'User',
    props: ['noUserName', 'user', 'noUserRoleIcon'],
    components: {},
    created() {
        this.appStore = useAppStateStore();
    },
    data() {
        return {
            displayedAvatar: null,
            appStore: null
        }
    },
    watch: {
        user: function (user, oldUser) { // watch it
            this.externalUpdate(user.avatar);
        }
    },
    methods: {
        openAvatarEditor() {
            if (this.isLocalUserInstance) {
                this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.AVATAR_EDITOR)
            }
        },
        isModerator(user) {
            return user && user.roles.includes(Roles.MODERATOR)
        },
        isObserver(user) {
            return user && user.roles.includes(Roles.OBSERVER)
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
        DISPLAY_OVERLAY_STATE() {
            return DISPLAY_OVERLAY_STATE
        },
        room() {
            return this.appStore.room;
        },
        isLocalUserInstance() {
            return this.appStore.localUser && this.user && this.appStore.localUser.id === this.user.id;
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
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  color: black;
  width: 100%;

  user-select: none;

  &.no-user-name {
    width: min-content;
  }
}

.poker-area-user {
  max-width: 80px;

  .readyonly-player-container {
    width: 80px;
    aspect-ratio: 1/1;
  }
}

.header-user {
  max-width: 65px;

  .readyonly-player-container {
    width: 65px;
    aspect-ratio: 1/1;
  }
}

.readyonly-player-container {
  display: flex;
  margin: 0.5vh;
  position: relative;
  min-width: 35px;
  min-height: 35px;

  &.clickable {
    cursor: pointer;
  }
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

.role-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  z-index: 5;
  aspect-ratio: 1/1;
  background-color: blue;
  padding: 4px;
  box-sizing: border-box;
  width: 30%;


  &.bottom-left {
    bottom: 0;
    left: 0;
  }

  &.bottom-right {
    bottom: 0;
    right: 0;
  }

  .is-moderator, .is-observer {
    width: 100%;
    aspect-ratio: 1/1;
    box-sizing: border-box;
  }
}

.user-name {
  text-align: center;
}


@media only screen and (max-width: 775px) {

  .poker-area-user {
    .readyonly-player-container {
      width: 60px;
      aspect-ratio: 1/1;
    }
  }

  .user-name {
        font-size: 14px !important;
  }
}


</style>
