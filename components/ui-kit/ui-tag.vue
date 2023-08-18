<template>
	<a-tag
		class="ui-tag"
		:color="color"
		:closable="closable"
		@close="$emit('close')"
		@click.native="$emit('click')"
		:visible="isVisible"
	>
		<slot />
	</a-tag>
</template>

<script lang="ts">
import Vue from "vue"

// Use Ant-component
import { Tag } from "ant-design-vue"
Vue.use(Tag)

export default Vue.extend({
	name: "ui-tag",
	props: {
		color: String,
		closable: Boolean,
		isVisible: {
			type: Boolean,
			default: true
		}
	}
})
</script>
