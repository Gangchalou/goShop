
// vuex的actions模块

import {
  reqAddress,
  reqFoodTypes,
  reqShops,
  reqUser,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from './mutation_types'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    commit(RECEIVE_ADDRESS, {address: result.data})
  },
  // 异步获取分类列表
  async getFoodTypes({commit} ,callback) {
    const result = await reqFoodTypes()
    commit(RECEIVE_CATEGORYS, {foodTypes: result.data})
    callback && callback()
  },

  // 异步获取商家列表
  async getShops({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    commit(RECEIVE_SHOPS, {shops: result.data})
  },

  //保存userInfo
  recordUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  //异步获取用户信息
  async getUserInfo ({commit}) {
    const result = await reqUser()
    if(result.code ===0){
      commit(RECEIVE_USER_INFO, {userInfo:result.data})
    }
  },

  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqShopInfo()

    if(result.code===0) {
      const info = result.data
      console.log('123')
      commit(RECEIVE_INFO, {info})

    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}) {
    const result = await reqShopRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
    }
  },

// 异步获取商家商品列表
  async getShopGoods({commit}) {
    const result = await reqShopGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
    }
  },
}
