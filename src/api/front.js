import request from '@/utils/request'

export default {
    //获取所有食品类别
    getCategories() {
        return request({
            url: 'api/categories',
            method: 'get'
        })
    },
}