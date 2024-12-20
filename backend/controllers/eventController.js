import dayjs from "dayjs";

import Event from "../models/Event.js";
import { EventError, getErrorMessage, getErrors } from "../utils/helpers.js";
import { Op } from "sequelize";
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
    const { page = 1, limit, category, startTime } = req.query;
    if (eventId) {
      // Fetch a single event by ID
      const event = await Event.findByPk(eventId);
      if (!event) {
        throw new EventError(getErrorMessage({ type: "event" }));
      }
      return res.status(200).json({ events: event, status: "read" });
    }
    // Filtering conditions
    const where = {};
    if (category) {
      where.category = category;
    }
    if (startTime) {
      where.startTime = { [Op.gte]: new Date(startTime) }; // Using Sequelize Op for comparison
    }
    // Get the total number of events matching the filters
    const total = await Event.count({ where });

    // Default limit to total events if not provided
    const parsedLimit = limit <= 0 ? total : limit;
    const parsedPage = parseInt(page);
    const offset = (parsedPage - 1) * parsedLimit;
    // Fetch events with pagination
    const events = await Event.findAll({
      where,
      limit: parsedLimit,
      offset,
      order: [["startTime", "DESC"]],
    });

    const totalPages = Math.ceil(total / parsedLimit);

    res.status(200).json({
      events,
      status: events.length ? "read" : "empty",
      total,
      totalPages,
      currentPage: parsedPage,
      limit: parsedLimit
    });
  } catch (err) {
    const errors = getErrors(err);
    res.status(errors.status).json({ error: errors.data });
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