import { DataTypes } from "sequelize";

import events from "../data/mockData.json" assert { type: "json" }
import { sequelize } from "../config/db.js";

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  category: { type: DataTypes.STRING, defaultValue: 'None', allowNull: false },
  start_time: { type: DataTypes.DATE, defaultValue: Date.now(), allowNull: false },
  end_time: { type: DataTypes.DATE },
});

export const seedData = async () => {
  await Event.bulkCreate(events);
  console.log("Seed events added");
}

export default Event;