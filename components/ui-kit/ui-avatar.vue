<template>
	<a-avatar
		class="ui-avatar"
		:src="src"
		:size="size"
		:srcSet="srcSet"
		:icon="icon"
		:alt="alt"
		:loadError="loadError"
		:prefixCls="prefixCls"
		:shape="shape"
	/>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue"

// Use Ant-design component
import { Avatar } from "ant-design-vue"
Vue.use(Avatar)

// Types
type Shape = "circle" | "square"
type Size = "small" | "large" | "default"

export default Vue.extend({
	name: "ui-avatar",
	props: {
		prefixCls: {
			type: String,
			default: undefined
		},
		shape: {
			type: String,
			default: "circle"
		} as PropOptions<Shape>,
		size: {
			type: String,
			default: "default"
		} as PropOptions<Size>,
		src: String,
		/** Srcset of image avatar */
		srcSet: String,
		icon: String,
		alt: String,
		loadError: Function
	}
})
</script>
