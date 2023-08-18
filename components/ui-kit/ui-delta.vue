<template>
	<span
		class="ui-delta"
		:class="{ _negative: isNegativeDeltaValue }"
		v-if="value"
	>
		<ui-icon type="caret-up" />
		{{ value }} {{ deltaValueSymbol }}
	</span>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// Types
import { UiDeltaType } from "~/types/ui-kit/ui-delta"

export default Vue.extend({
	name: "ui-delta",
	props: {
		value: [String, Number],
		type: {
			type: String,
			default: "text"
		} as PropOptions<UiDeltaType>,
		units: String
	},
	computed: {
		isNegativeDeltaValue(): boolean {
			return this.value < 0
		},
		deltaValueSymbol(): string {
			switch (this.type) {
				case "percents":
					return "%"
				case "coin":
					return this.units || "$"
				default:
					return ""
			}
		}
	}
})
</script>
