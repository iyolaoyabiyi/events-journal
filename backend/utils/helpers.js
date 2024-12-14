import { ValidationError } from "sequelize";

export class EventError extends Error {
  constructor(message) {
    super(message);
    this.name = "Event Error";
  }
}

// Error Messages
export const getErrorMessage = ({type, message}) => {
  switch (type) {
    case "server":
      return "Internal server error";
    case "event":
      return "Event not found";
    default:
      return message;
  }
}

export const getErrors = (err) => {
  let data = [getErrorMessage({type: "server"})];
  let status = 500;
  if (err instanceof ValidationError) {
    data = err.errors.map((e) => e.message);
    status = 400;
  } else if (err instanceof EventError) {
    data = [getErrorMessage({type: "event"})];
    status = 400;
  }
  return {data, status};
}