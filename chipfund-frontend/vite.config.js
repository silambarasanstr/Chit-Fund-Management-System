import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log("\n==================================");
  console.log(`🚀 Mode      : ${mode}`);
  console.log("🌐 Frontend  : http://localhost:8081");
  console.log("🔗 Backend   :", env.VITE_API_URL);
  console.log("==================================\n");

  return {
    plugins: [react()],
    server: {
      port: 8081,
    },
  };
});
