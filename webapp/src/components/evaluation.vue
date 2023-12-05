<template>
    <div class="eval-wrapper">
        <chart theme="custom" :options="donut" ref="chart1" auto-resize></chart>
    </div>
</template>

<script>

import {useAppStateStore} from "@/stores/app-state";
import theme from "echarts/src/theme/dark";
import ECharts from "vue-echarts/components/ECharts.vue";

import "echarts/lib/chart/pie";
import "echarts/theme/dark";
import {getPieChartObj} from "@/services/util";
import {chart_colors, t42_1} from "@/constants/vue-constants";

ECharts.registerTheme("custom", {
    ...theme, backgroundColor: 'transparent', legend: {
        textStyle: {
            color: 'black'
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
    },
    data: function () {
        return {
            appStore: null,
            donut: getPieChartObj({
                    text: 'avg: 3.5 \n\n deviation: 5',
                    subtext: 'Abgegebene Votes: 10'
                }, {
                    title: '',
                    data: [
                        {value: 55, name: 'afd'},
                        {value: 25, name: 'cdu'},
                        {value: 13, name: 'grüne'},
                        {value: 7, name: 'spd'}
                    ],
                    color: chart_colors
                }
            )
        }
    },
    methods: {},
    computed: {}
};
</script>

<style lang="scss">

.eval-wrapper {

}

</style>
