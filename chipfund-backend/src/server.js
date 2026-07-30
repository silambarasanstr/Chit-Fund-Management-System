import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 8080;

// Connect Database
await connectDB();

// Start Server
app.listen(PORT, () => {
  console.log(`
====================================
🚀 CHIPFUND Backend Started
====================================
🌐 Server : http://localhost:${PORT}
📦 Environment : ${process.env.NODE_ENV}
====================================
`);
});