# YTP代办事项网站

基于Vue3、TypeScript、Tailwind CSS和Vite构建的待办事项管理应用。

## 功能特性

- 待办事项管理（添加、编辑、删除、标记完成）
- 分类管理（工作、学习、生活、旅游等）
- 优先级设置（高、中、低）
- 完成率统计
- 搜索与筛选功能
- 数据本地存储

## 技术栈

- Vue 3 + TypeScript
- Vue Router
- Tailwind CSS
- Vite 构建工具
- Zustand 状态管理（计划集成）
- 本地存储（localStorage）

## 安装与运行

1. 确保你已安装 Node.js (建议版本 >= 16.x)

2. 安装依赖：
   ```bash
   npm install
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```

4. 在浏览器中访问 [http://localhost:5173](http://localhost:5173)

## 构建生产版本

```bash
npm run build
```

## 项目结构

```
src/
├── assets/           # 静态资源
├── components/       # 可复用组件
├── views/            # 页面视图
├── router/           # 路由配置
├── store/            # 状态管理
├── types/            # 类型定义
├── styles/           # 全局样式
├── App.vue           # 主应用组件
└── main.ts           # 应用入口
```

## 设计风格

- 浅色主题
- 简洁现代的设计风格
- 响应式布局，支持移动端
- 平滑过渡动画