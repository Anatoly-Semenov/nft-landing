import BaseService from "~/services/base-service"
import { Context } from "@nuxt/types"
import { ApiNft, ApiResponseList } from "~/types/api"

export default class NftService extends BaseService {
	constructor(ctx: Context) {
		super(ctx)
	}

	getNftList(): Promise<ApiResponseList<ApiNft>> {
		return this.httpClient.$get("/nfts", {
			params: {
				gameId: 160
			}
		})
	}

	getNft(id: string): Promise<ApiNft> {
		return this.httpClient.$get(`/nfts/${id}`, {
			params: {
				game: "fortnite"
			}
		})
	}

	getAirdropList(): Promise<ApiResponseList<any>> {
		return this.httpClient.$get("/airdrops", {
			params: {
				game: "fortnite"
			}
		})
	}

	getAirdrop(id: string): Promise<any> {
		return this.httpClient.$get(`/airdrops/${id}`, {
			params: {
				game: "fortnite"
			}
		})
	}
}
