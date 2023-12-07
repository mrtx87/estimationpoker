<template>
    <div class="vote-card-wrapper" v-on:click="triggerVote(value)" :class="{'selected': isSelected}">
        {{ value.label }}
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
            if (!this.isLocalUserParticipant) {
                this.appStore.toast.warning("Only Participants may vote.", {
                    timeout: 2000
                });
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
            return this.appStore.localVoteValue.label === this.value.label;
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
  max-width: 110px;
  width: 7vw;
  user-select: none;
  min-width: 55px;
  aspect-ratio: 2/3;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: white;
  transition: all .25s ease-in-out;
  cursor: pointer;
  color: #7d8694;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;

  &.selected {
    background-color: var(--primary-color-darkend);
    color: white;
  }

  &:hover {
    transform: translateY(3px);
  }
}

</style>
