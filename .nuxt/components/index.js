export { default as InfoBox } from '../../components/global/InfoBox.vue'
export { default as PrevNext } from '../../components/global/PrevNext.vue'
export { default as AppCard } from '../../components/AppCard.vue'
export { default as AppSearchInput } from '../../components/AppSearchInput.vue'
export { default as Author } from '../../components/Author.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as TheHeader } from '../../components/TheHeader.vue'

export const LazyInfoBox = import('../../components/global/InfoBox.vue' /* webpackChunkName: "components/global/InfoBox" */).then(c => c.default || c)
export const LazyPrevNext = import('../../components/global/PrevNext.vue' /* webpackChunkName: "components/global/PrevNext" */).then(c => c.default || c)
export const LazyAppCard = import('../../components/AppCard.vue' /* webpackChunkName: "components/AppCard" */).then(c => c.default || c)
export const LazyAppSearchInput = import('../../components/AppSearchInput.vue' /* webpackChunkName: "components/AppSearchInput" */).then(c => c.default || c)
export const LazyAuthor = import('../../components/Author.vue' /* webpackChunkName: "components/Author" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyTheHeader = import('../../components/TheHeader.vue' /* webpackChunkName: "components/TheHeader" */).then(c => c.default || c)
