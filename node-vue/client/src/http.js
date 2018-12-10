import axios from 'axios';
import { Message,Loading } from 'element-ui';

let loading

// 方法
// 开始动画
function startLoading() {
    loading = Loading.service({
        lock:true,
        text:'加载中',
        background:"rgba(0,0,0,.7)"
    });
}
// 结束动画
function endLoading() {
    loading.close();
}

// 请求拦截

axios.interceptors.request.use(config => {
    // 加载
    startLoading();
    return config;
    },error => {
        return Promise.reject(error);
    }
)


// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
},error => {
    endLoading();
    Message.error(error.response.data)
    return Promise.reject(error)
})
