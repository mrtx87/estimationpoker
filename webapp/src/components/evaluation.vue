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

ECharts.registerTheme("custom", {...theme, backgroundColor: 'transparent'});
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
                    text: '',
                    subtext: ''
                }, {
                    title: '',
                    data: [
                        {value: 55, name: 'afd'},
                        {value: 25, name: 'cdu'},
                        {value: 13, name: 'grüne'},
                        {value: 7, name: 'spd'}
                    ]
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
