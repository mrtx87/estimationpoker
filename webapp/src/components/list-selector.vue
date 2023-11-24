<template>
    <div class="select-list-wrapper">
        <div class="select-list-option anim"
             :class="{'option-disabled': isDisabled(option), 'selector-selected': option.value === selectedElement.value}"
             v-for="(option, index) in options"
             :key="option.value"
             :title="isDisabled(option) ? 'You need more than 2 Players for this Option' : option.tooltip"
             v-on:click="updateSelectedElement(option, index)"
        >
            {{option.label}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListSelector',
        props: ['options', 'selection', 'disabled'],
        watch: {
            selection: function (newVal, oldVal) {
                if (newVal !== this.selectedElement?.value) {
                    this.externalUpdate(newVal);
                }
            }
        },
        beforeMount: function () {
            this.externalUpdate(this.selection);
        },
        data() {
            return {
                selectedElement: null
            }
        },
        methods: {
            updateSelectedElement: function (option, index) {
                if (this.isDisabled(option)) {
                    return;
                }
                if (this.selectedElement.value !== option.value) {
                    this.selectedElement = option;
                    this.$emit('onListSelectionChange', this.selectedElement.value)
                }
            },
            externalUpdate: function (selection) {
                if (this.options && selection) {
                    this.selectedElement = this.options.find(el => el.value === selection);
                }
            },
            isDisabled: function (option) {
                return this.disabled || !option.enabled;
            }
        }
    }
</script>

<style lang="scss">
    .select-list-wrapper {
        position: relative;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        flex-direction: column;
        font-size: 15px;
        line-height: 17px;
        background-color: #5e488a;
        border: 3px #BEB4E9 solid;
        border-radius: 15px;
        padding: min(0.35vh, 4px);
        overflow: hidden;
        gap: 2px 0;
    }

    .select-list-option {
        box-sizing: border-box;
        font-size: min(max(7px, 0.85vw), 11px);
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 4px;

        @media only screen and (max-aspect-ratio: 1/1), screen and (max-width: 1020px) {
            font-size: min(max(8px, 4vw), 15px);
            font-family: 'Source Sans Pro', sans-serif;
        }

    }

    .option-disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    .anim {
        animation-duration: 0.3s;
        animation-fill-mode: both;
        animation-timing-function: ease-in-out
    }

    .selector-selected {
        outline: 2px solid var(--highlight-color);
        border-radius: 10px;
        animation-name: fadeOptionIn;
        opacity: 1 !important;
    }

    .fade-out {
        animation-name: fadeOptionOut;
    }

    .fade-in {
        animation-name: fadeOptionIn;
    }


    @keyframes fadeOptionIn {
        from {
            border-color: transparent;
        }
        to {
            border-color: var(--highlight-color);
        }
    }

    @keyframes fadeOptionOut {
        from {
            border-bottom-color: var(--highlight-color);
        }
        to {
            border-bottom-color: transparent;
        }
    }


</style>
