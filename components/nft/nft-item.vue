<template>
	<button class="nft__item" @click="toDetail">
		<span class="nft__item-count">
			<icon-lightning />
			+{{ data.scores }} up
		</span>
		<span class="nft__item-content">
			<span class="nft__item-img">
				<img :src="data.image" />
			</span>
			<span class="nft__item-name">{{ data.name }}</span>
			<span class="nft__item-description">
				{{ data.shortDescription }}
			</span>
			<ui-button @click="claim" isHighlight isGradient>
				{{ isAuth ? "Coming soon" : "Claim +" }}
			</ui-button>
		</span>
		<img src="~/assets/img/temp/fortnite-logo.png" class="nft__item-logo" />
	</button>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"
import { mapGetters } from "vuex"

// Icons
import iconLightning from "~/assets/img/icons/icon-lightning.svg"

// Components
import { message } from "ant-design-vue"

// Interfaces
import { ApiNft } from "~/types/api"
import { UserSocials } from "~/services/user-service"

export default Vue.extend({
	name: "nft-item",
	components: {
		iconLightning
	},
	props: {
		data: Object as PropOptions<ApiNft>
	},
	methods: {
		toDetail() {
			this.$router.push(`/nft/${this.data.id}`)
		},
		auth() {
			const path = UserSocials.EPIC_GAMES
			this.$cookies.set("auth-redirect-url", this.$route.path)
			window.location.href = `${process.env.BASE_API_URL}auth/${path}`
		},
		claim() {
			this.$stopEvents()

			if (!this.isAuth) {
				this.auth()
			} else {
				message.info("Coming soon")
			}
		}
	},
	computed: {
		...mapGetters({
			isAuth: "auth/getIsAuth"
		})
	}
})
</script>
