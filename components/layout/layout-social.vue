<template>
	<div class="layout__social">
		<p class="layout__social-title">Don’t miss our updates!</p>
		<p class="layout__social-subtitle">
			Connect with us and be the first to see the latest updates
		</p>
		<div class="layout__social-buttons">
			<ui-button
				v-for="{ text, link, icon } in social"
				:key="text"
				@click="toLink(link)"
				size="large"
				isGradient
			>
				<component :is="icon" slot="left-icon" />
				{{ text }}
			</ui-button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"

// Icons
import iconTwitter from "~/assets/img/icons/social/icon-twitter.svg"
import iconDiscord from "~/assets/img/icons/social/icon-discord.svg"
import iconTelegram from "~/assets/img/icons/social/icon-telegram.svg"

export default Vue.extend({
	name: "layout-social.vue",
	components: {
		iconTwitter,
		iconDiscord,
		iconTelegram
	},
	data() {
		return {
			social: [
				{
					text: "Twitter",
					link: "https://twitter.com/Skill_Labs_gg",
					icon: iconTwitter
				},
				{
					text: "Discord",
					link: "https://discord.com/invite/skilllabs",
					icon: iconDiscord
				},
				{
					text: "Telegram",
					link: "https://t.me/skilllabs",
					icon: iconTelegram
				}
			]
		}
	},
	methods: {
		toLink(link: string): void {
			window.open(link, "_blank")!.focus()
		}
	}
})
</script>
