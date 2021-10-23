import Vue from "vue"
import List from "./List"

const Components = {
  List
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
