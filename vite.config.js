import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve('src') },
      { find: '@v', replacement: path.resolve('src/views') },
      { find: '@c', replacement: path.resolve('src/components') }
    ],
  },
})
