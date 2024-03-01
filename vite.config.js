import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
    //跨域问题由后端解决
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8000/api',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/api': ''
  //       }
  //     }
  //   }
  // }
})


