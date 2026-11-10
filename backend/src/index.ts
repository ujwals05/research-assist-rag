
import app from "./app.js";
import { env } from "./config/env.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./db/index.js";

async function startServer(): Promise<void> {
  await connectDatabase();

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down server...");

    server.close(async () => {
      await disconnectDatabase();
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

startServer().catch((error) => {
  console.error("Application startup failed:", error);
  process.exit(1);
});
