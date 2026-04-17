# 技术设计

## 技术栈
- Vue3 + TypeScript + Tailwind CSS + Vite





## 项目结构
src/
  components/
  services/
  router/
  data/
    projects.ts
    skills.ts
  App.vue
  main.ts

## 数据管理
- 项目数据和技能数据存储在 TypeScript 文件中
- 数据存储用 LocalStorage方便后续添加和修改

##状态管理
- 状态管理用 Zustand进行管理

## 数据模型
- 项目数据模型：id（唯一标识）、title（标题）​、description（描述）、category（分类）、pr‍iority（优先级：低、中、高）、dueDate（截止日期）、completed（是否完成）、createdAt（创建时间）

