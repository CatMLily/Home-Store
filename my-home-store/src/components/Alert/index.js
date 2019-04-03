// 暴露全局Alert 入口
import Alert from './src/index.js'

const install = function(Vue) {
    //注册全局组件
    Vue.component(Alert.name, Alert);
    //添加全局API
    Vue.prototype.$Alert = Alert;
};
export default install