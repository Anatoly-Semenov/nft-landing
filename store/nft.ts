import { ActionTree, GetterTree, MutationTree } from "vuex"
import { ApiNft, ApiResponseList } from "~/types/api"

export const state = () => ({
	nft: {
		list: null as null | ApiNft[],
		detail: null as null | ApiNft,
		count: 0 as number
	}
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
	setNftList(state, payload: ApiResponseList<ApiNft>): void {
		state.nft.list = payload.items
		state.nft.count = payload.count
	},
	setNftDetail(state, payload: ApiNft | null): void {
		state.nft.detail = payload
	}
}

export const actions: ActionTree<RootState, RootState> = {
	async fetchNftList({ commit }): Promise<void> {
		await this.$nftApi.getNftList().then((data: ApiResponseList<ApiNft>) => {
			commit("setNftList", data)
		})
	},
	async fetchNft({ commit }, id: string): Promise<void> {
		await this.$nftApi.getNft(id).then((data: ApiNft) => {
			commit("setNftDetail", data)
		})
	}
}

export const getters: GetterTree<RootState, RootState> = {
	getNftList: (state) => state.nft.list,
	getNft: (state) => state.nft.detail
}
