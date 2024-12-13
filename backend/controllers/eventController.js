import dayjs from "dayjs";

import Event from "../models/Event.js";
import { ValidationError } from "sequelize";

export const createEvent = async (req, res) => {
  try {
    let { name, description, category, startTime, endTime } = req.body;
    
    // Current time as default value for empty startTime
    if (!startTime) {
      startTime = dayjs().format("YYYY-MM-DDTHH:mm:ss");
    } 
    // Category default value
    if (category.trim() === "") {
      category = "None"
    }
    const event = await Event.create({ name, description, category, startTime, endTime });
    // To do: handle error
    res.status(201).json({event, status: "created"});
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(400).json({ error: err.errors.map((e) => e.message) });
    }
    res.status(500).json({ error: "Server related error!" })
  }
}

export const readEvents = async (req, res) => {
  try {
    const eventId = req.params.id;
    // Get all events if id param is not specified
    if (!eventId) {
      const events = await Event.findAll({
        order: [["startTime", "DESC"]]
      });
      res.status(200).json({ events, status: "readAll" });
    } else {
      const event = await Event.findByPk(eventId);
      if (!event) {
        throw new Error("Event not found");
      }
      res.status(200).json({event, status: "read"});
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, category, startTime, endTime } = req.body;
    let event = await Event.findByPk(eventId);
    // Check if events is valic
    if (!event) {
      throw new Error("Event not found!");
    }
    await Event.update({ name, description, category, startTime, endTime },
      { where: {id: eventId} }
    )
    event = await Event.findByPk(eventId);
    res.status(200).json({ event, status: `updated` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found!");
    }
    await Event.destroy({where: {id: eventId}});
    res.status(200).json({ event, status: `deleted`});
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}