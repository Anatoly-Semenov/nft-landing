import { NuxtConfig } from "@nuxt/types"
require("dotenv").config()

const config: NuxtConfig = {
	// Target: https://go.nuxtjs.dev/config-target
	target: "server",

	// Init .ENV variables
	env: {
		BASE_API_URL: process.env.BASE_API_URL || "https://test.api.com/"
	},

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: "Skill Labs | %s",
		title: "Skill Labs",
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" }
		],
		link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ["~/assets/styles/index.styl"],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		"~/plugins/ant-design",
		"~/plugins/axios",
		"~/plugins/global",
		"~/plugins/copy",
		"~/plugins/stop-events",
		"~/plugins/format-number",
		"~/plugins/api",
		{ src: "~/plugins/web3", ssr: false },
		{ src: "~/plugins/ui-chart", ssr: false }
	],

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		"@nuxt/typescript-build",
		"@nuxtjs/eslint-module"
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		"@nuxtjs/axios",
		// https://github.com/Developmint/nuxt-svg-loader#readme
		"nuxt-svg-loader",
		// https://github.com/microcipcip/cookie-universal/tree/master/packages/cookie-universal-nuxt#readme
		"cookie-universal-nuxt"
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		baseURL: process.env.BASE_API_URL
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
}

export default config
