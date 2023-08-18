<template>
	<client-only>
		<apex-chart
			class="ui-chart"
			:width="width"
			:type="type"
			:options="chartOptions"
			:series="series"
		/>
	</client-only>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// ApexChart component
import ApexChart from "vue-apexcharts"

// Types
import {
	UiChartOptions,
	UiChartType,
	UiChartSeries
} from "~/types/ui-kit/ui-chart"

// Lodash
import _cloneDeep from "lodash/cloneDeep"

export default Vue.extend({
	name: "ui-chart",
	components: {
		ApexChart
	},
	props: {
		width: {
			type: String,
			default: "500"
		} as PropOptions<string>,
		type: {
			type: String,
			default: "bar"
		} as PropOptions<UiChartType>,
		options: Object as PropOptions<UiChartOptions>,
		series: Array as PropOptions<UiChartSeries>
	},
	computed: {
		chartOptions(): UiChartOptions {
			const options = _cloneDeep(this.options)

			if (options?.chart) {
				options.chart.fontFamily = "SF Pro Display"
				options.chart.width = "100%"
			} else {
				options.chart = {
					fontFamily: "SF Pro Display",
					width: "100%"
				}
			}

			if (options?.grid) {
				options.grid.borderColor = "#37394B"
			} else {
				options.grid = {
					borderColor: "#37394B"
				}
			}

			return options
		}
	}
})
</script>
