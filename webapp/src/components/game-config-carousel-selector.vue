<template>
    <div class="selector-wrapper">
        <button v-on:click="selectPrevious()"
                :disabled="disabled"
                aria-label="select previous element"
                :class="{'option-disabled': disabled}">
            <svg xmlns="http://www.w3.org/2000/svg" width="17.013" height="30" viewBox="0 0 17.013 30">
                <path id="Path_1" data-name="Path 1"
                      d="M17.013,135.277V109.32a2.017,2.017,0,0,0-3.444-1.427L.591,120.872a2.018,2.018,0,0,0,0,2.853L13.569,136.7A2.017,2.017,0,0,0,17.013,135.277Z"
                      transform="translate(0 -107.298)" fill="#fff"/>
            </svg>
        </button>
        <div class="selection-content">
            <div class="selection-elem slide-animation" style="margin-left:-100%;"
                 :class="{'animated-right': animateRight}">
                {{previousElement?.label}}
            </div>
            <div class="selection-elem slide-animation"
                 :class="{'animated-left': animateLeft, 'animated-right': animateRight}"
                 @animationend="onAnimationEnd">
                {{selectedElement?.label}}
            </div>
            <div class="selection-elem slide-animation" :class="{'animated-left': animateLeft}">
                {{nextElement?.label}}
            </div>
        </div>
        <button v-on:click="selectNext()"
                :disabled="disabled"
                aria-label="select next element"
                :class="{'option-disabled': disabled}">
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
        name: 'GameConfigCarouselSelector',
        props: ['options', 'selection', 'delay', 'disabled'],
        beforeMount() {
            this.externalUpdate(this.selection)
        },
        watch: {
            selection: function (newSelection, previousSelection) { // watch it
                if (newSelection !== previousSelection && newSelection !== this.options[this.currentSelectedIndex]) {
                    this.externalUpdate(newSelection);
                }
            }
        },
        data() {
            return {
                displayedSelectedIndex: 0,
                animateLeft: false,
                animateRight: false,
                currentSelectedIndex: 0
            }
        },
        methods: {
            selectPrevious: function () {
                if (!this.animateRight) {
                    this.animateRight = true;
                    if (this.currentSelectedIndex === 0) {
                        this.currentSelectedIndex = this.options.length - 1;
                    } else {
                        this.currentSelectedIndex -= 1;
                    }
                }
            },
            selectNext: function () {
                if (!this.animateLeft) {
                    this.animateLeft = true;
                    if (this.currentSelectedIndex === this.options.length - 1) {
                        this.currentSelectedIndex = 0;
                    } else {
                        this.currentSelectedIndex += 1;
                    }
                }
            },
            onAnimationEnd: function () {
                this.animateRight = false;
                this.animateLeft = false;
                this.displayedSelectedIndex = this.currentSelectedIndex;
                this.$emit('selectionChange', this.options[this.currentSelectedIndex].value);
            },
            externalUpdate: function (selection) {
                const nextSelectedElement = this.options.find(el => el.value === selection);
                this.currentSelectedIndex = this.options.indexOf(nextSelectedElement);
                this.displayedSelectedIndex = this.currentSelectedIndex;
            }
        },
        computed: {
            selectedElement: function () {
                return this.options[this.displayedSelectedIndex]
            },
            previousElement: function () {
                if (this.displayedSelectedIndex === 0) {
                    return this.options[this.options.length - 1]
                }
                return this.options[this.displayedSelectedIndex - 1]
            },
            nextElement: function () {
                if (this.displayedSelectedIndex === this.options.length - 1) {
                    return this.options[0]
                }
                return this.options[this.displayedSelectedIndex + 1]
            }
        }

    }
</script>

<style scoped="true" lang="scss">

    .selector-wrapper {
        display: grid;
        grid-template-columns: 15% 70% 15%;
        background-color: #5e488a;
        border: 3px #BEB4E9 solid;
        border-radius: 20px;
    }


    .selection-content {
        display: flex;
        overflow: hidden;
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        font-size: min(max(9px, 0.8vw), 15px);
        line-height: min(max(9px, 0.8vw), 15px);
    }

    .option-disabled {
        cursor: not-allowed;
    }

    button {
        appearance: none;
        background-color: transparent;
        border: none;
        padding: 1px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: min(max(15px, 1.3vw), 25px);
        width: auto;

        &:active{
            transform: scale(0.925);
         }

        svg {
            width: auto;
            height: 90%;
        }
    }

    .selection-elem {
        min-width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .slide-animation {
        -webkit-animation-duration: 0.3s;
        animation-duration: 0.3s;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out
    }

    .animated-left {
        -webkit-animation-name: slideLeft;
        animation-name: slideLeft;


    }

    .animated-right {
        -webkit-animation-name: slideRight;
        animation-name: slideRight;
    }

    @keyframes slideLeft {
        from {
        }
        to {
            transform: translate(-100%, 0px);
        }
    }

    @keyframes slideRight {
        from {
        }
        to {
            transform: translate(100%, 0px);
        }
    }
</style>
