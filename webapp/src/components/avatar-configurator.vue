<template>
    <div class="avatar-configurator-wrapper">
        <div v-on:click="closeOverlay" class="close-btn"><img src="../assets/close.svg"></div>

        <div class="avatar-configurator-input-elem-container" style="width:50%;">
            <input type=text v-model="editedUserName" placeholder="Dein Benutzername" spellcheck="false">
            <span v-if="userNameTooLong" class="validation-message">{{ tl8('validation.text.user.name') }}</span>
        </div>
        <div class="avatar-needles">
            <button title="random avatar" class="random-avatar-button"
                    v-if="!disabled"
                    v-on:click="generateRandomAvatar">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="28.314" viewBox="0 0 30 28.314">
                    <g id="Gruppe_3" data-name="Gruppe 3" transform="translate(-0.386 -3.539)">
                        <path id="Pfad_19" data-name="Pfad 19"
                              d="M6.8,4.926,18.245-.448l9.534,1.656-7.914,9.644L3.337,8.975Z"
                              transform="translate(2.386 21)" fill="#040404" opacity="0.18"/>
                        <path id="Pfad_17" data-name="Pfad 17" d="M-5.594-2.063,10.553-.284l4.74,14.992L-.741,12.558Z"
                              transform="translate(6.001 15.554)" fill="#b8b7b7"/>
                        <path id="Pfad_16" data-name="Pfad 16" d="M8.8-.939l3.686,14.191L3.32,25.276-1.534,10.111Z"
                              transform="translate(17.9 5.031)" fill="#d9d9d9"/>
                        <path id="Pfad_18" data-name="Pfad 18" d="M2.851-1.461l15.864.554L8.417,10.4-7.614,8.536Z"
                              transform="translate(8 5)" fill="#fff"/>
                        <ellipse id="Ellipse_14" data-name="Ellipse 14" cx="1.059" cy="1.588" rx="1.059" ry="1.588"
                                 transform="matrix(0.643, 0.766, -0.766, 0.643, 14.025, 7.988)"/>
                        <ellipse id="Ellipse_15" data-name="Ellipse 15" cx="1.059" cy="1.588" rx="1.059" ry="1.588"
                                 transform="translate(19.964 16.108) rotate(-18)"/>
                        <ellipse id="Ellipse_18" data-name="Ellipse 18" cx="1.059" cy="1.588" rx="1.059" ry="1.588"
                                 transform="translate(9.249 21.293) rotate(-18)"/>
                        <ellipse id="Ellipse_19" data-name="Ellipse 19" cx="1.059" cy="1.588" rx="1.059" ry="1.588"
                                 transform="translate(12.244 17.617) rotate(-18)"/>
                        <ellipse id="Ellipse_17" data-name="Ellipse 17" cx="1.059" cy="1.588" rx="1.059" ry="1.588"
                                 transform="translate(5.853 24.469) rotate(-18)"/>
                        <ellipse id="Ellipse_16" data-name="Ellipse 16" cx="1.059" cy="1.588" rx="1.059" ry="1.588"
                                 transform="translate(26.317 16.062) rotate(-18)"/>
                    </g>
                </svg>
            </button>
            <div class="hair-needle"
                 :class=" {'activated': editingAvatarElementType === 'hair'}"
                 v-if="!disabled"
                 title="Choose Hair Style"
                 v-on:click="onChangeEditAvatar('hair')">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 117.416 101.95">
                    <line id="Line_1" data-name="Line 1" y1="76.837" x2="90.893" transform="translate(0.968 23.967)"
                          fill="none" stroke="#fff" stroke-width="3"/>
                    <circle id="Ellipse_15" data-name="Ellipse 15" cx="17" cy="17" r="17" transform="translate(83.416)"
                            fill="#fff"/>
                </svg>
            </div>

            <div class="hairtext needle-text"
                 title="Choose Hair Style"
                 :class="{'activated': editingAvatarElementType === 'hair'}"
                 v-if="!disabled"
                 v-on:click="onChangeEditAvatar('hair')">
              {{ tl8('avatar.configurator.hair') }}
            </div>

            <div class="head-needle"
                 :class=" {'activated': editingAvatarElementType === 'head'}"
                 v-if="!disabled"
                 title="Choose Head Style"
                 v-on:click="onChangeEditAvatar('head')">
                <svg xmlns="http://www.w3.org/2000/svg" width="175.125" height="20" viewBox="0 0 175.125 34">
                    <circle id="Ellipse_10" data-name="Ellipse 10" cx="17" cy="17" r="17" transform="translate(141.125)"
                            fill="#fff"/>
                    <line id="Line_3" data-name="Line 3" x2="157.422" transform="translate(0 16.416)" fill="none"
                          stroke="#fff" stroke-width="3"/>
                </svg>
            </div>
            <div class="headtext needle-text" :class=" {'activated': editingAvatarElementType === 'head'}"
                 v-if="!disabled"
                 title="Choose Head Style"
                 v-on:click="onChangeEditAvatar('head')">
              {{ tl8('avatar.configurator.face') }}
            </div>

            <div class="shirt-needle"
                 :class=" {'activated': editingAvatarElementType === 'shirt'}"
                 v-if="!disabled"
                 title="Choose Shirt Style"
                 v-on:click="onChangeEditAvatar('shirt')">
                <svg xmlns="http://www.w3.org/2000/svg" width="175.125" height="20" viewBox="0 0 175.125 34">
                    <circle id="Ellipse_10" data-name="Ellipse 10" cx="17" cy="17" r="17" transform="translate(141.125)"
                            fill="#fff"/>
                    <line id="Line_3" data-name="Line 3" x2="157.422" transform="translate(0 16.416)" fill="none"
                          stroke="#fff" stroke-width="3"/>
                </svg>
            </div>
            <div class="shirttext needle-text"
                 title="Choose Shirt Style"
                 :class=" {'activated': editingAvatarElementType === 'shirt'}"
                 v-if="!disabled"
                 v-on:click="onChangeEditAvatar('shirt')">{{ tl8('avatar.configurator.shirt') }}
            </div>
            <div class="avatar-container">
                <div class="avatar-hair" v-html="selectedHairReplaced">
                </div>
                <div class="avatar-head" v-html="selectedHeadReplaced">
                </div>
                <div class="avatar-shirt" v-html="selectedShirtReplaced">
                </div>
            </div>
        </div>


        <div class="selectors-wrapper">
            <avatar-element-slide-selector v-if="editingAvatarElementType === 'hair'"
                                           v-bind:options="hairOptions"
                                           v-bind:selection="selectedHair"
                                           v-on:avatarElementChange="updateAvatarHair($event)"></avatar-element-slide-selector>

            <avatar-element-slide-selector v-if="editingAvatarElementType === 'head'"
                                           v-bind:options="headsOptions"
                                           v-bind:selection="selectedHead"
                                           v-on:avatarElementChange="updateAvatarHead($event)"></avatar-element-slide-selector>

            <avatar-element-slide-selector v-if="editingAvatarElementType === 'shirt'"
                                           v-bind:options="shirtOptions"
                                           v-bind:selection="selectedShirt"
                                           v-on:avatarElementChange="updateAvatarShirt($event)"></avatar-element-slide-selector>

            <avatar-color-carousel-selector v-if="editingAvatarElementType"
                                            v-bind:options="colorOptions"
                                            v-bind:selection="selectedColor"
                                            v-on:colorElementChange="onAvatarColorSelectionChange($event)"></avatar-color-carousel-selector>
            <button class="button-activate"
                    title="save avatar changes"
                    v-if="!!editingAvatarElementType"
                    :disabled="!isInputValid"
                    v-on:click="onDone()">{{ tl8('room.settings.save') }}
            </button>
        </div>
    </div>

