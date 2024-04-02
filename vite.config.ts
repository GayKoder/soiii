import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig((mode ) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.RPC': JSON.stringify(env.RPC_SOLANA),
      'process.env.SMART_CONTRACT_ADDRESS': JSON.stringify(env.SMART_CONTRACT_ADDRESS),
      'process.env.RECIEVER_ADDRESS': JSON.stringify(env.RECIEVER_ADDRESS)
    },
    plugins: [react()],
  }
})
