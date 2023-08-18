<template>
	<div></div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
	name: "page-nft",
	async asyncData({ query, store, app, params, redirect }) {
		const redirectUrl = app.$cookies.get("auth-redirect-url")
		const { code } = query
		const { provider } = params

		try {
			if (code && provider) {
				const user = store.state.auth.user

				if (user?.id) {
					await store.dispatch("auth/connectSocialAccount", { provider, code })
				} else {
					await store.dispatch("auth/authUserBySocial", { provider, code })
				}

				await store.dispatch("auth/fetchCurrentUser")
			}
		} catch (error) {
			console.log(error)
		}

		if (redirectUrl) {
			app.$cookies.remove("auth-redirect-url")
			redirect(redirectUrl)
		} else {
			redirect("/")
		}
	}
})
</script>
