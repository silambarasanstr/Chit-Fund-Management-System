import "./App.css";
import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import api from "./services/api";

const App = () => {
  useEffect(() => {
    console.log("==================================");
    console.log("🌐 Frontend :", window.location.origin);
    console.log("🔗 Backend  :", import.meta.env.VITE_API_URL);

    api
      .get("/health")
      .then((res) => {
        console.log("✅ Backend Connected");
        console.log("📡 Health:", res.data.message);
      })
      .catch((err) => {
        console.log("❌ Backend Not Connected");
        console.error(err.message);
      })
      .finally(() => {
        console.log("==================================");
      });
  }, []);

  return <AppRoutes />;
};

export default App;
