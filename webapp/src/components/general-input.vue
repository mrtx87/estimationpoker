<template>
  <div class="input-wrapper">
    <input class="general-input heading1" :disabled="isDisabled" :placeholder="placeholder"
           v-model="inputText" v-on:focus="makeEditable()" :class="{focused: isFocused}">
    <div class="change-title-btn" v-if="isFocused">
      <button class="save-change" :disabled="isInvalid()" v-on:click="changeInputText()">
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
  components: {},
  props: ['text', 'isDisabled', 'placeholder'],
  created() {
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
    changeInputText() {
      this.$emit('onTextInputChange', this.inputText);
      this.makeNotEditable();
    },
    isInvalid() {
      return this.inputText === this.text || !this.inputText;
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.heading1 .general-input {
  font-size: 1.8rem;
  margin-bottom: 0.25vh;
}

.heading2 .general-input {
  font-size: 1.3rem;
  margin-bottom: 0.25vh;
  text-align: center;
}

.general-input {
  color: rgb(36, 35, 42);
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 4px 8px;
  transition: all 0.1s ease 0s;
  width: 100%;

  &.focused {
    #border: 1px solid transparent;
    #box-shadow: rgb(0 0 0 / 12%) 0px 1px 3px, rgb(0 0 0 / 24%) 0px 1px 2px;
    background: rgb(251, 251, 251);
    border-radius: 4px;
    border: none;
    appearance: none;
    outline: 1px solid #d7d7d7;
    text-align: left !important;
    font-size: 18px;
  }
}

.heading1 {
  font-size: 1.8rem;
  margin-bottom: 0.25vh;
}



.change-title-btn {
  position: absolute;
  right: 5px;
  gap: 5px;
  display: flex;

  .save-change {
    border: none;
    background: white;
    cursor: pointer;
    padding: 0;

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }

    .accept-img {
      background: var(--primary-color);
      width: 22px;
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

    .decline-img {
      background: var(--default-cancel-color);
      width: 22px;
      border-radius: 3px;

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
</style>
