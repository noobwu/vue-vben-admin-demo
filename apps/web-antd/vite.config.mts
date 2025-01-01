import { defineConfig } from '@vben/vite-config';

export default defineConfig(async () => {
  return {
    application: {
      nitroMock: false, // 是否启动mock服务(false:关闭, true:启动)
    },
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://127.0.0.1:9999/api', // mock:http://localhost:5320/api, dev:http://127.0.0.1:9999/api
            ws: true,
          },
        },
      },
    },
  };
});
