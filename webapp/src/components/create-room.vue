<template>
    <div class="create-room-wrapper">
        <div v-if="!creatingRoomClicked">
            <button class="button-activate" v-on:click="triggerCreateRoom()">Raum erstellen</button>
        </div>
        <div v-if="creatingRoomClicked" class="room-settings-create">
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
                <span class="value-item" v-for="value in selectedValueType.values" :key="value">
                   {{ value }}
                </span>
            </div>
            <div class="secondary-options">
                <div class="secondary-option">
                    <input v-model="roomSettings.realtimeVoting" type="checkbox">
                    <span>Do you want observers to see other players voting in real time?</span>
                </div>
                <div class="secondary-option">
                    <input v-model="roomSettings.voteAfterReveal" type="checkbox">
                    <span>Allow Players to vote after reveal</span>
                </div>
                <div class="secondary-option">
                    <input v-model="roomSettings.autoReveal" type="checkbox">
                    <span>Do you want to auto reveal votes when voting completed?</span>
                </div>
            </div>
            <div class="create-room-buttons-panel">
                <button class="button-activate" v-on:click="createRoom()">Raum erstellen</button>
                <button class="button-deactivate" v-on:click="cancel()">abbrechen</button>
            </div>

        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {restService} from "@/services/rest-service";
import {VALUE_TYPE_OPTIONS} from "@/constants/vue-constants";


export default {
    name: "Create-Room",
    components: {},
    created() {
        this.appState = useAppStateStore();
    },
    data: function () {
        return {
            appState: null,
            userNameInput: '',
            creatingRoomClicked: false,
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
        triggerCreateRoom() {
            this.creatingRoomClicked = true;
        },
        createRoom() {
            restService.sendPostRequest(
                '/create-room',
                {
                    userName: this.userNameInput,
                    roomSettings: {
                        ...this.roomSettings,
                        valueOptions: this.selectedValueType
                    },
                    avatar: this.$appService.getRandomAvatar()
                },
                true,
                false)
                .then(this.$appService.onJoinRoomResponse.bind(this.$appService));
        },
        cancel() {
            this.creatingRoomClicked = false;
        }
    },
    computed: {
        roomId() {
            return this.appState.roomId;
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

<style lang="scss">

.create-room-wrapper {

  .room-settings-create {
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    border-radius: 5px;

    .create-room-heading {
      color: black;
      font-size: 1.5rem;
      line-height: 1.5rem;
      padding: 5px 0;
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

    .secondary-options {
      display: flex;
      flex-direction: column;

      .secondary-option {
        display: flex;
        gap: 10px;

        input {

        }
      }
    }


    .create-room-buttons-panel {
      display: flex;
      gap: 15px;

    }
  }
}

input[type=text] {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  color: #2C3E50;
  font-size: 13px;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
}

.input-elem-container {
  display: flex;
  gap: 20px;
}


/* CSS */
.button-activate {
  appearance: none;
  backface-visibility: hidden;
  background-color: #2f80ed;
  border-radius: 10px;
  border-style: none;
  box-shadow: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  height: 50px;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 14px 30px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}

.button-activate:hover {
  background-color: #1366d6;
  box-shadow: rgba(0, 0, 0, .05) 0 5px 30px, rgba(0, 0, 0, .05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.button-activate:hover:after {
  opacity: .5;
}

.button-activate:active {
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 0, rgba(0, 0, 0, .1) 0 0 10px 0, rgba(0, 0, 0, .1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: .35s;
}

.button-activate:active:after {
  opacity: 1;
}

@media (min-width: 768px) {
  .button-activate {
    padding: 14px 22px;
    width: 176px;
  }
}

/* CSS */
.button-deactivate {
  appearance: none;
  backface-visibility: hidden;
  background-color: white;
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  border-color: #2f80ed;
  box-shadow: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
  font-size: 15px;
  font-weight: 500;
  height: 50px;
  letter-spacing: normal;
  line-height: 1.5;
  outline: none;
  overflow: hidden;
  padding: 14px 30px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transform: translate3d(0, 0, 0);
  transition: all .3s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
  color: #2f80ed;
}

.button-deactivate:hover {
  background-color: #ececec;
  box-shadow: rgba(0, 0, 0, .05) 0 5px 30px, rgba(0, 0, 0, .05) 0 1px 4px;
  opacity: 1;
  transform: translateY(0);
  transition-duration: .35s;
}

.button-deactivate:hover:after {
  opacity: .5;
}

.button-deactivate:active {
  box-shadow: rgba(0, 0, 0, .1) 0 3px 6px 0, rgba(0, 0, 0, .1) 0 0 10px 0, rgba(0, 0, 0, .1) 0 1px 4px -1px;
  transform: translateY(2px);
  transition-duration: .35s;
}

.button-deactivate:active:after {
  opacity: 1;
}

@media (min-width: 768px) {
  .button-deactivate {
    padding: 14px 22px;
    width: 176px;
  }
}


</style>
