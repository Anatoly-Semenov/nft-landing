import { Plugin } from "@nuxt/types"

declare module "vue/types/vue" {
	// this.$formatNumber inside Vue components
	interface Vue {
		$formatNumber(value: number): string
	}
}

declare module "@nuxt/types" {
	// nuxtContext.app.$formatNumber inside asyncData, fetch, plugins, middleware, nuxtServerInit
	interface NuxtAppOptions {
		$formatNumber(value: number): string
	}
	// nuxtContext.$formatNumber
	interface Context {
		$formatNumber(value: number): string
	}
}

declare module "vuex/types/index" {
	// this.$formatNumber inside Vuex stores
	interface Store<S> {
		$formatNumber(value: number): string
	}
}

const formatNumberPlugin: Plugin = ({ $formatNumber }, inject) => {
	const f = (x: number): number => {
		return x.toString().includes(".")
			? x.toString().split(".").pop()!.length
			: 0
	}

	const formatNumber = (value: number) => {
		let formatValue: string | number = Math.abs(value)

		if (formatValue >= 1000000) {
			formatValue = formatValue / 1000000

			formatValue = `${
				f(formatValue) > 0 ? formatValue.toFixed(1) : formatValue
			} mln.`
		} else if (formatValue >= 1000) {
			formatValue = formatValue / 1000
			formatValue = `${
				f(formatValue) > 0 ? formatValue.toFixed(1) : formatValue
			} k`
		}

		return formatValue
	}

	inject("formatNumber", formatNumber)
}

export default formatNumberPlugin
