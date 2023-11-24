<template>
  <div class="landing-page-wrapper">
    <div class="horizontal-app-title">
      <span class="who">WHO </span>
      <span class="the">THE </span>
      <span class="fuck">F*CK </span>
      <span class="am">AM </span>
      <span class="_i">I </span>
      <span class="_questionmark">?</span>
    </div>
    <div class="landing-page-content">
      <div class="middle-section">
        <avatar-configurator v-if="globalPlayerCookie"
                             v-bind:globalPlayerCookie="globalPlayerCookie"
                             v-bind:disabled="false"
                             v-on:onToggleSelectorsHidden="avatarConfiguratorToggle"
                             v-on:onChangeGlobalPlayerCookie="onAvatarConfiguratorChange($event)"></avatar-configurator>
        <button :disabled="!isConnected" :class="{'disabled': !isConnected}"
                class="main-button m-1vw-v create-button" v-if="!avatarConfiguratorActive"
                v-on:click="requestCreateGame()"><img src="../assets/create-game-icon-colored.svg" alt="create game">
          create game
        </button>
      </div>
      <div class="rules-wrapper">
        <div class="rules-heading">
          <span>game instructions</span>
        </div>
        <div class="rules-video">
          <video ref='instructionVideo' src="../assets/instructionsVideo.webm" muted autoplay loop>
          </video>
        </div>
      </div>
    </div>
    <div class="footer">
      <button class=" footer-elem" v-on:click="openOverlay('Impressum')">Impressum</button>
      <span>|</span>
      <button class=" footer-elem" v-on:click="openOverlay('TermsOfUse')">Terms of use</button>
      <span>|</span>
      <button class=" footer-elem" v-on:click="openOverlay('DsgvoCookie')">Privacy Settings</button>
      <span>|</span>
      <div class=" footer-elem">
        <a class="" href="https://www.curview.net" target="_blank"> Curview </a>
      </div>
      <span>|</span>
      <div class="footer-elem disabled-shy">
        © Section 9 {{ currentYear }}
      </div>
    </div>
  </div>
</template>

<script>
import AvatarConfigurator from "@/components/avatar-configurator";
import {GlobalPlayerCookie} from "../model/global-player-cookie.model";
import {setCookie} from "@/services/cookie-service";
import {ConnectionState} from "@/services/websocket-service";


