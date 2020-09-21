import request from '@/utils/request'

export default {
    
     //根据验证码和手机号进行登录
    LoginByPwd(phone, pwd) {
        return request({
            url: 'api/login_pwd',
            method: 'post',
            data: {
                phone,
                pwd
            }
        })
    },
    //根据验证码和手机号进行登录
    LoginByCode(phone, code) {
        return request({
            url: 'api/login_sms',
            method: 'post',
            data: {
                phone,
                code
            }
        })
    },
    //根据手机获取验证码
    getMobileSms(mobile) {
        return request({
            url: 'api/sendcode?phone='+mobile,
            method: 'get'
        })
    },
}