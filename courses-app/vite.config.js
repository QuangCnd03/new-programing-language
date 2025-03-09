import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // env: {
  //   SERVER_API: process.env.SERVER_API,
  //   APP_URL: process.env.APP_URL,
  // },
  
})
