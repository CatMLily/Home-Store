// 插件配置

import Vue from 'vue'
import AlertComponent from './main.vue'

// 传参合并，用来alert传入参数
function merge(target) {
    for (let i = 1, j = arguments.length; i < j; i++) {
        let source = arguments[i] || {};
        for (let prop in source) {
            if (source.hasOwnProperty(prop)) {
                let value = source[prop];
                if (value !== undefined) {
                    target[prop] = value;
                }
            }
        }
    }
    return target;
};

let instance;
let AlertConstructor = Vue.extend(AlertComponent);

let initInstance = () => {
    let appEle = document.getElementById('app');
    instance = new AlertConstructor({
        el: document.createElement('div')
    });
    // 挂载到App
    appEle.appendChild(instance.$el);
}

let Alert = (options = {}) => {
    // 初始化 Alert 挂载到body
    initInstance();
    merge(instance.$data, options);
    return new Promise((resolve, reject) => {
        instance.showAlert = true;
        let closeAlert = instance.closeAlert;
        instance.closeAlert = () => {
            closeAlert();
        }
    });

}
export default Alert;
