import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [vue()],
    css: {
      postcss: './postcss.config.cjs',
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      }
    },
    server: {
      // 开发服务器配置
      port: 5173, // 默认端口
      host: '0.0.0.0', // 允许外部访问
      open: true, // 自动打开浏览器
      strictPort: false, // 如果端口被占用，自动尝试下一个可用端口
      cors: true, // 启用CORS
      // proxy: {
      //   // 代理配置示例（如果需要API代理）
      //   '/api': {
      //     target: 'http://localhost:3000',
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    build: {
      // 生产构建配置
      outDir: 'dist',
      sourcemap: mode === 'development', // 开发环境生成sourcemap
      minify: 'esbuild', // 使用esbuild进行压缩
      rollupOptions: {
        output: {
          // 静态资源分块
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            tailwind: ['tailwindcss']
          }
        }
      }
    },
    optimizeDeps: {
      // 依赖预构建优化
      include: ['vue', 'vue-router']
    }
  }
})