export default {
  name: 'LandingPage',
  components: {AvatarConfigurator},
  mounted(){
      const instructionVideo = this.$refs.instructionVideo;
      instructionVideo.playbackRate = 0.75;
    },
  data() {
    return {
      avatarConfiguratorActive: false,
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    requestCreateGame: function () {
      const createGameMessage = {
        type: 'creategame',
        data: new GlobalPlayerCookie(this.globalPlayerCookie)
      }
      this.$websocketService.sendMessage(createGameMessage);
    },
    avatarConfiguratorToggle: function (value) {
      this.avatarConfiguratorActive = !!value;
    },
    onAvatarConfiguratorChange: function (glbCookieUpdate) {
      setCookie('wtfi_globalPlayer', JSON.stringify(glbCookieUpdate));
      this.$store.commit('updateGlobalCookie', glbCookieUpdate);
    },
    openOverlay: function (id) {
      this.$store.commit('updateDisplayedOverlayId', id)
    }
  },
  computed: {
    globalPlayerCookie: function () {
      return this.$store.state.globalPlayerCookie;
    },
    isConnected: function () {
      return this.$store.state.connectionState === ConnectionState.CONNECTED;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@media only screen and (max-aspect-ratio: 1/1) {
  .landing-page-content {
    grid-template-rows: 0.25fr 1fr !important;
    grid-template-columns: 100% !important;
  }

  .landing-page-wrapper {
    border: none !important;
    box-shadow: unset !important;
    overflow-y: auto !important;
    width: 98% !important;
    margin: 0px !important;
  }

  .rules-wrapper {
    min-height: min-content !important;
    width: 95% !important;
    box-sizing: border-box !important;
    justify-self: center !important;
  }

  .rules-video {
    font-size: 15px !important;
  }

  .logo-wrapper svg {
    display: none !important;
  }

}


@media only screen and (min-width: 800px) and (max-width: 1600px) and (min-height: 800px) {
  .rules-wrapper {
    width: max(275px, 30vh) !important;
  }
}




.landing-page-wrapper {
  position: relative;
  display: flex;
  max-width: 1800px;
  flex-direction: column;
  align-items: center;
  background: #0000001c;
  border-radius: 12px;
  padding: 0.5vw;
  margin: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 80%;

  --text-primary-color: #9c8de2; // #9c8de2;
  --text-secondary-color: white; //#9c8de2;

  .horizontal-app-title {
    margin: min(max(5px, 3vh), 15px);
    position: relative;
    display: flex;
    font-weight: bolder;
    // width: min(max(300px, 25vw), 500px);

    text-shadow: 4px 4px 4px black;

    .who {
      font-size: min(max(35px, 7vw), 55px);
      line-height: min(max(35px, 7vw), 55px);
      color: var(--text-primary-color);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--text-secondary-color);
      z-index: 0;
      transform: rotate(2deg);
      letter-spacing: -2px;

    }

    .the {
      font-size: min(max(23px, 4vw), 38px);
      line-height: min(max(23px, 4vw), 38px);
      color: var(--text-primary-color);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--text-secondary-color);
      z-index: 2;
      transform: rotate(-10deg);
      letter-spacing: -3px;
      margin-top: 15px;
      margin-left: -5px;
    }

    .fuck {
      font-size: min(max(35px, 7vw), 55px);
      line-height: min(max(35px, 7vw), 55px);
      color: var(--text-primary-color);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--text-secondary-color);
      margin-left: -3px;
      margin-top: -5px;
      transform: rotate(-3deg);
      z-index: 0;
      letter-spacing: -3px;
    }

    .am {
      font-size: min(max(23px, 4vw), 38px);
      line-height: min(max(23px, 4vw), 38px);
      color: var(--text-primary-color);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--text-secondary-color);
      margin-left: -8px;
      margin-top: 10px;
      z-index: 2;
      transform: rotate(12deg);
      letter-spacing: -2px;
    }

    ._i {
      font-size: min(max(35px, 7vw), 55px);
      line-height: min(max(35px, 7vw), 55px);
      color: var(--text-primary-color);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--text-secondary-color);
      margin-left: -6px;
      z-index: 3;
      transform: rotate(-9deg);
    }

    ._questionmark {
      font-size: min(max(55px, 8vw), 77px);
      line-height: min(max(35px, 7vw), 55px);
      color: var(--text-primary-color);
      -webkit-text-stroke-width: 2px;
      -webkit-text-stroke-color: var(--text-secondary-color);
      transform: rotate(8deg);

    }

  }

}

.landing-page-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3vw;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.rules-wrapper {
  padding: 15px;
  width: 55vh;
  border-radius: 20px;
  background-color: var(--primary-dark-transparent-color);


}

.rules-heading {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: min(max(17px, 2.2vw), 25px);
  line-height: min(max(17px, 2.2vw), 25px);
  text-shadow: 3px 2px 1px #2e2e2e;
  color: var(--highlight-color);
  margin-bottom: 15px;
}

.rules-video {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: normal;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  video {
    width: 100%;
    height: auto;
    border-radius: min(max(6px, 0.65vw), 11px);
  }

}

.rules-video ol {
  margin: 0;
}

.rules-video li {
  padding: 5px 10px;
}

.middle-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.create-button {
  font-size: 22px;
  line-height: 22px;

  img {
    width: 45px;
    height: auto;
    margin-right: 10px;
  }
}

.footer {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 333333;
  font-family: 'Source Sans Pro', sans-serif !important;

  .footer-elem, span {
    text-decoration: none;
    background: transparent;
    border: none;

    font-family: 'Source Sans Pro', sans-serif !important;
    font-size: calc(15px + 0.4vw) !important;
    color: #ffffff9c !important;
    padding: 0 3px !important;
    font-weight: bolder;

    a {
      text-decoration: none;
      color: #ffffff9c;
    }

    &:not(.disabled-shy):hover {
      transform: scale(1.05);
    }

    &:not(.disabled-shy):active {
      transform: scale(0.95);
    }
  }

  span {
    margin: 0 4px;
  }

  @media only screen and (max-aspect-ratio: 1/1) {
      display: none !important;
  }
}

</style>
