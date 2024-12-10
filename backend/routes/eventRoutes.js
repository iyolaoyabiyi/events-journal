import express from "express";
import { createEvent, deleteEvent, readEvents, updateEvent} from "../controllers/eventController.js";

const eventRouter = express.Router();

export const eventViewRouter = express.Router()

eventRouter.route("/").get(readEvents).post(createEvent);
eventRouter.route("/:id").get(readEvents).put(updateEvent).delete(deleteEvent);

export default eventRouter;