</template>

<script>
import * as avatars from "@/assets/avatar/avatar-constants.ts";
import AvatarElementSlideSelector from "@/components/avatar-element-slide-selector";
import {WTFAIAvatar} from "@/model/w-t-f-a-i-avatar";
import {AvatarElement} from "@/model/avatar-element";
import AvatarColorCarouselSelector from "@/components/avatar-color-carousel-selector";
import {
    HAIR_COLOR_PLACEHOLDER,
    SHIRT_COLOR_PLACEHOLDER,
    SKIN_COLOR_PLACEHOLDER
} from "@/assets/avatar/avatar-constants.ts";
import {DISPLAY_OVERLAY_STATE, RequestMessageType} from "@/constants/vue-constants";
import {useAppStateStore} from "@/stores/app-state";
import {languageService} from "@/services/language";


export default {
    name: 'AvatarConfigurator',
    components: {AvatarColorCarouselSelector, AvatarElementSlideSelector},
    props: ['userName', 'avatar', 'disabled', 'isReady'],
    data() {
        return {
            appStore: null,
            avatars: avatars,
            selectedHair: null,
            selectedHairColor: null,
            selectedHead: null,
            selectedHeadColor: null,
            selectedShirt: null,
            selectedShirtColor: null,
            editingAvatarElementType: 'hair',
            hairOptions: [...avatars.avatarHairsOptions],
            headsOptions: [...avatars.avatarHeadsOptions],
            shirtOptions: [...avatars.avatarShirtsOptions],
            colorOptions: [...avatars.colorOptions],
            editedAvatar: null,
            updatedAvatar: null,
            editedUserName: ''
        }
    },
    methods: {
        tl8(key) {
          return languageService.t(key, this.appStore.langKey);
        },
        closeOverlay: function () {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY)
        },
        generateRandomAvatar: function () {
            const randomAvatar = this.$appService.getRandomAvatar();
            this.editedAvatar = randomAvatar;
            this.externalUpdate(this.editedAvatar);
            this.updatedAvatar = this.onAvatarChange();
        },
        findElementByCode: function (options, code) {
            return options.find(o => +o.code === +code);
        },
        onChangeEditAvatar: function (value) {
            this.editingAvatarElementType = value;
            this.$emit('onToggleSelectorsHidden', value);
        },
        onAvatarChange: function () {
            return new WTFAIAvatar({
                hair: new AvatarElement({
                    type: this.selectedHair.type,
                    code: this.selectedHair.code,
                    color: this.selectedHairColor
                }),
                head: new AvatarElement({
                    type: this.selectedHead.type,
                    code: this.selectedHead.code,
                    color: this.selectedHeadColor
                }),
                shirt: new AvatarElement({
                    type: this.selectedShirt.type,
                    code: this.selectedShirt.code,
                    color: this.selectedShirtColor
                })
            });
        },
        sendAvatarUpdateToServer: function (requestData) {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_USER, requestData);
        },
        onDone: function () {
            const requestData = {avatar: null, userName: null};
            if (this.hasValidAvatarChange) {
                requestData.avatar = this.onAvatarChange();
            }
            if(this.isValidUserNameChange){
                requestData.userName = this.editedUserName;
            }
            this.sendAvatarUpdateToServer(requestData);
        },
        updateAvatarHair(value) {
            this.selectedHair = value;
            this.updatedAvatar = this.onAvatarChange();
        },
        updateAvatarHead(value) {
            this.selectedHead = value;
            this.updatedAvatar = this.onAvatarChange();
        },
        updateAvatarShirt(value) {
            this.selectedShirt = value;
            this.updatedAvatar = this.onAvatarChange();
        },
        onAvatarColorSelectionChange: function (value) {
            if (this.editingAvatarElementType === 'hair') {
                this.selectedHairColor = value;
            }

            if (this.editingAvatarElementType === 'head') {
                this.selectedHeadColor = value;
            }

            if (this.editingAvatarElementType === 'shirt') {
                this.selectedShirtColor = value;
            }
            this.updatedAvatar = this.onAvatarChange();
        },
        externalUpdate(avatar) {
            this.selectedHairColor = avatar.hair.color;
            this.selectedHeadColor = avatar.head.color;
            this.selectedShirtColor = avatar.shirt.color;
            this.selectedHair = this.findElementByCode(this.hairOptions, avatar.hair.code);
            this.selectedHead = this.findElementByCode(this.headsOptions, avatar.head.code);
            this.selectedShirt = this.findElementByCode(this.shirtOptions, avatar.shirt.code);
        }
    },
    watch: {
        avatar: function (avatar, oldAvatar) {
            if (oldAvatar) {
                this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
                return;
            }
            this.editedAvatar = {...avatar};
            this.externalUpdate(this.editedAvatar);
            this.updatedAvatar = this.onAvatarChange();
        },
        userName(nextUserName, previousUserName) {
            this.editedUserName = nextUserName;
        }
    },
    beforeMount: function () {
        this.appStore = useAppStateStore();
        this.externalUpdate(this.avatar);
        this.updatedAvatar = this.onAvatarChange();
        this.editedUserName = this.userName;
    },
    computed: {
        selectedHairReplaced: function () {
            return this.selectedHair?.value?.replaceAll(HAIR_COLOR_PLACEHOLDER, this.selectedHairColor)
        }
        ,
        selectedHeadReplaced: function () {
            return this.selectedHead?.value?.replaceAll(SKIN_COLOR_PLACEHOLDER, this.selectedHeadColor)
        }
        ,
        selectedShirtReplaced: function () {
            return this.selectedShirt?.value?.replaceAll(SHIRT_COLOR_PLACEHOLDER, this.selectedShirtColor)
        }
        ,
        selectedColor: function () {
            if (this.editingAvatarElementType === 'hair') {
                return this.selectedHairColor;
            }

            if (this.editingAvatarElementType === 'head') {
                return this.selectedHeadColor;
            }

            if (this.editingAvatarElementType === 'shirt') {
                return this.selectedShirtColor;
            }
            return '';
        },
        hasValidAvatarChange() {
            return this.updatedAvatar && (this.avatar.hair.code !== this.updatedAvatar.hair.code
                || this.avatar.head.code !== this.updatedAvatar.head.code
                || this.avatar.shirt.code !== this.updatedAvatar.shirt.code
                || this.avatar.hair.color !== this.updatedAvatar.hair.color
                || this.avatar.head.color !== this.updatedAvatar.head.color
                || this.avatar.shirt.color !== this.updatedAvatar.shirt.color)
        },
        isValidUserNameChange() {
            return this.editedUserName !== this.userName && !this.userNameTooLong && this.editedUserName.length > 1;
        },
        isInputValid() {
            return this.hasValidAvatarChange ||
                this.isValidUserNameChange;
        },
        userNameTooLong() {
            return this.editedUserName.length > 25;
        }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

@media only screen and (max-width: 980px) {
  .avatar-container {
    height: 150px !important;
    width: 150px !important;
    border-radius: 100px !important;
  }

  .needle-text {
    font-size: 11px !important;
  }
}

.avatar-configurator-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 25px;
  width: 30vw;


}

