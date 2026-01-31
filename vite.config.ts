// import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import Components from 'unplugin-vue-components/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (element) => element.startsWith('iconify-icon'),
        },
      },
    }),
    VueRouter(),
    Components({
      /* options */
    }),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        VueRouterAutoImports,
        { pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate'] },
        {
          'vue-meta': ['useMeta'],
        },
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: ['src/stores/**', 'src/composables/**'],
    }),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'ui-vendor': ['reka-ui', 'lucide-vue-next', '@iconify/vue'],
          'form-vendor': ['@formkit/vue'],
          'table-vendor': ['@tanstack/vue-table'],
          'supabase-vendor': ['@supabase/supabase-js'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority', '@vueuse/core'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
