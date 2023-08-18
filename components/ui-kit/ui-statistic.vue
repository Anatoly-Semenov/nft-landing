<template>
	<div class="ui-statistic" :class="{ _loading: isLoading }">
		<template v-if="title">
			<ui-tooltip :title="tooltip" v-if="tooltip">
				<p class="ui-statistic__title">
					{{ isLoading ? "Loading" : title }}
					<icon-info class="ui-statistic__info" />
				</p>
			</ui-tooltip>
			<p class="ui-statistic__title" v-else>
				{{ isLoading ? "Loading" : title }}
			</p>
		</template>
		<p class="ui-statistic__data">
			<span class="ui-statistic__data-text">
				{{ isLoading ? "Loading" : data }}
			</span>
			<ui-delta :value="deltaValue" :type="deltaValueType" :units="units" />
		</p>
	</div>
</template>

<script lang="ts">
import Vue from "vue"

// Icons
const iconInfo = () =>
	import(/* webpackChunkName: "icon-info" */ "~/assets/img/icons/icon-info.svg")

export default Vue.extend({
	name: "ui-statistic",
	components: {
		iconInfo
	},
	props: {
		title: String,
		tooltip: String,
		data: [String, Number],
		deltaValue: [String, Number],
		deltaValueType: String,
		units: String,
		isLoading: Boolean
	}
})
</script>
