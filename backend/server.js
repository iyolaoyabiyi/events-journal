import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import eventRouter from "./routes/eventRoutes.js";
import { seedData } from "./models/Event.js";
import { sequelize } from "./config/db.js";

const port = 3001;

dotenv.config();
const app = express();


try {
  app.use(cors());
  app.use(bodyParser.json());
  
  await sequelize.sync();
  console.log("Database connected successfully.");

  // Todo: Handle database connection error
  await seedData();
  app.use("/api/events", eventRouter);
  
} catch (err) {
  console.error(`Unable to connect to database: ${err}`);
}

app.listen(port, () => {
  console.log(`Events Journal running on port ${port}`);
});