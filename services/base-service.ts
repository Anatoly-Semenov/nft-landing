import { NuxtAxiosInstance } from "@nuxtjs/axios"
import { Context } from "@nuxt/types"
import { Store } from "vuex"

export default class BaseService {
	httpClient: NuxtAxiosInstance
	cookies
	redirect: (path: string) => void
	store: Store<any>

	constructor({ $axios, app, redirect, store }: Context) {
		this.httpClient = $axios
		this.cookies = app.$cookies
		this.redirect = redirect
		this.store = store
	}
}
