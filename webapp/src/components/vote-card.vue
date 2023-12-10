<template>
    <button class="vote-card-wrapper" :disabled="disabled" v-on:click="triggerVote(value)"
            :class="{'selected': isSelected}">
        {{ value?.label }}
    </button>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {RequestMessageType, Roles} from "@/constants/vue-constants";

export default {
    name: "Vote-Card",
    props: ['value', 'disabled', 'isSelected'],
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
        localUser() {
            return this.appStore.localUser;
        },
        estimation() {
            return this.appStore.room.currentEstimation;
        },
        isLocalUserParticipant() {
            return this.localUser?.roles.includes(Roles.PLAYER);
        }
    }
};
</script>

<style lang="scss" scoped>

.vote-card-wrapper {
  appearance: none;
  border: none;
  box-sizing: border-box;
  display: flex;
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
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  height: min-content;

  &:disabled {
    cursor: default;
  }

  &.vote-size {
    max-width: 80px;
    width: 3.5vw;
    min-width: 45px;
    font-size: 1.4rem;
  }

  &.settings-size {
    max-width: 70px;
    width: 3.5vw;
    min-width: 35px;
    font-size: 1.3rem;
  }

  &.user-tile-size {
    width: 35px;
    font-size: 0.95rem;
    position: absolute;
    z-index: 10;
    left: -10px;
    top: -12%;

  }

  &.selected {
    background-color: var(--primary-color-darkend);
    color: white;
  }

  &:not(:disabled):hover {
    transform: translateY(3px);
  }
}

@media only screen and (max-width: 775px) {

    .user-tile-size {
        width: 25px !important;
        left: 0px !important;
        top: -8% !important;
    }
}

</style>
