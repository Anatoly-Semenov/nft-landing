import Vue from "vue"

// UI components
import UiAvatar from "~/components/ui-kit/ui-avatar.vue"
import UiButton from "~/components/ui-kit/ui-button.vue"
import UiConnect from "~/components/ui-kit/ui-connect.vue"
import UiInput from "~/components/ui-kit/ui-input.vue"
import UiTextarea from "~/components/ui-kit/ui-textarea.vue"
import UiCheckbox from "~/components/ui-kit/ui-checkbox.vue"
import UiSelect from "~/components/ui-kit/ui-select.vue"
import UiTooltip from "~/components/ui-kit/ui-tooltip.vue"
import UiBreadcrumb from "~/components/ui-kit/ui-breadcrumb.vue"
import UiRadio from "~/components/ui-kit/ui-radio.vue"
import UiModal from "~/components/ui-kit/ui-modal.vue"
import UiTag from "~/components/ui-kit/ui-tag.vue"
import UiCollapse from "~/components/ui-kit/ui-collapse.vue"
import UiDropdown from "~/components/ui-kit/ui-dropdown.vue"
import UiMenu from "~/components/ui-kit/ui-menu.vue"
import UiMenuItem from "~/components/ui-kit/ui-menu-item.vue"
import UiTableFullscreen from "~/components/ui-kit/ui-table-fullscreen.vue"
import UiStatistic from "~/components/ui-kit/ui-statistic.vue"
import UiDelta from "~/components/ui-kit/ui-delta.vue"
import UiIcon from "~/components/ui-kit/ui-icon.vue"

Vue.component("ui-avatar", UiAvatar)
Vue.component("ui-button", UiButton)
Vue.component("ui-connect", UiConnect)
Vue.component("ui-input", UiInput)
Vue.component("ui-textarea", UiTextarea)
Vue.component("ui-checkbox", UiCheckbox)
Vue.component("ui-select", UiSelect)
Vue.component("ui-tooltip", UiTooltip)
Vue.component("ui-breadcrumb", UiBreadcrumb)
Vue.component("ui-radio", UiRadio)
Vue.component("ui-modal", UiModal)
Vue.component("ui-tag", UiTag)
Vue.component("ui-collapse", UiCollapse)
Vue.component("ui-dropdown", UiDropdown)
Vue.component("ui-menu", UiMenu)
Vue.component("ui-menu-item", UiMenuItem)
Vue.component("ui-table-fullscreen", UiTableFullscreen)
Vue.component("ui-statistic", UiStatistic)
Vue.component("ui-delta", UiDelta)
Vue.component("ui-icon", UiIcon)

// Directives
Vue.directive("click-outside", {
	bind(el, binding) {
		el.addEventListener("click", (e) => e.stopPropagation())
		document.body.addEventListener("click", binding.value)
	},
	unbind(el, binding) {
		document.body.removeEventListener("click", binding.value)
	}
})
