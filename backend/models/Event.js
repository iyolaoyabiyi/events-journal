import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

import events from "../data/mockData.json" assert { type: "json" }

const Event = sequelize.define("event", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Name cannot be empty" },
      len: {
        args: [1, 255], msg: "Name must be between 3 and 255 characters" },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: "None",
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { msg: "Start time must be a valid date", },
    },
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isAfterStartTime(value) {
        if (value && this.startTime && new Date(value) <= new Date(this.startTime)) {
          throw new Error("End time must be after the start time");
        }
      },
    },
  },
});

export const seedData = async () => {
  await Event.bulkCreate(events);
  console.log("Seed events added");
}

export default Event;