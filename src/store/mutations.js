import  {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation_types'

export default  {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {foodTypes}) {
    state.foodTypes = foodTypes
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  }
}
