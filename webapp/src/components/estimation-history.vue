<template>
    <div class="estimation-history-wrapper">
        <div class="estimation-history-heading">{{ tl8('estimation-history.completed-estimates') }}</div>
        <div class="estimation-history-row">
            <div class="estimation-history-list-column title-column bold">{{ tl8('estimation-history.name') }}</div>
            <div class="estimation-history-list-column bold" :title="'average'">Ø</div>
            <div class="estimation-history-list-column bold">{{ tl8('estimation-history.deviation') }}</div>
            <div class="estimation-history-list-column bold">{{ tl8('estimation-history.votes') }}</div>
            <div class="estimation-history-list-column bold displayLarge">{{ tl8('estimation-history.time') }}</div>
            <div class="estimation-history-list-column bold displayLarge">{{
                tl8('estimation-history.createdAt')
                }}
            </div>
        </div>
        <div class="estimation-rows">
            <div class="estimation-history-row" v-for="eHistoryItem in estimationHistory" :key="eHistoryItem.id">
                <div class="estimation-history-list-column title-column" :title="eHistoryItem.title">
                    {{ eHistoryItem.title }}
                </div>
                <div class="estimation-history-list-column">{{ eHistoryItem.evaluation.avg }}</div>
                <div class="estimation-history-list-column">{{ eHistoryItem.evaluation.deviation }}</div>
                <div class="estimation-history-list-column">{{ eHistoryItem.evaluation.amountOfVotes }}</div>
                <div class="estimation-history-list-column displayLarge">{{
                    formatTime(eHistoryItem.timer.passedTime)
                    }}
                </div>
                <div class="estimation-history-list-column displayLarge">{{
                    formattedDate(eHistoryItem.createdAt)
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {formatDate, formatTime} from "@/services/util";
import {languageService} from "@/services/language";

export default {
    name: "Estimation-History",
    components: {},
    created() {
        this.appStore = useAppStateStore();
    },
    data: function () {
        return {
            appStore: null,
            userNameInput: ''
        }
    },
    methods: {
        tl8(key) {
            return languageService.t(key, this.appStore.langKey);
        },
        formatTime,
        formattedDate(date) {
            return formatDate(date);
        }
    },
    computed: {
        estimationHistory() {
            return this.appStore.sortedEstimationHistory;
        }
    }
};

</script>

<style lang="scss" scoped>

.estimation-history-wrapper {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 4px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
  width: 100%;
  margin-top: 25px;

  .estimation-history-heading {
    border-bottom: 2px solid #d7d7d7;
    padding: 6px;
    font-size: 17px;
  }

  .estimation-rows {
    max-height: 200px;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .estimation-history-row {
    display: grid;
    grid-template-columns: 35% 10% 15% 10% 15% 15%;
  }

  .estimation-history-row:nth-child(even) {
    background-color: #f4f7ff;
  }

  .estimation-history-list-column {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    height: inherit;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.title-column {
      justify-content: flex-start;
    }

    &.bold {
      font-weight: bold;
    }
  }
}

@media only screen and (max-width: 775px) {

  .displayLarge {
    display: none !important;
  }

  .estimation-history-row {
    grid-template-columns: 45% 15% 20% 20% !important;
    font-size: 13px !important;
  }
}


</style>
