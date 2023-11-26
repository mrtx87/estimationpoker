 <template>
    <div class="avatar-configurator-wrapper">
        <input id="avatarConfigInputId" :disabled="disabled" class="name-field" :value="globalPlayerCookie.name"
               v-on:change="updatePlayerName($event.target.value)" maxlength="15">
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
                Hair
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
                Face
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
                 v-on:click="onChangeEditAvatar('shirt')">shirt
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
            <button class="main-button"
                    title="save avatar changes"
                    v-if="!!editingAvatarElementType"
                    v-on:click="onDone()">I'M DONE
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
    import {getRandomAvatar} from "@/services/cookie-service";


    export default {
        name: 'AvatarConfigurator',
        components: {AvatarColorCarouselSelector, AvatarElementSlideSelector},
        props: ['globalPlayerCookie', 'disabled', 'isReady'],
        data() {
            return {
                avatars: avatars,
                selectedHair: null,
                selectedHairColor: null,
                selectedHead: null,
                selectedHeadColor: null,
                selectedShirt: null,
                selectedShirtColor: null,
                selectPlayerLang: '',
                editingAvatarElementType: 'hair',
                hairOptions: [...avatars.avatarHairsOptions],
                headsOptions: [...avatars.avatarHeadsOptions],
                shirtOptions: [...avatars.avatarShirtsOptions],
                colorOptions: [...avatars.colorOptions],
                animateOutRunning: false
            }
        },
        methods: {
            generateRandomAvatar: function () {
                const randomAvatar = getRandomAvatar(
                    this.headsOptions.length,
                    this.hairOptions.length,
                    this.shirtOptions.length,
                    this.colorOptions);
                this.updateAvatarAndPlayerCookie(randomAvatar);
            },
            findElementByCode: function (options, code) {
                return options.find(o => +o.code === +code);
            },
            onChangeEditAvatar: function (value) {
                this.editingAvatarElementType = value;
                this.$emit('onToggleSelectorsHidden', value);
            },
            onAvatarChange: function () {
                const avatar = new WTFAIAvatar({
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
                this.updateAvatarAndPlayerCookie(avatar);
            },
            updateAvatarAndPlayerCookie: function (newAvatar) {
                const updatePlayerCookie = {
                    ...this.globalPlayerCookie, avatar: newAvatar
                };
                this.$emit('onChangeGlobalPlayerCookie', updatePlayerCookie);
            },
            onDone: function () {
                this.animateOutRunning = true;
                this.$emit('onToggleSelectorsHidden', null);
                this.onAvatarChange();
            },
            updateAvatarHair(value) {
                const player = this.$store.state.player;
                this.selectedHair = value;
            },
            updateAvatarHead(value) {
                const player = this.$store.state.player;
                this.selectedHead = value;
            },
            updateAvatarShirt(value) {
                const player = this.$store.state.player;
                this.selectedShirt = value;
            },
            updatePlayerName: function (value) {
                if (value.length >= 1 && value.length <= 15) {
                    const updatePlayerCookie = {...this.globalPlayerCookie, name: value};
                    this.$emit('onChangeGlobalPlayerCookie', updatePlayerCookie);
                }
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
            },
            onAnimationEnd: function () {
                if (this.animateOutRunning) {
                    this.editingAvatarElementType = null;
                    this.animateOutRunning = false;
                }
            },
            externalUpdate(newCookie) {
                const cookie = newCookie;
                this.selectPlayerLang = cookie.language;
                this.selectedHairColor = cookie.avatar.hair.color;
                this.selectedHeadColor = cookie.avatar.head.color;
                this.selectedShirtColor = cookie.avatar.shirt.color;
                this.selectedHair = this.findElementByCode(this.hairOptions, cookie.avatar.hair.code);
                this.selectedHead = this.findElementByCode(this.headsOptions, cookie.avatar.head.code);
                this.selectedShirt = this.findElementByCode(this.shirtOptions, cookie.avatar.shirt.code);
            },
            avatarHasChanged: function (newCookie, oldCookie) {
                return !newCookie || !oldCookie ||
                newCookie.avatar.hair.color !== oldCookie.avatar.hair.color ||
                newCookie.avatar.head.color !== oldCookie.avatar.head.color ||
                newCookie.avatar.shirt.color !== oldCookie.avatar.shirt.color ||
                newCookie.avatar.hair.code !== oldCookie.avatar.hair.code ||
                newCookie.avatar.head.code !== oldCookie.avatar.head.code ||
                newCookie.avatar.shirt.code !== oldCookie.avatar.shirt.code ||
                newCookie.name !== oldCookie.name;
            }
        },
        watch: {
            globalPlayerCookie: function (newCookie, oldCookie) {
                if ((newCookie && !oldCookie) || this.avatarHasChanged(newCookie, oldCookie))
                    this.externalUpdate(newCookie)
            }
        },
        beforeMount: function () {
            this.externalUpdate(this.globalPlayerCookie)
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
            }
            ,
            isLanguagePickerDisabled: function () {
                if ('role' in this.globalPlayerCookie) {
                    return this.globalPlayerCookie.role !== 'host';
                }
                return false;
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
    }

    .avatar-configurator-wrapper .slide-up {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out;
        -webkit-animation-name: slideUp;
        animation-name: slideUp;
    }


    @keyframes slideUp {
        from {
        }
        to {
            transform: translate(0, 50px);
        }
    }

    .avatar-container {
        position: relative;
        display: flex;
        justify-content: center;
        height: min(20vw, 30vh);
        width: min(20vw, 30vh);
        max-width: 400px;
        max-height: 400px;
        background-color: #ab9ee9;
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
        z-index: 5000;
        width: 100%;
    }

    .avatar-head {
        z-index: 4998;
        width: 100%;
    }

    .avatar-shirt {
        z-index: 4999;
        width: 100%;
    }

    .avatar-hair svg {
        position: absolute;
        top: 3.5%;
        width: 100%;
        height: auto;
        z-index: 3;
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
        line-height:calc(13px + 0.75vw);
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
        background: #9f92e4;
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

    .selectors-wrapper.anim-in {
        animation-name: animIn;
    }

    .selectors-wrapper.anim-out {
        animation-name: animOut;
    }

    .selectors-wrapper.animation {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out
    }

    @keyframes animIn {
        0% {
            max-height: 0;
            opacity: 0;
        }
        100% {
            max-height: 250px;
            opacity: 1;
        }
    }

    @keyframes animOut {
        from {
            max-height: 250px;
            opacity: 1;
        }
        to {
            opacity: 0;
            max-height: 0;
        }
    }

    .lang-selector-disabled {
        opacity: 1;
        cursor: unset;
    }
</style>
