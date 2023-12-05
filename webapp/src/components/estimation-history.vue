<template>
    <div class="estimation-history-wrapper">
        <div class="estimation-history-heading">Abgeschlossene Schätzungen</div>
        <div class="estimation-history-row">
            <div class="estimation-history-list-column title-column bold">Name</div>
            <div class="estimation-history-list-column bold">AVG</div>
            <div class="estimation-history-list-column bold">Abweichung</div>
            <div class="estimation-history-list-column bold">Stimmen</div>
            <div class="estimation-history-list-column bold">Erstellt am</div>
        </div>
        <div class="estimation-history-row" v-for="eHistoryItem in estimationHistory" :key="eHistoryItem.id">
            <div class="estimation-history-list-column title-column">{{ eHistoryItem.title }}</div>
            <div class="estimation-history-list-column">{{ eHistoryItem.evaluation.avg }}</div>
            <div class="estimation-history-list-column">{{ eHistoryItem.evaluation.deviation }}</div>
            <div class="estimation-history-list-column">{{ eHistoryItem.evaluation.amountOfVotes }}</div>
            <div class="estimation-history-list-column">{{ formattedDate(eHistoryItem.createdAt) }}</div>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import {formatDate} from "@/services/util";

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
  height: 25%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 4px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;

  .estimation-history-heading {
    border-bottom: 2px solid #d7d7d7;
    padding: 6px;
    font-weight: bold;
  }

  .estimation-history-row {
    display: grid;
    grid-template-columns: 35% 15% 15% 15% 20%
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

    &.title-column {
      justify-content: flex-start;
    }

      &.bold {
          font-weight: bold;
      }
  }
}


</style>
