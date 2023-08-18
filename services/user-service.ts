import { Context } from "@nuxt/types"
import BaseService from "./base-service"

export interface UserSocialProfile {
	id: string
	name?: string
	email?: string
	avatar?: string
}

export interface User {
	id: string
	walletAddress: string
	displayedName?: string
	name?: string
	nonce?: string
	roles?: string
	email?: string
	discord?: UserSocialProfile
	twitter?: UserSocialProfile
	epicGames?: UserSocialProfile
	updatedAt?: Date
	createdAt?: Date
}

export enum UserSocials {
	DISCORD = "discord",
	TWITTER = "twitter",
	EPIC_GAMES = "epic-games"
}

export default class UserService extends BaseService {
	constructor(ctx: Context) {
		super(ctx)
	}

	getCurrent(): Promise<User> {
		return this.httpClient.$get("/users/current")
	}

	update(id: string, body: Partial<User>): Promise<void> {
		return this.httpClient.$patch(`/users/${id}`, body)
	}

	connectSocial(id: string, type: UserSocials, code: string): Promise<User> {
		return this.httpClient.$post(
			`/users/${id}/${type}`,
			{},
			{ params: { code } }
		)
	}
}
