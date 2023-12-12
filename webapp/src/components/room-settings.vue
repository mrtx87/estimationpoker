<template>
    <div class="room-settings-wrapper">
        <div class="large-heading">
          {{ tl8('room.settings.title') }}
        </div>
        <div class="input-elem-container">
            <input type="text" placeholder="Room Title" :disabled="localUserIsNotModerator" v-model="title">
            <span v-if="roomTitleTooLong" class="validation-message">{{ tl8('validation.text.room.title') }}</span>
        </div>

        <div class="room-settings-item">
            <select class="custom-select" :disabled="localUserIsNotModerator" v-model="selectedValueTypeId">
                <option :value="typeOption.id" v-for="typeOption in valueTypeOptions" :key="typeOption.id">
                    {{ typeOption.name }}
                </option>
            </select>
        </div>
        <div class="card-values">
            <vote-card class="settings-size" v-bind:disabled="true" v-bind:value="value"
                       v-for="value in selectedValueType.values"
                       :key="value.label"></vote-card>
        </div>
        <div class="room-settings-item">
            <input :disabled="localUserIsNotModerator" v-model="realtimeVoting" type="checkbox">
            <span>{{ tl8('room.settings.real-time-voting') }}</span>
        </div>
        <div class="room-settings-buttons-panel">
            <button class="button-activate" v-if="!localUserIsNotModerator"
                    :disabled="localUserIsNotModerator || !isValid()"
                    v-on:click="updateRoomSettings">{{ tl8('room.settings.save') }}
            </button>
            <button class="button-activate invers" v-if="!localUserIsNotModerator"
                    v-on:click="cancel">{{ tl8('room.settings.cancel') }}
            </button>
            <button class="button-activate" v-if="localUserIsNotModerator"
                    v-on:click="cancel">ok
            </button>
        </div>

    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";
import {DISPLAY_OVERLAY_STATE, RequestMessageType, VALUE_TYPE_OPTIONS} from "@/constants/vue-constants";
import VoteCard from "@/components/vote-card.vue";
import {languageService} from "@/services/language";


export default {
    name: "Room-Settings",
    props: ['roomSettings'],
    components: {VoteCard},
    created() {
        this.appStore = useAppStateStore();
    },
    beforeMount() {
        this.initRoomSettings(this.roomSettings)
    },
    watch: {
        roomSettings(next, previous) {
            this.initRoomSettings(next);
        }
    },
    data: function () {
        return {
            appStore: null,
            realtimeVoting: false,
            title: '',
            selectedValueTypeId: 0
        }
    },
    methods: {
        tl8(key, vars) {
          return languageService.t(key, this.appStore.langKey, vars);
        },
        isValid() {
            return this.roomSettings.realtimeVoting !== this.realtimeVoting
                || (this.roomSettings.title !== this.title && this.title.length > 1 && !this.roomTitleTooLong)
                || this.roomSettings.valueOptionsId !== this.selectedValueTypeId;
        },
        initRoomSettings(roomSettings) {
            this.realtimeVoting = roomSettings.realtimeVoting;
            this.title = roomSettings.title;
            this.selectedValueTypeId = roomSettings.valueOptionsId;
        },
        updateRoomSettings() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROOM_SETTINGS, {
                realtimeVoting: this.realtimeVoting,
                title: this.title,
                valueOptionsId: this.selectedValueTypeId
            });
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
        },
        cancel() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.NO_OVERLAY);
        }
    },
    computed: {
        roomId() {
            return this.appState.roomId;
        },
        selectedValueType() {
            return this.selectedValueTypeId ? VALUE_TYPE_OPTIONS.find(vo => vo.id === this.selectedValueTypeId) : VALUE_TYPE_OPTIONS[0];
        },
        valueTypeOptions() {
            return VALUE_TYPE_OPTIONS;
        },
        localUserIsNotModerator() {
            return !this.appStore.isLocalUserModerator
        },
        roomTitleTooLong() {
            return this.title.length > 40;
        }
    }
};
</script>

<style lang="scss">

.room-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 500px;
  box-sizing: border-box;

  .room-settings-item {
    display: flex;
    gap: 10px;
    color: #777777;
  }

  .room-name-input {
    border: none;
    padding: 5px;
    border-radius: 3px;
  }

  .card-values {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    border-radius: 3px;
    gap: 15px;
  }

  .room-settings-buttons-panel {
    display: flex;
    gap: 15px;
    padding: 5px;
  }


}

</style>