.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  height: min(20vw, 30vh);
  width: min(20vw, 30vh);
  max-width: 400px;
  max-height: 400px;
  background-color: #e0f2ff;
  border-radius: 50%;
  box-shadow: rgb(0 0 0 / 50%) 1.95px 3.95px 3.6px;
  margin-top: 25px;
  margin-bottom: 10px;
  overflow: hidden;
}

.avatar-needles {
  position: relative;
  display: flex;
}

.avatar-hair {
  z-index: 20;
  width: 100%;
}

.avatar-head {
  z-index: 18;
  width: 100%;
}

.avatar-shirt {
  z-index: 19;
  width: 100%;
}

.avatar-hair svg {
  position: absolute;
  top: 3.5%;
  width: 100%;
  height: auto;
  z-index: 2;
}

.avatar-head svg {
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

.avatar-shirt svg {
  position: absolute;
  bottom: -0.0%;
  left: 0%;
  z-index: 2;
  width: 100%;
  height: auto;
}

.name-field {
  background-color: var(--primary-dark-transparent-color);
  border-radius: 23px;
  border: 4px rgba(190, 180, 233, 0.55) solid;
  font-family: bungee;
  max-width: 20vw;
  min-width: 220px;
  color: var(--primary-light-text-color);
  font-size: calc(13px + 0.75vw);
  line-height: calc(13px + 0.75vw);
  text-align: center;
  margin-bottom: 1vh;
  padding: 0;
  height: 28px;
}

.hair-needle {
  z-index: 5001;

}

.hair-needle svg {
  position: absolute;
  right: 7%;
  width: 25%;
  height: auto;
}

.head-needle {
  z-index: 5001;
}

.head-needle svg {
  position: absolute;
  right: -20%;
  bottom: 55%;
  width: 64%;
  height: auto;
}

.shirt-needle {
  z-index: 5001;
}


.shirt-needle svg {
  position: absolute;
  right: -15%;
  bottom: 11%;
  width: 64%;
  height: auto;
}

.needle-text {
  position: absolute;
  font-size: 15px;
  line-height: 15px;
}

.hairtext {
  left: 95%;
  top: 2%;
}

.headtext {
  left: 100%;
  top: 32%;
}

.shirttext {
  left: 100%;
  bottom: 19%;
}

.random-avatar-button {
  background: var(--primary-color);
  outline: transparent;
  border: transparent;
  position: absolute;
  bottom: 10%;
  left: 10%;
  z-index: 25000;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  width: calc(25px + 2vw);
  height: calc(25px + 2vw);
  border-radius: 35px;
  box-shadow: rgb(0 0 0 / 50%) 2.95px 4.95px 3.6px;
  display: flex;
  align-items: center;

  svg {
    width: 100%;
    height: auto;
    z-index: 99999;
  }
}

.random-avatar-button:hover {
  transition: transform 0s;
  transform: scale(1.05);
}

.random-avatar-button:active {
  transition: transform 0s;
  transform: scale(0.9);
}

.activated {
  color: blue !important;
}

.activated svg line, .activated svg circle {
  fill: blue;
  stroke: blue;
}

.selectors-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
