<template>
  <div class="readyonly-player-container">
    <div class="readonly-avatar-container">
      <div class="readyonly-avatar-hair" v-html="displayedAvatar?.hair">
      </div>
      <div class="readyonly-avatar-head" v-html="displayedAvatar?.head">
      </div>
      <div class="readyonly-avatar-shirt" v-html="displayedAvatar?.shirt">
      </div>
    </div>
  </div>
</template>

<script>

import * as avatars from "@/assets/avatar/avatar-constants.ts";
import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";
import {AvatarElement} from "@/model/avatar-element";
import {
  HAIR_COLOR_PLACEHOLDER,
  SHIRT_COLOR_PLACEHOLDER,
  SKIN_COLOR_PLACEHOLDER
} from "@/assets/avatar/avatar-constants.ts";

export default {
  name: 'User',
  props: ['avatar', 'noPlayerName'],
  components: {},
  data() {
    return {
      displayedAvatar: null
    }
  },
  watch: {
    avatar: function (avatar, oldAvatar) { // watch it
      this.externalUpdate(avatar);
    }
  },
  methods: {

    findElementByTypeAndCode: function (options, code) {
      const found = options.find(o => +o.code === +code);
      return found ? found : options[0];
    },
    externalUpdate: function (updatedAvatar) {
      if (!updatedAvatar) {
        return;
      }

      const hair = this.findElementByTypeAndCode(avatars.avatarHairsOptions, updatedAvatar.hair.code);
      const head = this.findElementByTypeAndCode(avatars.avatarHeadsOptions, updatedAvatar.head.code);
      const shirt = this.findElementByTypeAndCode(avatars.avatarShirtsOptions, updatedAvatar.shirt.code);
      this.displayedAvatar = {
        hair: hair.value.replaceAll(HAIR_COLOR_PLACEHOLDER, updatedAvatar.hair.color),
        head: head.value.replaceAll(SKIN_COLOR_PLACEHOLDER, updatedAvatar.head.color),
        shirt: shirt.value.replaceAll(SHIRT_COLOR_PLACEHOLDER, updatedAvatar.shirt.color)
      }
    }
  },
  beforeMount: function () {
    if(!this.avatar) {
      return;
    }
    this.externalUpdate(this.avatar);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.readyonly-player-container {
  display: flex;
  flex-direction: column;
  margin: calc(5px + 0.25vw);
  position: relative;
  height: 6vw;
  width: 6vw;
  min-width: 70px;
  min-height: 70px;

  .host-icon {
    position: absolute;
    left: 76%;
    width: 18%;
    height: auto;
    z-index: 500;
    padding: 2%;
    background-color: #ab9ee9;
    border: 2px #8574d7 solid;
    border-radius: 10px;
    box-shadow: 2px 2px 6px #343434;
  }

  .check-icon {
    position: absolute;
    left: 76%;
    bottom: 10%;
    width: 18%;
    height: auto;
    z-index: 500;
    padding: 2%;
    background-color: #ffffff;
    border: 2px #9b87fb solid;
    border-radius: 23px;
    box-shadow: 2px 2px 6px #343434;
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
  background-color: #ab9ee9;
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

.player-name.plain {
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 4px;
  color: black;

}

.player-name {
  position: absolute;
  box-sizing: border-box;
  z-index: 9999;
  bottom: -6%;
  width: 100%;
  display: flex;
  justify-content: center;

  span {
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .player-name-text {
    display: flex;
    align-items: center;
    line-height: 9px;
    font-size: 9px;
    color: var(--primary-light-text-color);

    box-sizing: border-box;
    z-index: 9999;
    background-color: var(--primary-dark-transparent-color);
    border-radius: 23px;
    border: 2px rgba(190, 180, 233, 0.55) solid;
    padding: 2px 6px;
    text-align: center;

    &.plain {
      padding: 1px 1px;
      border-radius: 5px;
      border: none;
      background-color: white;
      color: black;
    }
  }


}

.remote-player-full-mute {
  position: absolute;
  left: -4%;
  bottom: 0%;
  width: 20%;
  height: auto;
  display: flex;
  align-items: center;
  background-color: #594a9e;
  border: 2px #594a9e solid;
  border-radius: 23px;
  box-shadow: 2px 2px 6px #343434;
  z-index: 5;

  .headphones {
    width: 100%;
    height: auto;
  }

  .headphones-mute {
    position: absolute;
    width: 100%;
    transform: rotateX(180deg);
  }
}

.remote-player-muted {
  position: absolute;
  left: -4%;
  bottom: 30%;
  width: 20%;
  height: auto;
  display: flex;
  align-items: center;
  background-color: #594a9e;
  border: 2px #594a9e solid;
  border-radius: 23px;
  box-shadow: 2px 2px 6px #343434;
  z-index: 5;

  .mic {
    width: 100%;
    height: auto;
  }

  .mic-mute {
    position: absolute;
    width: 100%;
    transform: rotateX(180deg);
  }
}


@media only screen and (max-width: 980px) {

  .player-name {
    span {
      font-family: 'Source Sans Pro', sans-serif;
      line-height: 11px;
      font-size: 11px;
    }
  }

  .readyonly-player-container {
    min-width: 70px;
    min-height: 70px;
  }
}


</style>
