<template>
    <div class="room-settings-wrapper">
        <div class="room-settings-item">
            <input :disabled="localUserIsNotModerator" v-model="title">
        </div>

        <div class="room-settings-item">
            <div class="custom-select">
                <select :disabled="localUserIsNotModerator" v-model="selectedValueTypeId">
                    <option :value="typeOption.id" v-for="typeOption in valueTypeOptions" :key="typeOption.id">
                        {{ typeOption.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="card-values">
                <span class="value-item" v-for="value in selectedValueType.values" :key="value.value">
                   {{ value.value }}
                </span>
        </div>
        <div class="room-settings-item">
            <input :disabled="localUserIsNotModerator" v-model="realtimeVoting" type="checkbox">
            <span>Do you want observers to see other players voting in real time?</span>
        </div>
        <div class="room-settings-item">
            <input :disabled="localUserIsNotModerator" v-model="voteAfterReveal" type="checkbox">
            <span>Allow Players to vote after reveal</span>
        </div>
        <div class="room-settings-item">
            <input :disabled="localUserIsNotModerator" v-model="autoReveal" type="checkbox">
            <span>Do you want to auto reveal votes when voting completed?</span>
        </div>
        <div class="room-settings-buttons-panel">
            <button v-if="!localUserIsNotModerator" :disabled="localUserIsNotModerator || !isValid()" v-on:click="updateRoomSettings">save</button>
            <button v-on:click="cancel">{{ localUserIsNotModerator ? 'ok' : 'cancel' }}</button>
        </div>

    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";
import {DISPLAY_OVERLAY_STATE, RequestMessageType, VALUE_TYPE_OPTIONS} from "@/constants/vue-constants";


export default {
    name: "Room-Settings",
    props: ['roomSettings'],
    components: {},
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
            voteAfterReveal: false,
            autoReveal: false,
            selectedValueTypeId: 0
        }
    },
    methods: {
        isValid() {
            return this.roomSettings.realtimeVoting !== this.realtimeVoting
                || this.roomSettings.title !== this.title
                || this.roomSettings.voteAfterReveal !== this.voteAfterReveal
                || this.roomSettings.autoReveal !== this.autoReveal
                || this.roomSettings.valueOptions.id !== this.selectedValueTypeId;
        },
        initRoomSettings(roomSettings) {
            this.realtimeVoting = roomSettings.realtimeVoting;
            this.voteAfterReveal = roomSettings.voteAfterReveal;
            this.autoReveal = roomSettings.autoReveal;
            this.title = roomSettings.title;
            this.valueOptions = {...roomSettings.valueOptions, values: [...roomSettings.valueOptions.values]};
            this.selectedValueTypeId = roomSettings.valueOptions.id;
        },
        updateRoomSettings() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROOM_SETTINGS, {
                realtimeVoting: this.realtimeVoting,
                title: this.title,
                valueOptions: this.selectedValueType,
                voteAfterReveal: this.voteAfterReveal,
                autoReveal: this.autoReveal,
            });
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
            return VALUE_TYPE_OPTIONS.find(vo => vo.id === this.selectedValueTypeId);
        },
        valueTypeOptions() {
            return VALUE_TYPE_OPTIONS;
        },
        localUserIsNotModerator() {
            return !this.appStore.isLocalUserModerator
        }
    }
};
</script>

<style lang="scss">

.room-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .room-settings-item {
    display: flex;
    gap: 10px;

  }

  .card-values {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    padding: 5px;
    border: 1px solid black;
    border-radius: 3px;

    .value-item {
      width: 20%;
      text-align: center;
      color: black;
      font-weight: bolder;
    }
  }

  .room-settings-buttons-panel {
    display: flex;
    gap: 15px;
  }
}

</style>
