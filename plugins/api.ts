import { Plugin } from "@nuxt/types"
import { NuxtCookies } from "cookie-universal-nuxt"
import AuthService from "~/services/auth-service"
import UserService from "~/services/user-service"
import NftService from "~/services/nft-service"

declare module "vue/types/vue" {
	interface Vue {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
	}
}

declare module "@nuxt/types" {
	interface NuxtAppOptions {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
		$cookies: NuxtCookies
	}

	interface Context {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
	}
}

declare module "vuex/types/index" {
	interface Store<S> {
		$authApi: AuthService
		$userApi: UserService
		$nftApi: NftService
	}
}

const web3Plugin: Plugin = (ctx, inject) => {
	const userService = new UserService(ctx)
	const authService = new AuthService(ctx)
	const nftService = new NftService(ctx)

	inject("userApi", userService)
	inject("authApi", authService)
	inject("nftApi", nftService)
}

export default web3Plugin
