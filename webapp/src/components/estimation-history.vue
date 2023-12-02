<template>
    <div class="estimation-history-wrapper">
        <div v-for="eHistoryItem in estimationHistory" :key="eHistoryItem.id">
            {{ eHistoryItem.title }}
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";

export default {
    name: "Estimation-History",
    components: {

    },
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
  height: 33%;
  background-color: #9f9214;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}


</style>
