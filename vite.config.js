import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    allowedHosts: [
      "fddc3e71f62c.ngrok-free.app", // 👈 your ngrok domain
    ],
    // optional: if you want to access it from other devices on your LAN
    host: true,
  },
});
