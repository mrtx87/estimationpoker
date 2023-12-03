<template>
    <div class="room-history-wrapper">
        <div style="width:100%; display: flex; justify-content: flex-end;">
            <button class="button-activate" v-on:click="openCreateRoomOverlay()"><img style="width: 30px;"
                                                                                      src="../assets/cross.svg"> Raum
                erstellen
            </button>
        </div>
        <div class="room-history-header">Zuletzt besuchte Räume</div>
        <div class="room-history-list">
            <div class="room-history-list-row">
                <div class="room-history-list-column title-column">Titel</div>
                <div class="room-history-list-column">Teilnehmer</div>
                <div class="room-history-list-column">Schätzungen</div>
                <div class="room-history-list-column">Dein User</div>
                <div class="room-history-list-column">Erstelldatum</div>
                <div class="room-history-list-column">Aktionen</div>
            </div>
            <div v-for="roomPreviewItem in roomPreviews" :key="roomPreviewItem.id" class="room-history-list-row">
                <div class="room-history-list-column title-column">{{ roomPreviewItem.title }}</div>
                <div class="room-history-list-column">{{ roomPreviewItem.userCount }}</div>
                <div class="room-history-list-column">{{ roomPreviewItem.estimationCount }}</div>
                <div class="room-history-list-column">
                    <user v-bind:user="roomPreviewItem.localUser" v-bind:noUserName="true"></user>
                </div>
                <div class="room-history-list-column">{{ formattedDate(roomPreviewItem.createdAt) }}</div>
                <div class="room-history-list-column">
                    <button>remove</button>
                </div>
            </div>
        </div>
        <div class="no-rooms-used-message" v-if="!roomPreviews.length"> Du hast bisher noch keine Räume genutzt.</div>

    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {DISPLAY_OVERLAY_STATE} from "@/constants/vue-constants";
import {getRoomAuthenticationsFromCookies, removeCookie} from "@/services/cookie-service";
import {restService} from "@/services/rest-service";
import User from "@/components/user.vue";
import moment from 'moment';

export default {
    name: "Room-History",
    components: {User},
    created() {
        this.appStore = useAppStateStore();
        const roomAuthentications = getRoomAuthenticationsFromCookies();
        const tokens = roomAuthentications.map(ra => ra.token);
        restService.sendPostRequest('/room-history', tokens, false, false).then(res => {
            this.roomPreviews = res.data;
            this.cleanUpAuthenticationsFromCookies(roomAuthentications);
        });
    },
    data: function () {
        return {
            appStore: null,
            roomPreviews: []
        }
    },
    methods: {
        openCreateRoomOverlay() {
            this.appStore.setOverlayId(DISPLAY_OVERLAY_STATE.CREATE_ROOM);
        },
        cleanUpAuthenticationsFromCookies(roomAuthentications) {
            const notFoundRoomIds = roomAuthentications.filter(ra => !this.roomPreviews.some(rp => rp.id === ra.roomId)).map(ra => ra.roomId);
            notFoundRoomIds.forEach(removeCookie);
        },
        formattedDate(date) {
            return moment(date).format("DD.MM.YYYY");
        }
    }
};

</script>

<style lang="scss" scoped>

.room-history-wrapper {
  display: flex;
  width: 1200px;
  flex-direction: column;
  box-sizing: border-box;
  border: 4px;
  border-radius: 4px;
  padding: 30px;

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

    .room-history-list-row {
      display: grid;
      grid-template-columns: 40% 10% 10% 10% 15% 15%;
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

          &.title-column {
              justify-content: flex-start;
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


</style>
