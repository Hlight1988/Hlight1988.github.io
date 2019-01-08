import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from './router'

let loading

function startLoading() {
    loading = Loading.service({
        lock:true,
        text:'加载中...',
        background:'rgba(0,0,0,.7)'
    })
}

function endLoading() {
    loading.close();
}


// 请求拦截
axios.interceptors.request.use(config => {
    // 启动动画
    startLoading();

    if(localStorage.eleToken){
        // 设置统一请求头
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},error => {
    return Promise.reject(error)
})


// 响应拦截 --  401 token过期处理
axios.interceptors.response.use(onResponse => {
    endLoading()
    return onResponse;
},error => {
    endLoading()
    Message.error(error.response.data)

    const { status } = error.response;

    if(status == 401) {
        Message.error('token值无效，请重新登录')
        //清除token
        localStorage.removeItem('eleToken')

        // 页面跳转
        router.push('/login')
    }
})

export default axios
