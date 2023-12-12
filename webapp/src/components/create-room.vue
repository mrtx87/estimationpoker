<template>
    <div class="create-room-wrapper">
        <div class="room-settings-create">
            <div class="large-heading">{{ tl8('create.room.title')}}</div>
            <div class="input-elem-container">
                <input type=text v-model="userNameInput" :placeholder="tl8('create.room.user.name.placeholder')">
                <div v-if="userNameTooLong" class="validation-message">{{ tl8('validation.text.user.name') }}</div>
            </div>
            <div class="input-elem-container">
                <input type=text :placeholder="tl8('create.room.room.title.placeholder')" v-model="roomSettings.title">
                <div v-if="roomTitleTooLong" class="validation-message">{{ tl8('validation.text.user.name') }}</div>

                <select class="custom-select" v-model="selectedValueTypeIndex">
                    <option :value="index" v-for="(typeOption, index) in valueTypeOptions" :key="typeOption.id">
                        {{ typeOption.name }}
                    </option>
                </select>
            </div>
            <div class="card-values">
                <vote-card class="settings-size" v-bind:disabled="true" v-bind:value="value"
                           v-for="value in selectedValueType.values"
                           :key="value.label"></vote-card>

            </div>
            <div class="secondary-options">
                <div class="secondary-option">
                    <input v-model="roomSettings.realtimeVoting" type="checkbox">
                    <span>{{ tl8('create.room.option.realtime.voting') }}</span>
                </div>
            </div>
            <div class="create-room-buttons-panel">
                <button class="button-activate" :disabled="isInvalid" v-on:click="createRoom()">{{ tl8('create.room.btn.title') }}</button>

                <button class="button-activate invers" v-on:click="cancel()">{{ tl8('create.room.btn.cancel') }}</button>
            </div>

        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";
import {DISPLAY_OVERLAY_STATE, VALUE_TYPE_OPTIONS} from "@/constants/vue-constants";
import VoteCard from "@/components/vote-card.vue";
import {languageService} from "@/services/language";


export default {
    name: "Create-Room",
    components: {VoteCard},
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
            userNameInput: '',
            selectedValueTypeIndex: 0,
            roomSettings: {
                title: '',
                realtimeVoting: false,
                valueOptions: null
            }
        }
    },
    methods: {
        createRoom() {
            restService.sendPostRequest(
                '/create-room',
                {
                    userName: this.userNameInput,
                    roomSettings: {
                        ...this.roomSettings,
                        valueOptionsId: this.selectedValueType.id
                    },
                    avatar: this.$appService.getRandomAvatar()
                },
                true,
                false)
                .then(this.$appService.onJoinRoomResponse.bind(this.$appService));
        },
        cancel() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
        },
        tl8(key) {
            return languageService.t(key, this.appStore.langKey);
        }
    },
    computed: {
        roomId() {
            return this.appStore.roomId;
        },
        selectedValueType() {
            return VALUE_TYPE_OPTIONS[this.selectedValueTypeIndex];
        },
        valueTypeOptions() {
            return VALUE_TYPE_OPTIONS;
        },
        isInvalid() {
            return this.userNameInput.length < 2 || this.userNameTooLong || this.roomSettings.title.length < 2 || this.selectedValueTypeIndex < 0;
        },
        userNameTooLong() {
            return this.userNameInput.length > 25;
        },
        roomTitleTooLong() {
            return this.roomSettings.title.length > 40;
        }
    }
};
</script>

<style lang="scss" scoped>

.create-room-wrapper {
  width: 100%;
  max-width: 500px;
  box-sizing: border-box;

  .room-settings-create {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 5px;
    box-sizing: border-box;

    .card-values {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 10px;
      gap: 15px;
    }

    .secondary-options {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .secondary-option {
        display: flex;
        gap: 10px;

      }
    }


    .create-room-buttons-panel {
      display: flex;
      gap: 15px;

    }
  }
}

</style>
