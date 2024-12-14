import { useContext, useEffect } from "react";

import EventContext from "../store/EventContext";
import { updateEvents } from "../utils/helpers";

const useEvent = (...deps) => {
  const { setEvents, setLoading } = useContext(EventContext);
  useEffect(() => {
    updateEvents(setEvents, setLoading);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEvents, setLoading, ...deps]);
}

export default useEvent;