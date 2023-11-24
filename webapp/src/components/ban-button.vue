<template>
  <div class="ban-button-wrapper">
    <img @click="triggerBanConfirmation()" title="kick" v-if="displayKickIcon" class="kick-icon"
         :src="require(`../assets/vote_on_ban.svg`)">
    <div class="overlay-background" v-if="overlayActivated">
      <span>kick ?</span>
      <div class="ban-button-confirm-panel">
        <button class="plain-btn" @click="confirmBan()">
          <img title="yes" class="yes-icon" :src="require(`../assets/check-white.svg`)">
        </button>
        <button class="plain-btn" @click="abortBan()">
          <img title="no" class="no-icon" :src="require(`../assets/no-white.svg`)">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {AuthenticatedRequest} from "../model/authenticated-request.model";
import {RequestMessageType} from "../constants/vue-constants";

export default {
  name: "BanButton",
  props: ['player', 'displayKickIcon'],
  data() {
    return {
      overlayActivated: false,
    };
  },
  methods: {
    triggerBanConfirmation: function () {
      this.overlayActivated = true;
    },
    confirmBan: function () {
      const banPlayerRequest = new AuthenticatedRequest({
        type: RequestMessageType.KICK_PLAYER,
        playerAuthentication: this.$store.state.playerAuthentication,
        gameSessionId: this.$store.state.gameSessionId,
        data: this.player.id,
      });
      this.$websocketService.sendMessage(banPlayerRequest);
      this.overlayActivated = false;
    },
    abortBan: function () {
      this.overlayActivated = false;
    },
  },
};
</script>
<style scoped lang="scss">
.ban-button-wrapper {
  position: absolute;
  left: 76%;
  top: 0%;
  width: max-content;
  height: auto;
  z-index: 5000;
}

.overlay-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ab9ee9;
  width: 90px;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  border: 2px #8574d7 solid;
  border-radius: 8px;
  padding: 6px;

  span {
    font-size: 15px;
    line-height: 15px;
    margin-bottom: 4px;
  }

  .ban-button-confirm-panel {
    display: flex;
  }
}

.kick-icon {
  min-width: 18px;
  width: 1.5vw;
  height: auto;
  z-index: 10000;
  padding: 2px;
  background-color: #ab9ee9;
  border: 2px #8574d7 solid;
  border-radius: 10px;
  box-shadow: 2px 2px 6px #343434;
  cursor: pointer;
}

.yes-icon {
  width: 22px;
  margin: 0px 12px;
}

.no-icon {
  width: 18px;
  margin: 0px 12px;
}
</style>
