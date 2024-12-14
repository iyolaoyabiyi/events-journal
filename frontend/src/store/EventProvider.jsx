import PropTypes from "prop-types";
import { useState } from "react";

import EventContext from "./EventContext";

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  return (
    <EventContext.Provider value={{events, setEvents, isLoading, setLoading}}>
      { children }
    </EventContext.Provider>
  )
}

EventProvider.propTypes = {
  children: PropTypes.element
}

export default EventProvider;