<template>
    <div class="color-element-selector-wrapper m-1vw-v">
        <button v-on:click="scrollToPrevious()">
            <svg xmlns="http://www.w3.org/2000/svg" width="17.013" height="30" viewBox="0 0 17.013 30">
                <path id="Path_1" data-name="Path 1"
                      d="M17.013,135.277V109.32a2.017,2.017,0,0,0-3.444-1.427L.591,120.872a2.018,2.018,0,0,0,0,2.853L13.569,136.7A2.017,2.017,0,0,0,17.013,135.277Z"
                      transform="translate(0 -107.298)" fill="#fff"/>
            </svg>
        </button>
        <div class="visible-color-options-content">
            <div class="options-slide-container slide-animation"
                 :class="{'color-animated-left': animateLeft, 'color-animated-right': animateRight}"
                 @animationend="onAnimationEnd">
                <div class="color-selection-elem"
                     :class="{'is-selected': selectedElement === el}"
                     v-for="el in visibleOptions"
                     :key="el">
                    <div class="inner-color-square" :style="{backgroundColor: el}">

                    </div>
                </div>
            </div>
        </div>
        <button v-on:click="scrollToNext()">
            <svg xmlns="http://www.w3.org/2000/svg" width="17.013" height="30" viewBox="0 0 17.013 30">
                <path id="Path_1" data-name="Path 1"
                      d="M0,135.277V109.32a2.017,2.017,0,0,1,3.444-1.427l12.979,12.979a2.018,2.018,0,0,1,0,2.853L3.444,136.7A2.017,2.017,0,0,1,0,135.277Z"
                      transform="translate(0 -107.298)" fill="#fff"/>
            </svg>
        </button>
    </div>
</template>

<script>
    export default {
        name: 'AvatarColorCarouselSelector',
        props: ['options', 'selection'],
        beforeMount: function () {
           this.externalUpdate(this.selection)
        },
        watch: {
            selection: function (newColorSelection, oldColorSelection) {
                if(newColorSelection !== oldColorSelection && newColorSelection !== this.selectedElement) {
                    this.externalUpdate(newColorSelection)
                }
            }
        },
        data() {
            return {
                selectedElement: null,
                selectedElementIndex: 0,
                topIndex: 4,
                nextTopIndex: 4,
                bottomIndex: 0,
                nextBottomIndex: 0,
                animateLeft: false,
                animateRight: false,
            }
        },
        methods: {
            externalUpdate: function(selection) {
                if (this.options) {
                    const selectedElement = this.options?.find(o => o === selection)
                    this.selectedElement = selectedElement;
                    const selectedElementIndex = this.options?.indexOf(selectedElement);
                    const nextBottomIndex = (selectedElementIndex - 2) >= 0 ? selectedElementIndex - 2 : this.options.length + (selectedElementIndex - 2);
                    const nextTopIndex = (selectedElementIndex + 2) < this.options.length ? selectedElementIndex + 2 : (selectedElementIndex + 2) - this.options.length;
                    this.selectedElementIndex = selectedElementIndex;
                    this.bottomIndex = nextBottomIndex;
                    this.topIndex = nextTopIndex;
                    this.nextBottomIndex = this.bottomIndex;
                    this.nextTopIndex = this.topIndex;
                }
            },
            scrollToPrevious: function () {
                if (this.animateLeft || this.animateRight) {
                    return;
                }

                this.animateRight = true;
                this.nextBottomIndex = this.bottomIndex === 0 ? this.options.length - 1 : this.bottomIndex - 1;
                this.nextTopIndex = this.topIndex === 0 ? this.options.length - 1 : this.topIndex - 1;
                this.selectedElementIndex = this.selectedElementIndex === 0 ? this.options.length - 1 : this.selectedElementIndex - 1;
                this.updateSelectedElement();

            },
            scrollToNext: function () {
                if (this.animateLeft || this.animateRight) {
                    return;
                }

                this.animateLeft = true;
                this.nextBottomIndex = this.bottomIndex === this.options.length - 1 ? 0 : this.bottomIndex + 1;
                this.nextTopIndex = this.topIndex === this.options.length - 1 ? 0 : this.topIndex + 1;
                this.selectedElementIndex = this.selectedElementIndex === this.options.length - 1 ? 0 : this.selectedElementIndex + 1;
                this.updateSelectedElement();
            },
            onAnimationEnd: function () {
                this.animateRight = false;
                this.animateLeft = false;
                this.topIndex = this.nextTopIndex;
                this.bottomIndex = this.nextBottomIndex;
            },
            updateSelectedElement: function () {
                this.selectedElement = this.options[this.selectedElementIndex];
                this.$emit('colorElementChange', this.selectedElement);
            }
        },
        computed: {
            visibleOptions: function () {
                if (this.bottomIndex > this.topIndex) {
                    return [...this.options.slice(this.bottomIndex, this.options.length), ...this.options.slice(0, this.topIndex + 1)]
                } else {
                    return this.options.slice(this.bottomIndex, this.topIndex + 1);
                }
            }
        }

    }
</script>

<style>
    .color-element-selector-wrapper {
        box-sizing: border-box;
        position: relative;
        background-color: rgba(89, 74, 158, 0.55);
        border-radius: 23px;
        border: 4px rgba(190, 180, 233, 0.55) solid;
        display: grid;
        grid-template-columns: 15% 70% 15%;
        width: 100%;
        max-width: 20vw;
        min-width: 250px;
        padding: 5px;
        align-items: center;
    }

    .color-element-selector-wrapper button {
        appearance: none;
        background-color: transparent;
        border: none;
    }

    .color-element-selector-wrapper button svg {
        width: 2vw;
    }

    .visible-color-options-content {
        display: flex;
        overflow: hidden;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        width: 100%;
        height: min-content;
    }

    .color-element-selector-wrapper .options-slide-container {
        display: flex;
        margin-left: -33%;
        width: 100%;
        max-width: 100%;

    }

    .color-selection-elem {
        box-sizing: border-box;
        max-width: 33%;
        min-width: 33%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        max-height: 5vw;
        min-height: 55px;
        transition: all 0.2s linear;
    }

    .color-selection-elem svg {
        box-sizing: border-box;
        height: 4vw !important;
        min-height: 55px;
        padding: 2px;
    }

    .color-selection-elem.is-selected .inner-color-square {
        width: 55px;
        height: 55px;
        min-height: 55px;
    }


    .color-element-selector-wrapper .slide-animation {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out
    }

    .inner-color-square {
        box-sizing: border-box;
        width: 35px;
        height: 35px;
        min-height: 35px;
        border-radius: 5px;
        padding: 10px;
        transition: all 0.25s;
    }

    .color-animated-left {
        -webkit-animation-name: slideLeft;
        animation-name: slideLeft;
    }

    .color-animated-right {
        -webkit-animation-name: slideRight;
        animation-name: slideRight;
    }


    @keyframes slideLeft {
        from {
        }
        to {
            transform: translate(-33%, 0px);
        }
    }

    @keyframes slideRight {
        from {
        }
        to {
            transform: translate(33%, 0px);
        }
    }

</style>
