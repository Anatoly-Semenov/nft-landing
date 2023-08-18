import { Context } from "@nuxt/types"
import BaseService from "./base-service"
import { UserSocials } from "./user-service"

export default class AuthService extends BaseService {
	constructor(ctx: Context) {
		super(ctx)
	}

	createNonce(data: { walletAddress: string }): Promise<{ nonce: string }> {
		return this.httpClient.$post("/auth/nonce", data)
	}

	verifySign(data: {
		walletAddress: string
		signature: string
		nonce: string
	}): Promise<{ status: "success" | "fail" }> {
		return this.httpClient.$post("/auth/signature", data)
	}

	signIn(data: { walletAddress: string }): Promise<{ accessToken: string }> {
		return this.httpClient.$post("/auth/signin", data)
	}

	signBySocial({
		provider,
		code
	}: {
		provider: UserSocials
		code: string
	}): Promise<{ accessToken: string }> {
		return this.httpClient.$get(`/auth/${provider}/callback`, {
			params: { code }
		})
	}

	setAccessToken(accessToken: string) {
		this.cookies.set("accessToken", accessToken, {
			maxAge: 24 * 60 * 60 * 1000,
			path: "/"
		})
	}

	logout(redirectTo: string = "/") {
		this.cookies.remove("accessToken")
		this.store.commit("auth/clearUserData")
		this.store.commit("auth/setAccessToken", "")
		this.redirect(redirectTo)
	}
}
