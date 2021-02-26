import Vue from 'vue'

const globalComponents = {
  InfoBox: () => import('../../components/global/InfoBox.vue' /* webpackChunkName: "components/global/InfoBox" */).then(c => c.default || c),
  PrevNext: () => import('../../components/global/PrevNext.vue' /* webpackChunkName: "components/global/PrevNext" */).then(c => c.default || c)
}

for (const name in globalComponents) {
  Vue.component(name, globalComponents[name])
}
