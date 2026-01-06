import dotenv from 'dotenv';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "..", "config.env") });
import mongoose from "mongoose";
import app from "./app.js";

if (!process.env.MONGO_URI || typeof process.env.MONGO_URI !== "string") {
  console.error(
    "Missing or invalid MONGO_URI in environment. Check config.env"
  );
  process.exit(1);
}

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    connectdb().then(() => {
        console.log(`Database connected successfully`);
    });
    console.log(`Server is running on port ${PORT}`);
});