export interface ApiResponseList<T> {
	items: T[]
	count: number
}

export interface ApiNft {
	chain: string
	claimed: number
	count: number
	createdAt: string
	description: string
	expiredAt: string
	id: number
	image: string
	name: string
	scores: number
	shortDescription: string
	status: ApiNftStatus
	updatedAt: string
}

export type ApiNftStatus = "locked" | ""
