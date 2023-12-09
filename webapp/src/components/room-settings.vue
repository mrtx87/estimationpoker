<template>
    <div class="room-settings-wrapper">
        <div class="room-title-header">
            <span>Room Settings</span>
        </div>
        <div class="room-settings-item">
            <input placeholder="Room-title" class="room-name-input" :disabled="localUserIsNotModerator" v-model="title">
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
            <vote-card class="settings-size" v-bind:disabled="true" v-bind:value="value"
                       v-for="value in selectedValueType.values"
                       :key="value.label"></vote-card>
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
            <button class="save-btn" v-if="!localUserIsNotModerator" :disabled="localUserIsNotModerator || !isValid()"
                    v-on:click="updateRoomSettings">save
            </button>
        </div>

    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";
import {DISPLAY_OVERLAY_STATE, RequestMessageType, VALUE_TYPE_OPTIONS} from "@/constants/vue-constants";
import VoteCard from "@/components/vote-card.vue";


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
                || this.roomSettings.valueOptionsId !== this.selectedValueTypeId;
        },
        initRoomSettings(roomSettings) {
            this.realtimeVoting = roomSettings.realtimeVoting;
            this.voteAfterReveal = roomSettings.voteAfterReveal;
            this.autoReveal = roomSettings.autoReveal;
            this.title = roomSettings.title;
            this.selectedValueTypeId = roomSettings.valueOptionsId;
        },
        updateRoomSettings() {
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.CHANGE_ROOM_SETTINGS, {
                realtimeVoting: this.realtimeVoting,
                title: this.title,
                valueOptionsId: this.selectedValueTypeId,
                voteAfterReveal: this.voteAfterReveal,
                autoReveal: this.autoReveal,
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
        }
    }
};
</script>

<style lang="scss">

.room-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 700px;

  .room-title-header {
    font-weight: bold;
    color: var(--default-grey-font-color)
  }

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

  .room-name-input:focus {
    outline: 2px solid #78B2CE;
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
