import Web3 from "web3"
import { Plugin } from "@nuxt/types"

declare global {
	interface Window {
		ethereum: any
	}
}

declare module "vue/types/vue" {
	interface Vue {
		$web3: Web3
	}
}

declare module "@nuxt/types" {
	interface NuxtAppOptions {
		$web3: Web3
	}

	interface Context {
		$web3: Web3
	}
}

declare module "vuex/types/index" {
	interface Store<S> {
		$web3: Web3
	}
}

const web3Plugin: Plugin = ({ store, app }, inject) => {
	let instance = null

	if (window?.ethereum) {
		instance = new Web3(window.ethereum)

		window.ethereum.on("accountsChanged", async (accounts: string[]) => {
			if (accounts.length === 0) {
				await app.$authApi.logout()
			}

			if (
				store.state.auth.user.id &&
				store.state.auth.user.walletAddress !== accounts[0]
			) {
				const wallet = await store.dispatch("auth/getWalletAddress")
				await store.dispatch("auth/authUser", wallet)
			}
		})

		window.ethereum.on("networkChanged", async () => {
			if (store.state.user.id) {
				const wallet = await store.dispatch("auth/getWalletAddress")
				await store.dispatch("auth/authUser", wallet)
			}
		})
	}

	inject("web3", instance)
}

export default web3Plugin
