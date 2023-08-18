<template>
	<div class="layout">
		<div class="layout__container">
			<div class="layout__header">
				<nuxt-link class="layout__header-logo" to="/">
					<img
						src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
					/>
				</nuxt-link>
				<ui-connect
					v-if="!isAuth"
					slot="element"
					title="Connect epic games"
					type="epicGames"
				/>
				<ui-dropdown
					v-else
					v-model="isDropProfile"
					@change="isDropProfile = !isDropProfile"
					placement="bottomRight"
					trigger="click"
				>
					<ui-connect slot="element" title="Epic Games" type="epicGames" />
					<ui-menu class="layout__header-dropdown" slot="drop">
						<ui-menu-item>
							<nuxt-link to="/profile">
								<ui-icon type="user" />
								Profile
							</nuxt-link>
						</ui-menu-item>
						<ui-menu-item>
							<button @click="$authApi.logout()">
								<ui-icon type="logout" />
								Logout
							</button>
						</ui-menu-item>
					</ui-menu>
				</ui-dropdown>
			</div>
			<div class="layout__content">
				<Nuxt />
			</div>
			<div class="layout__footer">
				<img
					class="layout__footer-background"
					src="~/assets/img/background-footer.png"
				/>
				<div class="layout__footer-social">
					<p class="layout__footer-title">Don’t miss our updates!</p>
					<p class="layout__footer-subtitle">
						Connect with us and be the first to see the latest updates
					</p>
					<div class="layout__footer-buttons">
						<ui-button
							v-for="{ text, link, icon } in social"
							:key="text"
							@click="toLink(link)"
							isHighlight
							isGradient
							size="large"
						>
							<component slot="left-icon" :is="icon" />
							{{ text }}
						</ui-button>
					</div>
				</div>
				<div class="layout__footer-intro">
					<img
						src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
						class="layout__footer-logo"
					/>
					<a href="mailto:hello@google.com" class="layout__footer-mail">
						hello@google.com
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapGetters } from "vuex"

// Icons
import iconTwitter from "../assets/img/icons/social/icon-twitter.svg"
import iconDiscord from "../assets/img/icons/social/icon-discord.svg"
import iconMedium from "../assets/img/icons/social/icon-medium.svg"
import iconTelegram from "../assets/img/icons/social/icon-telegram.svg"

export default Vue.extend({
	name: "layout-index",
	data() {
		return {
			isDropProfile: false as boolean,
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
					text: "Medium",
					link: "https://skilllabs.medium.com/",
					icon: iconMedium
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
	},
	computed: {
		...mapGetters({
			isAuth: "auth/getIsAuth"
		})
	}
})
</script>
