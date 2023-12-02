<template>
    <div class="estimation-history-wrapper">
        <div class="estimation-history-header">Abgeschlossene Schätzungen</div>
        <div v-for="eHistoryItem in estimationHistory" :key="eHistoryItem.id">
            {{ eHistoryItem.title }}
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";

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
    methods: {},
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

    .estimation-history-header {
        border-bottom: 2px solid #d7d7d7;
        padding: 6px;
        font-weight: bold;
    }
}


</style>
