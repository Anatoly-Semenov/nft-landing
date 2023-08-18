<template>
	<div class="nft__connect">
		<p class="nft__connect-title">
			Create an account to start claiming rewards
		</p>
		<div class="nft__connect-list">
			<div class="nft__connect-item" :class="{ __connected: isAuth }">
				<p class="nft__connect-text">
					<transition name="fade-in">
						<ui-icon
							type="check-circle"
							theme="filled"
							color="var(--color-highlight)"
							v-if="isAuth"
						/>
					</transition>
					1. Connect epic games account
				</p>
				<ui-connect slot="element" title="Connect" type="epicGames" />
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "nft-connect",
	data() {
		return {}
	},
	computed: {
		...mapGetters({
			isAuth: "auth/getIsAuth"
		})
	}
}
</script>
