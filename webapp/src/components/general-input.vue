<template>
    <div class="input-wrapper" :class="{focused: isFocused}">
        <input ref="genInput"
               class="general-input heading1"
               :disabled="isDisabled"
               :class="{focused: isFocused}"
               :placeholder="placeholder"
               v-model="inputText"
               v-on:focus="makeEditable()"
               v-on:keydown.enter="changeInputText">
        <div class="validation-message" v-if="inputText && validation && !validation.isValid(inputText)">{{ validation?.message }}
        </div>
        <div class="change-title-btn" v-if="isFocused">
            <button class="save-change" :disabled="isInvalid" v-on:click="changeInputText()">
                <img class="accept-img"
                     src="../assets/accept.svg">
            </button>
            <button class="decline-change" v-on:click="resetInputText()">
                <img class="decline-img"
                     src="../assets/decline.svg">
            </button>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";

export default {
    name: "generalInput",
    props: ['text', 'isDisabled', 'placeholder', 'validation'],
    emits: ['onTextInputChange'],
    mounted() {
        this.appStore = useAppStateStore();
        this.updateTextFromExternal(this.text);
    },
    watch: {
        text(nextText, previousText) {
            this.updateTextFromExternal(nextText);
        }
    },
    data: function () {
        return {
            appStore: null,
            inputText: '',
            isFocused: false
        }
    },
    methods: {
        makeEditable() {
            this.isFocused = true;
        },
        makeNotEditable() {
            setTimeout(function () {
                this.isFocused = false;
            }.bind(this), 100);
        },
        updateTextFromExternal(text) {
            this.inputText = text;
        },
        resetInputText() {
            this.inputText = this.text;
            this.makeNotEditable();
        },
        changeInputTextViaEnter() {
            if (this.isFocused) {
                this.changeInputText();
            }
        },
        changeInputText() {
            if (this.isInvalid) {
                return;
            }
            this.$emit('onTextInputChange', this.inputText);
            this.makeNotEditable();
            this.$refs.genInput.blur();
        },
    },
    computed: {
        isInvalid() {
            return this.inputText === this.text || !this.inputText || (this.inputText && this.validation && !this.validation?.isValid(this.inputText));
        }
    }
};
</script>

<style lang="scss" scoped>

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  width: 90%;

  &.focused {
    background: rgb(251, 251, 251);
    border-radius: 4px;
    border: none;
    appearance: none;
    outline: 1px solid #d7d7d7;
    text-align: left !important;
    font-size: 18px;
  }
}

.heading1 .general-input {
  font-size: 0.8rem;
  text-align: center;
}

.heading2 .general-input {
  font-size: 1.2rem;
  text-align: center;
}

.general-input {
  color: rgb(36, 35, 42);
  appearance: none;
  border: none;
  background-color: transparent;
  transition: all 0.1s ease 0s;
  width: 100%;
  padding: 0;

  &.focused {
    background: rgb(251, 251, 251);
    border-radius: 4px;
    border: none;
    appearance: none;
    outline: none;
    text-align: left !important;
    font-size: 18px;
  }

  &:focus-visible {
    outline: none;
  }
}

.change-title-btn {
  gap: 5px;
  display: flex;
  align-items: center;

  .save-change {
    border: none;
    background: white;
    cursor: pointer;
    padding: 0;
    box-sizing: border-box;
    height: 22px;

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }

    .accept-img {
      background: var(--primary-color);
      height: inherit;
      aspect-ratio: 1/1;
      border-radius: 3px;
    }

    &:not(:disabled) .accept-img {
      &:hover {
        background: var(--primary-color-darkend)
      }

      &:active {
        transform: translateY(2px);
        transition: .1s linear;
      }
    }
  }

  .decline-change {
    border: none;
    background: white;
    cursor: pointer;
    padding: 0;
    height: 22px;

    .decline-img {
      background: var(--default-cancel-color);
      height: inherit;
      border-radius: 3px;
      aspect-ratio: 1/1;

      &:hover {
        background-color: var(--default-cancel-color-hover);
      }

      &:active {
        transform: translateY(2px);
        transition: .1s linear;
      }
    }
  }
}

@media only screen and (max-width: 775px) {


  .heading1 .general-input {
    font-size: 0.7rem !important;
    font-weight: bold;

  }

  .heading2 .general-input {
    font-size: 1rem !important;
  }
}
</style>
