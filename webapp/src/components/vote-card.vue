<template>
    <div class="vote-card-wrapper" v-on:click="triggerVote(value)" :class="{'selected': isSelected}">
        {{ value }}
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {RequestMessageType, Roles} from "@/constants/vue-constants";

export default {
    name: "Vote-Card",
    props: ['value',],
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
        }
    },
    methods: {
        triggerVote(value) {
            if(!this.isLocalUserParticipant) {
                // TODO toastr
                console.log('sdgsdfgdhdf')
                return
            }
            if (this.isSelected) {
                this.appStore.setLocalVoteValue('');
                this.$websocketService.sendAuthenticatedRequest(RequestMessageType.VOTE_REQUEST);
                return;
            }

            this.appStore.setLocalVoteValue(value);
            this.$websocketService.sendAuthenticatedRequest(RequestMessageType.VOTE_REQUEST, {
                userId: this.localUser.id,
                estimationId: this.estimation.id,
                value: value
            });
        }
    },
    computed: {
        localVoteValue() {
            return this.appStore.localVoteValue;
        },
        isSelected() {
            return this.appStore.localVoteValue === this.value;
        },
        localUser() {
            return this.appStore.localUser;
        },
        estimation() {
            return this.appStore.room.currentEstimation;
        },
        isLocalUserParticipant() {
            return this.localUser?.roles.includes(Roles.PARTICIPANT);
        }
    }
};
</script>

<style lang="scss">

.vote-card-wrapper {
  display: flex;
  width: 10%;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 150px;
  border: 1px solid black;
  border-radius: 4px;
  background-color: #9f92e4;
  transition: all .2s ease-in-out;
  cursor: pointer;

  &.selected {
    background-color: #5E4FA3;
  }
}

</style>
