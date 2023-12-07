<template>
    <div class="create-room-wrapper">
        <div class="room-settings-create">
            <div class="create-room-heading">Erstelle einen Raum</div>
            <div class="input-elem-container">
                <input type=text v-model="userNameInput" placeholder="Dein Benutzername">
            </div>
            <div class="input-elem-container">
                <input type=text placeholder="Name des Raums eingeben" v-model="roomSettings.title">
                <div class="custom-select">
                    <select v-model="selectedValueTypeIndex">
                        <option :value="index" v-for="(typeOption, index) in valueTypeOptions" :key="typeOption.id">
                            {{ typeOption.name }}
                        </option>
                    </select>
                </div>

            </div>
            <div class="card-values">
                <span class="value-item" v-for="value in selectedValueType.values" :key="value.label">
                   {{ value.label }}
                </span>
            </div>
            <div class="secondary-options">
                <div class="secondary-option">
                    <input v-model="roomSettings.realtimeVoting" type="checkbox">
                    <span>Do you want moderators to see other players voting in real time?</span>
                </div>
                <div class="secondary-option">
                    <input v-model="roomSettings.voteAfterReveal" type="checkbox">
                    <span>Allow players to change vote after scores shown</span>
                </div>
                <div class="secondary-option">
                    <input v-model="roomSettings.autoReveal" type="checkbox">
                    <span>Do you want to auto reveal votes when voting is completed?</span>
                </div>
            </div>
            <div class="create-room-buttons-panel">
                <button class="button-activate" v-on:click="createRoom()">Raum erstellen</button>
                <button class="button-activate invers" v-on:click="cancel()">abbrechen</button>
            </div>

        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";
import {DISPLAY_OVERLAY_STATE, VALUE_TYPE_OPTIONS} from "@/constants/vue-constants";


export default {
    name: "Create-Room",
    components: {},
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
                voteAfterReveal: false,
                autoReveal: false,
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
        }
    }
};
</script>

<style lang="scss" scoped>

.create-room-wrapper {

  .room-settings-create {
    width: 500px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 5px;
    padding: 15px;

    .create-room-heading {
      color: black;
      font-size: 1.5rem;
      line-height: 1.5rem;
      padding: 5px 0;
    }

    .card-values {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      outline: 1px solid #d7d7d7;
      border-radius: 3px;
      background-color: white;

      .value-item {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: black;
        width: 100px;
        height: 40px;
        font-size: 1.25rem;
      }

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
