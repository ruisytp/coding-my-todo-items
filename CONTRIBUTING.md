# 贡献指南

欢迎来到 YTP 代办事项项目！我们感谢您有兴趣为本项目做出贡献。

## 开发环境设置

1. Fork 此仓库
2. 克隆您的 fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/coding-my-todo-items.git
   ```
3. 进入项目目录:
   ```bash
   cd coding-my-todo-items
   ```
4. 安装依赖:
   ```bash
   npm install
   ```
5. 启动开发服务器:
   ```bash
   npm run dev
   ```

## 提交代码

### 分支策略

- `main` - 主分支，存放稳定版本
- `develop` - 开发分支，日常开发在此分支进行
- `feature/*` - 功能分支，开发新功能时使用
- `bugfix/*` - 修复 bug 时使用
- `release/*` - 发布预发布版本时使用

### 提交规范

请遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范提交代码：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码逻辑）
- `refactor`: 重构（既不修复 bug 也不添加功能）
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

示例：
```
feat: 添加待办事项分类功能
fix: 修复待办事项无法删除的问题
docs: 更新 README.md 文件
```

## 代码规范

- 使用 TypeScript，遵循严格的类型检查
- 使用 ESLint 和 Prettier 格式化代码
- 组件命名采用 PascalCase（首字母大写）
- 变量和函数命名使用 camelCase（驼峰式）
- 使用 Vue 3 Composition API
- 遵循 Vue 3 最佳实践

## 提交 Pull Request

1. 确保您的代码已通过所有测试
2. 提交前请先运行 `npm run lint` 检查代码风格
3. 提交前请运行 `npm run build` 确保构建成功
4. 创建 Pull Request 时，请清楚描述变更内容及原因
5. PR 标题请遵循提交规范

## 技术栈

- Vue 3 + TypeScript
- Vue Router
- Tailwind CSS
- Vite 构建工具
- 本地存储（localStorage）

## 问题报告

如果您遇到任何问题或有改进建议，请提交 Issue，描述问题的详细信息，包括：

- 问题发生的具体步骤
- 预期行为
- 实际行为
- 浏览器及版本（如果是前端问题）
- 错误日志（如果有）

感谢您的贡献！