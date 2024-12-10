import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { name, description, category, start_time, end_time } = req.body;
    const event = await Event.create({ name, description, category, start_time, end_time });
    // To do: handle error
    res.status(201).json({event, status: "created"});
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const readEvents = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!eventId) {
      const events = await Event.findAll();
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
    const { name, description, category, start_time, end_time } = req.body;
    let event = await Event.findByPk(eventId);
    if (!event) {
      throw new Error("Event not found!");
    }
    await Event.update({ name, description, category, start_time, end_time },
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