/*
与后台交互模块
*/
import ajax from './ajax'
//const BASE_URL = "http://localhost:4000"
//const BASE_URL = './api'

// 1、根据经纬度获取位置详情
//export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
export const reqAddress = (geohash) => ajax('/api/position/'+geohash)
// 2、获取食品分类列表
//export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
export const reqFoodCategorys = () => ajax('/api/index_category')
// 3、根据经纬度获取商铺列表
//export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})
export const reqShops = (longitude, latitude) => ajax('/api/shops', {longitude, latitude})


//4、根据经纬度和关键字搜索商铺列表
export const reqSearchShop = (geohash,keyword) => ajax('/api/search_shops',{geohash,keyword})


//6、用户名密码登录
export const reqPwdLogin = ({name,pwd,captcha}) => ajax('/api/login_pwd',{name,pwd,captcha},'POST')
//7、发送短信验证码
export const reqSendCode = (phone) => ajax('/api/sendcode', {phone})
//8、手机号验证码登录
export const reqSmsLogin = (phone, code) => ajax('/api/login_sms', {phone, code}, 'POST')
//9、根据会话获取用户信息
export const reqUserInfo = () => ajax('/api/userinfo')
//10、用户登出
export const reqLogout = () => ajax('/api/logout')


//获取商家信息
//http://localhost:4000/info 请求路径
export const reqShopInfo = () => ajax('/info')

//获取商家评价数组
export const reqShopRatings = () => ajax('/ratings')

//获取商家数组
export const reqShopGoods = ()=> ajax('/goods')
