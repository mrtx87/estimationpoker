<template>
    <div class="room-history-wrapper">
        <div class="room-history-btn-panel">
            <button class="button-activate" v-on:click="openCreateRoomOverlay()"><img style="width: 30px;"
                                                                                      src="../assets/cross.svg">{{
                tl8('create.room.btn.title')
                }}
            </button>
        </div>
        <div class="room-history-header">{{ tl8('room.history.last.time.visited.room') }}</div>
        <div class="room-history-list">
            <div class="room-history-list-row">
                <div class="room-history-list-column title-column bold">{{ tl8('room.history.title') }}</div>
                <div class="room-history-list-column bold">{{ tl8('room.history.participants') }}</div>
                <div class="room-history-list-column bold large-table">{{ tl8('room.history.estimations') }}</div>
                <div class="room-history-list-column bold large-table">{{ tl8('room.history.your.user') }}</div>
                <div class="room-history-list-column bold large-table">{{ tl8('room.history.date.of.creation') }}</div>
                <div class="room-history-list-column bold"></div>
            </div>
            <div class="room-history-list-row-wrapper">
                <div v-for="roomPreviewItem in roomPreviews" :key="roomPreviewItem.id" class="room-history-list-row">
                    <div class="room-history-list-column title-column">{{ roomPreviewItem.title }}</div>
                    <div class="room-history-list-column">{{ roomPreviewItem.userCount }}</div>
                    <div class="room-history-list-column large-table">{{ roomPreviewItem.estimationCount }}</div>
                    <div class="room-history-list-column large-table">
                        <user class="room-history-user" v-bind:user="roomPreviewItem.localUser"
                              v-bind:noUserName="true"></user>
                    </div>
                    <div class="room-history-list-column large-table">{{
                        formattedDate(roomPreviewItem.createdAt)
                        }}
                    </div>
                    <div class="room-history-list-column btns-column">
                        <button class="button-activate small-btn" title="join"
                                v-on:click="joinRoom(roomPreviewItem.id)">
                            <img src="../assets/enter.svg"><span>{{ tl8('room.history.join.btn') }}</span></button>

                        <button class="button-activate small-btn crucial" title="join"
                                v-on:click="deleteRoomEntry(roomPreviewItem)">
                            <img src="../assets/bin.svg"><span>{{ tl8('room.history.remove.from.list') }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="no-rooms-used-message" v-if="!roomPreviews.length">
            {{ tl8('room.history.no.rooms.created.or.joined') }}
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE, ROOM_ROUTE} from "@/constants/vue-constants";
import {getCookie, getRoomAuthenticationsFromCookies, removeCookie} from "@/services/cookie-service";
import {restService} from "@/services/rest-service";
import User from "@/components/user.vue";
import moment from 'moment';
import {router} from "@/main";
import {formatDate} from "@/services/util";
import {languageService} from "@/services/language";

export default {
    name: "Room-History",
    components: {User},
    created() {
        this.appStore = useAppStateStore();
        const roomAuthentications = getRoomAuthenticationsFromCookies();
        const tokens = roomAuthentications.map(ra => ra.token);
        restService.sendPostRequest('/room-history', tokens).then(res => {
            this.appStore.setRoomPreviews(res.data);
            this.cleanUpAuthenticationsFromCookies(roomAuthentications);
        });
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {
        tl8(key, vars) {
            return languageService.t(key, this.appStore.langKey, vars);
        },
        joinRoom(roomId) {
            router.push(ROOM_ROUTE + roomId);
        },
        deleteRoomEntry(roomPreview) {
            this.appStore.setPrompt({
                    question: 'room.history.remove.from.list.question',
                    crucial: true,
                    confirmAction: this.deleteUserAndRoomEntry.bind(this, roomPreview)
                });
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.PROMPT);

        },
        deleteUserAndRoomEntry(roomPreview) {
            restService.sendGetRequest('/delete-user', getCookie(roomPreview.id))
                .then(() => {
                    removeCookie(roomPreview.id);
                    this.appStore.setRoomPreviews(this.appStore.roomPreviews.filter(rp => rp.id !== roomPreview.id));
                });
        },
        openCreateRoomOverlay() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.CREATE_ROOM);
        },
        cleanUpAuthenticationsFromCookies(roomAuthentications) {
            const notFoundRoomIds = roomAuthentications.filter(ra => !this.roomPreviews.some(rp => rp.id === ra.roomId)).map(ra => ra.roomId);
            notFoundRoomIds.forEach(removeCookie);
        },
        formattedDate(date) {
            return formatDate(date);
        }
    },
    computed: {
        roomPreviews() {
            return this.appStore.roomPreviews;
        }
    }
};

</script>

<style lang="scss" scoped>

.room-history-wrapper {
  display: flex;
  width: 90%;
  max-width: 1200px;
  flex-direction: column;
  box-sizing: border-box;
  border: 4px;
  border-radius: 4px;
  padding: 30px;

  .room-history-btn-panel {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .room-history-header {
    padding: 6px;
    font-size: 1.5rem;
    padding: 15px 0;
  }

  .room-history-list {
    background-color: white;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    box-sizing: border-box;
    max-height: 80vh;

    .room-history-list-row-wrapper {
      overflow-y: auto;
    }

    .room-history-list-row {
      display: grid;
      grid-template-columns: 40% 10% 15% 10% 10% 15%;
      border-bottom: 1px solid #f2f3f4;
      align-items: center;
      box-sizing: border-box;

      .room-history-list-column {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        height: inherit;
        box-sizing: border-box;

        &.bold {
          font-weight: bold;
        }

        &.title-column {
          justify-content: flex-start;
        }

        &.btns-column {
          flex-direction: column;
          gap: 15px;
        }
      }
    }
  }

  .no-rooms-used-message {
    width: 100%;
    text-align: center;
    padding-top: 50px;
  }
}

@media only screen and (max-width: 1150px) {
  .room-history-wrapper {
    font-size: 13px !important;
  }
}

@media only screen and (max-width: 900px) {
  .room-history-list-row {
    grid-template-columns: 40% 20% 40% !important;

    .large-table {
      display: none !important;
    }
  }
}

</style>
