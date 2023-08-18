<template>
	<button
		class="ui-connect"
		:class="{ _loading: isLoading }"
		:disabled="type === 'metamask' && !!user.walletAddress"
		@click="loginUser"
	>
		<ui-avatar
			v-if="buttonData.avatar && !isLoading"
			:src="buttonData.avatar"
		/>
		<div class="ui-connect__loading" v-else-if="isLoading" />
		<span class="ui-connect__label">{{ buttonData.label }}</span>
	</button>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { mapGetters, mapActions, mapMutations } from "vuex"
import { UserSocialProfile, UserSocials } from "~/services/user-service"

// Types
import { UiConnectType } from "~/types/ui-kit/ui-connect"

export default Vue.extend({
	name: "ui-button-connect",
	props: {
		title: {
			type: String,
			default: "Connect wallet"
		},
		type: {
			type: String,
			default: "metamask"
		} as PropOptions<UiConnectType>
	},
	data() {
		return {
			isLoading: false as boolean
		}
	},
	computed: {
		...mapGetters({
			user: "auth/getUser",
			isAuth: "auth/getIsAuth"
		}),
		buttonData(): { avatar?: string; label: string } {
			if (this.isAuthMetamask) {
				const wallet = this.user.walletAddress
				const walletStart = wallet.substr(0, 5)
				const walletEnd = wallet.substr(wallet.length - 5, wallet.length)

				return {
					label: `${walletStart}...${walletEnd}`,
					avatar: require("~/assets/img/metamask-avatar.png")
				}
			} else if (this.isAuthEpicGames) {
				return {
					label: this.user.displayedName,
					avatar: require("~/assets/img/metamask-avatar.png")
				}
			}

			const social = this.user[this.type] as UserSocialProfile
			if (social) {
				return { label: social.name || social.id, avatar: social.avatar }
			}

			return { label: this.title }
		},
		isAuthMetamask(): boolean {
			return this.type === "metamask" && this.user?.walletAddress
		},
		isAuthEpicGames(): boolean {
			return this.type === "epicGames" && this.isAuth
		}
	},
	methods: {
		...mapActions({
			getAccount: "auth/getWalletAddress",
			authUser: "auth/authUser",
			updateUser: "auth/updateUser"
		}),
		...mapMutations({
			setRedirectUrl: "auth/setRedirectUrl"
		}),
		auth(service: UiConnectType) {
			const path = service === "epicGames" ? UserSocials.EPIC_GAMES : service
			this.$cookies.set("auth-redirect-url", this.$route.path)
			window.location.href = `${process.env.BASE_API_URL}auth/${path}`
		},
		async metamaskAuth() {
			this.isLoading = true

			try {
				const wallet = await this.getAccount()

				if (wallet) {
					if (!this.user.id) {
						await this.authUser(wallet)
					} else {
						await this.updateUser({ walletAddress: wallet })
					}
				}
			} catch (error: any) {
				this.$message.error(error?.response?.data?.message || error.message)
			}

			this.isLoading = false
		},
		loginUser(): void {
			if (this.type === "metamask" && !this.isAuthMetamask) {
				this.metamaskAuth()
			} else if (!this.isAuth) {
				this.auth(this.type)
			}
		}
	}
})
</script>
