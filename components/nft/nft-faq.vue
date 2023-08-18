<template>
	<div class="nft__faq">
		<p class="nft__faq-title">FAQ</p>
		<ui-collapse :data="data" />
	</div>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
	name: "nft-faq",
	data() {
		return {
			data: [
				{
					title: "Is registering for a premint list safe?",
					description:
						"To claim your gift, please click on the ‘Collect your gift’ button on the project’s website and log in using your Apple ID or Google ID. The digital gift will then be added to your collection."
				},
				{
					title: "How can I claim the gift?",
					description:
						"To claim your gift, please click on the ‘Collect your gift’ button on the project’s website and log in using your Apple ID or Google ID. The digital gift will then be added to your collection."
				},
				{
					title: "Why do i need to Sign a messaeg in addition?",
					description:
						"To claim your gift, please click on the ‘Collect your gift’ button on the project’s website and log in using your Apple ID or Google ID. The digital gift will then be added to your collection."
				}
			]
		}
	}
})
</script>
