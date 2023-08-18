<template>
	<div class="index" :class="{ _loading: isLoading }">
		<h1 class="index__title">Claim rewards for being a gamer!</h1>
		<h1 class="index__subtitle">
			Save your achievements across games in form of NFT. Get more rewards for
			more achievements.
		</h1>
		<div class="nft__items">
			<nft-item v-for="(nft, index) in nftList" :key="index" :data="nft" />
		</div>

		<div class="index__soon">
			<p class="index__soon-title">More achievements are coming soon</p>
			<ul class="index__soon-names">
				<li
					class="index__soon-name"
					v-for="name in comingSoonNames"
					:key="name"
				>
					{{ name }}
				</li>
			</ul>
			<div class="index__soon-list">
				<img
					v-for="(img, index) in comingSoon"
					:key="index"
					:src="img"
					class="index__soon-item"
				/>
			</div>
		</div>

		<div class="index__building">
			<p class="index__building-title">
				Start building your metaverse resume now and get prepared for
				play-and-earn era
			</p>
			<div class="index__building-list">
				<div
					class="index__building-item"
					v-for="{ title, description } in building"
					:key="title"
				>
					<p class="index__building-subtitle">{{ title }}</p>
					<p class="index__building-description">{{ description }}</p>
				</div>
			</div>
		</div>

		<div class="index__rewards">
			<p class="index__rewards-title">
				Special rewards for achievements holders
			</p>
			<div class="index__rewards-list">
				<div
					class="index__reward"
					v-for="{ img, title, subtitle, date, isBig } in rewards"
					:key="title"
					:class="{ _big: isBig }"
				>
					<img class="index__reward-img" :src="img" />
					<p class="index__reward-title">{{ title }}</p>
					<p class="index__reward-subtitle">{{ subtitle }}</p>
					<p class="index__reward-date">{{ date }}</p>
					<ui-button @click="auth" isHighlight isGradient size="large">
						{{ isAuth ? "Coming soon" : "Apply" }}
					</ui-button>
				</div>
			</div>
		</div>

		<div class="index__about">
			<p class="index__about-title">About --------</p>
			<p class="index__about-description" v-text="aboutDescription" />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue"
import { mapActions, mapGetters } from "vuex"

// Components
const nftItem = () =>
	import(/* webpackChunkName: "nft-item" */ "~/components/nft/nft-item.vue")
import { message } from "ant-design-vue"

// Types
import { ApiNft } from "~/types/api"
import { UserSocials } from "~/services/user-service"

export default Vue.extend({
	name: "page-index",
	components: {
		nftItem
	},
	head() {
		return {
			title: "Fortnite"
		}
	},
	layout: "index",
	async fetch(): Promise<void> {
		this.isLoading = true

		await this.fetchNftList()

		this.isLoading = false
	},
	data() {
		return {
			isLoading: true as boolean,
			comingSoonNames: [
				"Fortnite",
				"Valorant",
				"Battlefield V",
				"CoD: Warzone",
				"Apex Legends",
				"CS:GO",
				"Rainbow Six"
			],
			comingSoon: [
				require("~/assets/img/temp/fortnite-soon-1.jpg"),
				require("~/assets/img/temp/fortnite-soon-2.jpg"),
				require("~/assets/img/temp/fortnite-soon-3.jpg"),
				require("~/assets/img/temp/fortnite-soon-4.jpg"),
				require("~/assets/img/temp/fortnite-soon-5.jpg"),
				require("~/assets/img/temp/fortnite-soon-6.jpg"),
				require("~/assets/img/temp/fortnite-soon-1.jpg"),
				require("~/assets/img/temp/fortnite-soon-2.jpg"),
				require("~/assets/img/temp/fortnite-soon-3.jpg"),
				require("~/assets/img/temp/fortnite-soon-4.jpg"),
				require("~/assets/img/temp/fortnite-soon-5.jpg"),
				require("~/assets/img/temp/fortnite-soon-6.jpg")
			],
			building: [
				{
					title: "play",
					description:
						"Get special rewards and game sponsorships from skill guilds and our partners for scoring more achievements"
				},
				{
					title: "own",
					description:
						"Achievements are stored on blockchain and belong to you forever. You will be able to brag to your grand children"
				},
				{
					title: "earn",
					description:
						"You will be able to use your achievements for receiving sponsorships in your favorite games"
				}
			],
			rewards: [
				{
					img: require("~/assets/img/temp/fortnite-reward-1.png"),
					title: "$10.000 Airdrop",
					subtitle: "Distributed among 100 winners",
					date: "May, 7st",
					isBig: false
				},
				{
					img: require("~/assets/img/temp/fortnite-reward-2.png"),
					title: "100 metaversе boxes",
					subtitle: "NFTs and tokens from the best metaverse projects",
					date: "May, 21st",
					isBig: true
				},
				{
					img: require("~/assets/img/temp/fortnite-reward-3.png"),
					title: "50 sponsorships",
					subtitle: "In your favorite games",
					date: "June, 7st",
					isBig: false
				}
			],
			aboutDescription:
				"We are changing how gamers perceive gaming; our vision is to create an ecosystem that rewards their passion for gaming by allowing them to generate a source of income. \n \n We are helping to make this dream a reality by providing gamers with reliable information and a platform to facilitate their introduction to the space."
		}
	},
	computed: {
		...mapGetters({
			getNftList: "nft/getNftList",
			isAuth: "auth/getIsAuth"
		}),
		nftList(): ApiNft[] {
			if (this.isLoading) {
				return this.loadingNftList
			}

			return this.getNftList
		},
		loadingNftList(): ApiNft[] {
			return [
				{
					chain: "loading",
					claimed: 0,
					count: 0,
					createdAt: "loading",
					description: "loading",
					expiredAt: "loading",
					id: 0,
					image: "loading",
					name: "loading",
					scores: 0,
					shortDescription: "loading",
					status: "",
					updatedAt: "loading"
				},
				{
					chain: "loading",
					claimed: 0,
					count: 0,
					createdAt: "loading",
					description: "loading",
					expiredAt: "loading",
					id: 0,
					image: "loading",
					name: "loading",
					scores: 0,
					shortDescription: "loading",
					status: "",
					updatedAt: "loading"
				},
				{
					chain: "loading",
					claimed: 0,
					count: 0,
					createdAt: "loading",
					description: "loading",
					expiredAt: "loading",
					id: 0,
					image: "loading",
					name: "loading",
					scores: 0,
					shortDescription: "loading",
					status: "",
					updatedAt: "loading"
				},
				{
					chain: "loading",
					claimed: 0,
					count: 0,
					createdAt: "loading",
					description: "loading",
					expiredAt: "loading",
					id: 0,
					image: "loading",
					name: "loading",
					scores: 0,
					shortDescription: "loading",
					status: "",
					updatedAt: "loading"
				},
				{
					chain: "loading",
					claimed: 0,
					count: 0,
					createdAt: "loading",
					description: "loading",
					expiredAt: "loading",
					id: 0,
					image: "loading",
					name: "loading",
					scores: 0,
					shortDescription: "loading",
					status: "",
					updatedAt: "loading"
				}
			]
		}
	},
	methods: {
		...mapActions({
			fetchNftList: "nft/fetchNftList"
		}),
		auth() {
			if (!this.isAuth) {
				const path = UserSocials.EPIC_GAMES
				this.$cookies.set("auth-redirect-url", this.$route.path)
				window.location.href = `${process.env.BASE_API_URL}auth/${path}`
			} else {
				message.info("Coming soon")
			}
		}
	}
})
</script>
