
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../config/env.js";

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();

    console.log("Successfully connected to Supabase PostgreSQL");
  } catch (error) {
    console.error("Failed to connect to the database:", error);

    process.exit(1);
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Error disconnecting from database:", error);

    process.exit(1);
  }
}

export default prisma;
