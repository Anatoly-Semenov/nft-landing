import { MutationTree, ActionTree, GetterTree } from "vuex"
import { User, UserSocials } from "~/services/user-service"

export const state = () => ({
	loading: false,
	redirectUrl: "",
	accessToken: "",
	signature: "",
	user: {} as User
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setAccessToken(state, token: string) {
		state.accessToken = token
	},
	setUserData(state, user: User) {
		state.user = user
	},
	clearUserData(state) {
		state.user = {} as User
	},
	setNonce(state, nonce: string) {
		state.user.nonce = nonce
	},
	setWalletAddress(state, address: string) {
		state.user.walletAddress = address
	},
	setSignature(state, signature: string) {
		state.signature = signature
	},
	setLoading(state, loading: boolean) {
		state.loading = loading
	},
	setRedirectUrl(state, url: string) {
		state.redirectUrl = url
	}
}

export const actions: ActionTree<RootState, RootState> = {
	async getWalletAddress({ commit }): Promise<string> {
		if (!window.ethereum) {
			throw new Error("Metamask is not installed")
		}

		let accounts = await window.ethereum.request({
			method: "eth_requestAccounts"
		})

		if (!accounts.length && !accounts[0] && window.ethereum) {
			accounts = await window.ethereum.enable()
		}

		// commit("setWalletAddress", accounts[0])
		return accounts[0]
	},
	async createNonce({ commit }, walletAddress: string) {
		commit("setLoading", true)

		try {
			const { nonce } = await this.$authApi.createNonce({ walletAddress })
			commit("setNonce", nonce)
		} catch (error) {
			commit("setNonce", "")
		} finally {
			commit("setLoading", false)
		}
	},
	async createSignature({ state, commit }) {
		commit("setLoading", true)

		const nonce = state.user.nonce

		if (!nonce) {
			return false
		}

		try {
			const message = `I am signing my one-time nonce: ${nonce}`

			const signature = await this.$web3.eth.personal.sign(
				message,
				state.user.walletAddress,
				nonce
			)

			commit("setSignature", signature)
		} catch (error) {
			commit("setSignature", "")
		} finally {
			commit("setLoading", false)
		}
	},
	async verifySignature(
		_,
		data: {
			walletAddress: string
			signature: string
			nonce: string
		}
	) {
		const { status } = await this.$authApi.verifySign(data)
		// Implement logic here
	},
	async authUser({ commit, dispatch }, walletAddress: string) {
		commit("setLoading", true)

		try {
			const { accessToken } = await this.$authApi.signIn({ walletAddress })

			this.$authApi.setAccessToken(accessToken)
			commit("setAccessToken", accessToken)
			dispatch("fetchCurrentUser")
		} catch (error) {
			this.$authApi.logout()
			commit("setAccessToken", "")
		} finally {
			commit("setLoading", false)
		}
	},
	async fetchCurrentUser({ commit }) {
		commit("setLoading", true)

		try {
			const user = await this.$userApi.getCurrent()
			console.log("setUserData")
			commit("setUserData", user)
		} catch (e) {
			commit("clearUserData")
		} finally {
			commit("setLoading", false)
		}
	},
	async connectSocialAccount(
		{ state, commit },
		data: { provider: UserSocials; code: string }
	) {
		commit("setLoading", true)

		try {
			const user = await this.$userApi.connectSocial(
				state.user.id,
				data.provider,
				data.code
			)

			commit("setUserData", user)
		} catch (error: any) {
			console.log(error.message)
			// Todo: Add error handler
			// this.$message.error(error.message)
		} finally {
			commit("setLoading", false)
		}
	},
	async authUserBySocial(
		{ commit },
		data: { provider: UserSocials; code: string }
	) {
		commit("setLoading", true)

		try {
			const { accessToken } = await this.$authApi.signBySocial(data)

			this.$authApi.setAccessToken(accessToken)
			commit("setAccessToken", accessToken)
		} catch (error) {
			this.$authApi.logout()
			commit("setAccessToken", "")
		} finally {
			commit("setLoading", false)
		}
	},
	async updateUser({ commit, state }, data: Partial<User>) {
		if (!state.user.id) return
		commit("setLoading", true)

		await this.$userApi.update(state.user.id, data)
		commit("setUserData", { ...state.user, ...data })
		commit("setLoading", false)
	}
}

export const getters: GetterTree<RootState, RootState> = {
	getWalletAddress: (state) => state.user.walletAddress,
	getSignature: (state) => state.signature,
	getNonce: (state) => state.user.nonce,
	getUser: (state): User => state.user,
	getIsAuth: (state): boolean => {
		return !!(state.user?.epicGames?.id && state.user?.epicGames?.name)
	}
}
