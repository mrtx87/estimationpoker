<template>
  <select :value="selection" v-on:change="onLangSelectionChange($event.target.value)" :disabled="disabled" :class="{'lang-selector-disabled': disabled}">
    <option v-for="languageOption in languageOptions" :key="languageOption.value" :value="languageOption.value">
      {{ languageOption.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'LanguageSelector',
  data: function () {
    return {
      languageOptions: [
        {value: 'en', label: 'english'},
        {value: 'de', label: 'deutsch'},
        {value: 'fr', label: 'francais'},
        {value: 'es', label: 'espanol'},
        {value: 'it', label: 'italiano'}
      ]
    }
  },
  props: ['selection', 'disabled'],
  methods: {
    onLangSelectionChange: function (value) {
      this.$emit('onLangSelectionChange', value);
    }
  }
}
</script>

<style lang="scss" scoped>

  select {
    position: relative;
  }

  .lang-selector-disabled {
    cursor: not-allowed !important;
  }

</style>
