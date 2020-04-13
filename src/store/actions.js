import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqPwdLogin,
  reqSendCode,
  reqSmsLogin,
  reqSearchShop,
  reqShopInfo,
  reqShopGoods,
  reqShopRatings
} from "../api"
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  REST_USER_INFO,
  RECEIVE_USER_INFO,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_SEARCH_SHOPS,
} from "./mutation-types"

export default {
  async getAddress({commit,state}){
    const geohash = state.latitude+','+state.longitude
    const result = await reqAddress(geohash)
    if(result.code===0){
      const address = result.data
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  async getCategorys({commit,state}){
    const result = await reqFoodCategorys()
    if(result.code===0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },
  async getShops({commit,state}){
    const {longitude,latitude} = state
    const result = await reqShops(longitude,latitude)
    if(result.code===0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },
  //记录用户信息
  recordUserInfo({commit},userinfo){
    commit(RECEIVE_USER_INFO,{userinfo})
  },
  //异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(RECEIVE_USER_INFO,{userInfo})
    }
  },
  async logout({commit}){
    const result = await reqLogout()
    if(result.code===0){
      commit(REST_USER_INFO)
    }
  },
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code===0){
      const info = result.data
      commit(RECEIVE_INFO,{info})
    }
  },
  async getShopRatings({commit},callback){
    const result = await reqShopRatings()
    if(result.code===0){
      const ratings = result.data
      commit(RECEIVE_RATINGS,{ratings})
      //数据更新了，通知一下组件
      callback && callback()
    }
  },
  async getShopGoods({commit},callback){
    const result = await reqShopGoods()
    if(result.code===0){
      const goods = result.data
      commit(RECEIVE_GOODS,{goods})
      //数据更新了，通知一下组件
      callback && callback()
    }
  },
  // 异步获取商家商品列表
  async searchShops({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}
