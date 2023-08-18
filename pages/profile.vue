<template>
	<div class="profile">
		<div class="profile__info">
			<ui-avatar :src="logo" />
			<p class="profile__info-name">My Name</p>
		</div>
		<div class="profile__social">
			<ui-connect title="Discord" type="discord" />
			<ui-connect title="Twitter" type="twitter" />
		</div>
		<div
			class="profile__achievements"
			v-for="({ title, subtitle, nftList }, index) in achievements"
			:key="index"
		>
			<p class="profile__achievements-title">{{ title }}</p>
			<p class="profile__achievements-subtitle">{{ subtitle }}</p>
			<div class="profile__achievements-list">
				<nft-item v-for="(nft, index) in nftList" :key="index" :data="nft" />
			</div>
		</div>

		<div class="profile__games">
			<p class="profile__games-title">More games</p>
			<p class="profile__games-subtitle">Coming soon</p>
			<div class="profile__games-list">
				<div
					class="profile__game"
					v-for="({ img, name }, index) in games"
					:key="index"
				>
					<img :src="img" class="profile__game-img" />
					<p class="profile__game-name">{{ name }}</p>
				</div>
			</div>
		</div>

		<nft-faq />
	</div>
</template>

<script lang="ts">
import Vue from "vue"

// Components
const nftItem = () =>
	import(/* webpackChunkName: "nft-item" */ "~/components/nft/nft-item.vue")
const nftFaq = () =>
	import(/* webpackChunkName: "nft-faq" */ "~/components/nft/nft-faq.vue")

export default Vue.extend({
	name: "page-profile",
	layout: "index",
	transition: "fade-in",
	components: {
		nftItem,
		nftFaq
	},
	data() {
		return {
			logo: require("~/assets/img/metamask-avatar.png"),
			achievements: [
				{
					title: "Fortnite achievements",
					subtitle: "You can now collect the achievements you have unlocked",
					nftList: [
						{
							counter: 2,
							id: 1,
							image: "https://i.ibb.co/RzKF50N/fortnite-5.png",
							name: "Started the journey",
							description:
								"Have an account in Fortnite that is registered more than 7 days ago"
						},
						{
							counter: 2,
							id: 1,
							image: "https://i.ibb.co/RzKF50N/fortnite-5.png",
							name: "Started the journey",
							description:
								"Have an account in Fortnite that is registered more than 7 days ago"
						},
						{
							counter: 2,
							id: 1,
							image: "https://i.ibb.co/RzKF50N/fortnite-5.png",
							name: "Started the journey",
							description:
								"Have an account in Fortnite that is registered more than 7 days ago"
						}
					]
				},
				{
					title: "Locked achievements",
					subtitle: "Play harder to unlock more rewards",
					nftList: [
						{
							counter: 2,
							id: 1,
							image: "https://i.ibb.co/RzKF50N/fortnite-5.png",
							name: "Started the journey",
							description:
								"Have an account in Fortnite that is registered more than 7 days ago"
						},
						{
							counter: 2,
							id: 1,
							image: "https://i.ibb.co/RzKF50N/fortnite-5.png",
							name: "Started the journey",
							description:
								"Have an account in Fortnite that is registered more than 7 days ago"
						}
					]
				}
			],
			games: [
				{
					img: require("~/assets/img/temp/fortnite-soon-2.jpg"),
					name: "CS GO"
				},
				{
					img: require("~/assets/img/temp/fortnite-soon-1.jpg"),
					name: "Valorant"
				},
				{
					img: require("~/assets/img/temp/fortnite-soon-3.jpg"),
					name: "Apex"
				},
				{
					img: require("~/assets/img/temp/fortnite-soon-4.jpg"),
					name: "Battlefield V"
				},
				{
					img: require("~/assets/img/temp/fortnite-soon-5.jpg"),
					name: "Rainbow Six"
				},
				{
					img: require("~/assets/img/temp/fortnite-soon-6.jpg"),
					name: "CoD: Warzone"
				}
			]
		}
	}
})
</script>
