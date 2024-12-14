import dayjs from "dayjs";

import Event from "../models/Event.js";
import { EventError, getErrorMessage, getErrors } from "../utils/helpers.js";
import { ValidationError } from "sequelize";
// Add Events
export const createEvent = async (req, res) => {
  try {
    let { name, description, category, startTime, endTime } = req.body;
    // Current time as default value for empty startTime
    if (!startTime) {
      startTime = dayjs().format("YYYY-MM-DDTHH:mm:ss");
    } 
    // Category default value
    if (category && category.trim() === "") {
      category = "None"
    }

    const event = await Event.create({ name, description, category, startTime, endTime });
    res.status(201).json({event, status: "created"});
  } catch (err) {
    const errors = getErrors(err)
    res.status(errors.status).json({ error: errors.data })
  }
}
// Get Event(s)
export const readEvents = async (req, res) => {
  try {
    const eventId = req.params.id;
    // Read all events if no eventid in path
    let status = "read";
    const events = eventId ? 
      await Event.findByPk(eventId) :
      await Event.findAll({
        order: [["startTime", "DESC"]]
      });
    if (!events || events.length < 1) {
      status = "empty";
    }
    res.status(200).json({events, status: status});
  } catch (err) {
    const errors = getErrors(err)
    return res.status(errors.status).json({ error: errors.data });
  }
}

export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, category, startTime, endTime } = req.body;
    let event = await Event.findByPk(eventId);
    // Check if events is valic
    if (!event) {
      throw new EventError(getErrorMessage({type: "event"}));
    }
    await Event.update({ name, description, category, startTime, endTime },
      { where: {id: eventId} }
    )
    event = await Event.findByPk(eventId);
    res.status(200).json({ event, status: `updated` });
  } catch (err) {
    const errors = getErrors(err)
    res.status(errors.status).json({ error: errors.data });
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    if (!event) {
      throw new EventError(getErrorMessage({type: "event"}));
    }
    await Event.destroy({where: {id: eventId}});
    res.status(200).json({ event, status: `deleted`});
  } catch (err) {
    const errors = getErrors(err)
    res.status(errors.status).json({ error: errors.data });
  }
}