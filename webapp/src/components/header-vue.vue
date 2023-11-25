<template>
  <div class="header-wrapper">
    <div class="header">
      <span>hello</span>
      <button  v-on:click="openAvatarConfigurator" class="change-avatar-Btn">Change Avatar</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "HeaderVue",
  components: {

  },
  data: function () {
    return {
      isAvatarConfiguratorOpen: false,
    }
  },
  methods: {
    openAvatarConfigurator: function() {
      this.$emit('openAvatar-Configurator', this.isAvatarConfiguratorOpen)
    }
  },
  computed: {

  }
};
</script>

<style lang="scss">

  .header-wrapper {
    width: 100%;
    position: fixed;
    top: 0;
  }

  .header {
    display: flex;
    width: 100%;
    height: 60px;
    background-color: black;
    align-items: center;
  }

  .change-avatar-Btn {

  }

</style>
