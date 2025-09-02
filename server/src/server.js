import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import propertiesRouter from "./routes/properties.js";
import viewingsRouter from "./routes/viewings.js";

dotenv.config();

const app = express();
app.use(cors({ origin: ["http://localhost:3000"] }));
app.use(express.json());

// Routes
app.use("/api/properties", propertiesRouter);
app.use("/api/viewings", viewingsRouter);

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server listening on :${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed", err);
    process.exit(1);
  });
