<template>
    <div class="header-wrapper">
        <div class="header">
            <div>LOGO</div>
            <div class="header-btns">
                <button class="button-activate small-btn" v-if="appStore.isOnRoomRoute"
                        v-on:click="createRoomOverlay()">
                    <img src="../assets/cross.svg"> create room
                </button>
                <label :class="{ 'toggle': !checked, 'toggle change-color': checked}">
                    <input type="checkbox" v-on:click="onCheckedChange($event.target.checked)" v-bind:checked="checked">
                    <span class="slider"></span>
                    <span class="labels" data-on="EN" data-off="DE"></span>
                </label>
            </div>

            <div class="user-icon-and-menu">
                <user class="header-user" v-if="localUser" v-bind:user="localUser" v-bind:noUserName="true"
                      v-bind:noUserRoleIcon="true"
                      v-on:click="toggleUserMenu"></user>
                <user-menu v-bind:user="localUser" v-if="displayUserMenu"
                           v-on-click-outside="clickedOutside"></user-menu>
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, LANG_COOKIE_KEY} from "@/constants/vue-constants";
import User from "@/components/user.vue";
import UserMenu from "@/components/user-menu.vue";
import {vOnClickOutside} from "@vueuse/components/index";
import {englishKey, germanKey, languageService} from "@/services/language";
import {german} from "@/constants/language/de";
import {getCookie, setCookie} from "@/services/cookie-service";

export default {
    name: "HeaderVue",
    components: {UserMenu, User},
    directives: {
        onClickOutside: vOnClickOutside
    },
    created() {
        this.appStore = useAppStateStore();
        this.initLanguageSetting();
    },
    data: function () {
        return {
            isAvatarConfiguratorOpen: false,
            appStore: null,
            displayUserMenu: false,
            checked: false,
        }
    },
    methods: {
        initLanguageSetting() {
            let langKey = getCookie(LANG_COOKIE_KEY);
            if (!langKey) {
                langKey = germanKey;
                setCookie(LANG_COOKIE_KEY, langKey);
            }
            this.checked = langKey === englishKey;
            this.appStore.setLangKey(langKey);
        },
        onCheckedChange(nextChecked) {
            this.checked = nextChecked;
            const langKey = nextChecked ? englishKey : germanKey;
            setCookie(LANG_COOKIE_KEY, langKey);
            this.appStore.setLangKey(langKey);
        },
        clickedOutside() {
            this.displayUserMenu = null;
        },
        createRoomOverlay() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.CREATE_ROOM);
        },
        toggleUserMenu: function () {
            this.displayUserMenu = !this.displayUserMenu;
        }
    },
    computed: {
        localUserId() {
            return this.appStore.localUserId;
        },
        localUser() {
            return this.appStore.room && this.localUserId ? this.appStore.room.users.find(u => u.id === this.localUserId) : null;
        }
    }
};
</script>

<style lang="scss">

.header-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #ebebeb;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  height: 60px;
}

.header {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  justify-content: space-between;
  max-width: 1400px;

  .header-btns {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: flex-end;
    margin: 0 25px;
  }
}

.user-icon-and-menu {

  .user-menu {
    background-color: #9f92e4;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 45px;
    right: 25px;
    z-index: 5;

    .user-menu-header {
      min-width: 150px;
      min-height: 30px;
    }
  }
}

.toggle {
  --width: 60px;
  --height: 30px;
  position: relative;
  display: inline-block;
  width: var(--width);
  height: var(--height);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  cursor: pointer;
  background-color: var(--primary-color);
}


.toggle input {
  display: none;
}

.toggle .slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  transition: all 0.4s ease-in-out;
}

.toggle .slider::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 4px;
  width: calc(var(--height) / 1.4);
  height: calc(var(--height) / 1.4);
  border-radius: calc(var(--height) / 8);
  background-color: #fff;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease-in-out;
}

.toggle input:checked + .slider {
  background-color: #a0c7db;
}

.toggle input:checked + .slider::before {
  transform: translateX(calc(var(--width) - var(--height)));
}

.toggle .labels {
  position: absolute;
  top: 5px;
  left: -1px;
  width: 100%;
  height: 100%;
  font-size: 12px;
  font-family: sans-serif;
  transition: all 0.4s ease-in-out;
  overflow: hidden;
}

.toggle .labels::after {
  content: attr(data-off);
  position: absolute;
  right: 4px;
  top: 4px;
  font-weight: bold;
  opacity: 1;
  transition: all 0.4s ease-in-out;
  color: #fff;
}

.toggle .labels::before {
  content: attr(data-on);
  position: absolute;
  top: 4px;
  left: calc(var(--height) - var(--width) + 6px);
  color: #ffffff;
  opacity: 0;
  transition: all 0.4s ease-in-out;
  font-weight: bold;
}

.toggle input:checked ~ .labels::after {
  opacity: 0;
  transform: translateX(calc(var(--width) - var(--height)));
}

.toggle input:checked ~ .labels::before {
  opacity: 1;
  transform: translateX(calc(var(--width) - var(--height)));
}


</style>
