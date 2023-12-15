<template>
    <div class="eval-wrapper">
        <span style="font-size: 1.3rem; font-weight: bold; padding: 10px;">{{ tl8('evaluation.evaluation') }}</span>
        <div class="eval-chart-container">
            <chart v-if="donut" class="echarts" theme="custom" :options="donut" :initOptions="initOptions" ref="chart1"
                   v-bind:autoresize="true"></chart>
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
import {tShirtVoteOptionId} from "@/constants/vue-constants";
import {languageService} from "@/services/language";

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
        this.refreshInitOptions();
        this.refreshEvaluationChart(this.estimation);
    },
    watch: {
        estimation(nextEstimation, previousEstimation) {
            this.refreshInitOptions();
            this.refreshEvaluationChart(nextEstimation);
        },
        screenDimensions(nextScreenDimensions, previousScreenDimensions) {
            this.refreshInitOptions();
            this.refreshEvaluationChart(this.estimation);
        },
        langKey(nextLangKey, previousLangKey) {
            this.refreshInitOptions();
            this.refreshEvaluationChart(this.estimation);
        }
    },
    data: function () {
        return {
            appStore: null,
            donut: null,
            initOptions: {
                width: document.body.clientWidth * 0.85,
                height: '200px',
                useDirtyRect: true,
            }
        }
    },
    methods: {
        tl8(key, vars) {
            return languageService.t(key, this.appStore.langKey, vars);
        },
        refreshEvaluationChart(nextEstimation) {
            if (nextEstimation) {
                const screenWidth = this.screenDimensions.width;
                this.donut = getPieChartObj(
                    {
                        text: `Ø - ${nextEstimation.evaluation.avg} \n\n ${this.getDeviationText(nextEstimation.evaluation.deviation)}`,
                        subtext: `${this.tl8('evaluation.submitted.votes')} ${nextEstimation.evaluation.amountOfVotes}`
                    }, {
                        title: nextEstimation.title,
                        data: mapValuesByAmount(nextEstimation.evaluation.valuesByAmount),
                        color: nextEstimation.evaluation.valuesByAmount.map(v => v.voteValue.color),
                        radius: screenWidth < 700 ? '50%' : '85%'
                    },
                    screenWidth < 700 ? '13' : '18'
                );
            }
        },
        refreshInitOptions() {
            this.initOptions = {
                width: Math.min(document.body.clientWidth * 0.85, 800),
                height: '200px',
                useDirtyRect: true,
            }
        },
        getDeviationText(deviation) {
            let semanticDescription = '';

            if (deviation === 0) {
                semanticDescription = this.tl8('evaluation.deviation.none');
            }

            if (deviation > 0 && deviation < 1) {
                semanticDescription = this.tl8('evaluation.deviation.small');
            }

            if (deviation > 1.5 && deviation < 2) {
                semanticDescription = this.tl8('evaluation.deviation.medium');
            }

            if (deviation >= 2 && deviation < 3) {
                semanticDescription = this.tl8('evaluation.deviation.large');
            }

            if (deviation > 3) {
                semanticDescription = this.tl8('evaluation.deviation.extreme');
            }

            return this.estimation.valueOptionsId !== tShirtVoteOptionId ? this.tl8('evaluation.get.deviation.text', [deviation, semanticDescription]) :
                this.tl8('evaluation.get.deviation.text2', [semanticDescription]);
        },

    },
    computed: {
        screenDimensions() {
            return this.appStore?.screenDimensions;
        },
        langKey() {
            return this.appStore?.langKey;
        }
    }
};
</script>

<style lang="scss">

.eval-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

}

.eval-chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.echarts {
  width: 100%;
  height: min-content;
}

</style>
