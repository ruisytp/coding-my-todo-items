import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/style.css'

// 设置应用标题
const appTitle = import.meta.env.VITE_APP_TITLE || 'YTP代办事项';
document.title = appTitle;

// 创建应用实例
const app = createApp(App)

// 全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error('全局错误:', err);
  console.error('错误信息:', info);
  // 可以在这里添加错误上报逻辑
};

// 全局警告处理（仅在开发环境）
if (import.meta.env.DEV) {
  app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue警告:', msg);
    console.warn('警告追踪:', trace);
  };
}

// 使用插件
app.use(router)

// 挂载应用
app.mount('#app')

console.log(`${appTitle} 应用已启动`);
console.log(`版本: ${import.meta.env.VITE_APP_VERSION || '未知'}`);
console.log(`环境: ${import.meta.env.MODE}`);