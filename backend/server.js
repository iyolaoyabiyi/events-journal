import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";

import eventRouter from "./routes/eventRoutes.js";
// import { seedData } from "./models/Event.js";
import { sequelize } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

try {
  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());
  
  await sequelize.sync();
  console.log("Database connected successfully.");

  // await seedData();
  app.use("/api/events", eventRouter);

  app.listen(PORT, () => {
    console.log(`Events Journal running on port ${PORT}`);
  });
  
} catch (err) {
  console.error(`Unable to connect to database: ${err}`);
}