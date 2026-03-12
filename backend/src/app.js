import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import journalRoutes from "./routes/journalRoutes.js";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/journal", journalRoutes);

const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});