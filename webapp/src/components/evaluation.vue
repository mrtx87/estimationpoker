<template>
    <div class="eval-wrapper">
        <div class="eval-chart-container">
            <chart v-if="donut" class="echarts" theme="custom" :options="donut" :initOptions="initOptions" ref="chart1"></chart>
        </div>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import theme from "echarts/src/theme/dark";
import ECharts from "vue-echarts/components/ECharts.vue";

import "echarts/lib/chart/pie";
import "echarts/theme/dark";
import {getPieChartObj, mapValuesByAmount} from "@/services/util";

ECharts.registerTheme("custom", {
    ...theme, backgroundColor: 'transparent', legend: {
        textStyle: {
            color: 'black',
            fontSize: '18'
        }
    },
    textStyle: {
        color: 'black'
    },
    title: {
        textStyle: {
            color: 'black'
        }
    }
});
export default {
    name: "Evaluation",
    components: {
        chart: ECharts
    },
    props: ['estimation'],
    created() {
        this.appStore = useAppStateStore();
        this.refreshEvaluationChart(this.estimation);
    },
    watch: {
        estimation(nextEstimation, previousEstimation) {
            this.refreshEvaluationChart(nextEstimation);
        }
    },
    data: function () {
        return {
            appStore: null,
            donut: null,
            initOptions: {
                width: '450px',
                height: '250px',
                useDirtyRect: true,
            }
        }
    },
    methods: {
        refreshEvaluationChart(nextEstimation) {
            if (nextEstimation) {
                this.donut = getPieChartObj({
                        text: '',//`avg: ${nextEstimation.evaluation.avg} \n\n deviation: ${nextEstimation.evaluation.deviation}`,
                        subtext: '' //`Abgegebene Votes: ${nextEstimation.evaluation.amountOfVotes}`
                    }, {
                        title: nextEstimation.title,
                        data: mapValuesByAmount(nextEstimation.evaluation.valuesByAmount),
                        color: nextEstimation.evaluation.valuesByAmount.map(v => v.voteValue.color)
                    }
                )
            }
        }
    },
    computed: {}
};
</script>

<style lang="scss">

.eval-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;

}

.eval-chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
}

.echarts {
    width: 100%;
    height: min-content;
    overflow: hidden;
}

</style>
