import Mock from 'mockjs'
import data from './data.json'

//返回goods接口
Mock.mock('/goods',{code:0,data:data.goods})
Mock.mock('/ratings',{code:0,data:data.ratings})
Mock.mock('/info',{code:0,data:data.info})
