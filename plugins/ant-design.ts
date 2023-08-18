import Vue from "vue"
import { Plugin } from "@nuxt/types"

import {
	Tooltip,
	Table,
	Popover,
	Menu,
	Modal,
	Result,
	notification,
	message
} from "ant-design-vue"

Vue.prototype.$notification = notification
Vue.prototype.$message = message
Vue.prototype.$confirm = Modal.confirm

Vue.use(Tooltip)
Vue.use(Table)
Vue.use(Popover)
Vue.use(Menu)
Vue.use(Result)

const messagePlugin: Plugin = (_, inject) => {
	inject("notification", notification)
	inject("message", message)
	inject("confirm", Modal.confirm)
}

export default messagePlugin
