<template>
	<div class="nft__reward" :class="{ _loading: isLoading }">
		<div
			class="nft__reward-img"
			:style="`background-image: url(${data.img});`"
		/>
		<ui-tag color="var(--color-highlight)">Live</ui-tag>
		<div class="nft__reward-text">
			<p class="nft__reward-description">{{ data.description }}</p>
			<p class="nft__reward-name">{{ data.name }}</p>
		</div>
		<ui-button size="large" isGradient>Whitelist +</ui-button>
		<p class="nft__reward-timer">
			<icon-timer />
			Ends in: 2d 12h 30m
		</p>
	</div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// Icons
const iconTimer = () =>
	import(
		/* webpackChunkName: "icon-timer" */ "~/assets/img/icons/icon-timer.svg"
	)

interface Reward {
	img: string
	name: string
	description: string
	started_at: string
	finished_at: string
}

export default Vue.extend({
	name: "nft-reward",
	components: {
		iconTimer
	},
	props: {
		data: Object as PropOptions<Reward>,
		isLoading: Boolean as PropOptions<boolean>
	},
	data() {
		return {}
	}
})
</script>
