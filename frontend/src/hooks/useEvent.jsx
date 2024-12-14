import { useCallback, useContext, useEffect } from "react";

import EventContext from "../store/EventContext";
import { getEvents } from "../utils/helpers";

const useEvent = (...deps) => {
  const { setEvents, setLoading } = useContext(EventContext);

  const updateEvents = useCallback(
    async () => {
    // Update events state
      setLoading(true);
      const events = await getEvents();
      setEvents(events);
      setLoading(false);
    }, [setEvents, setLoading]
  );

  useEffect(() => {
    updateEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEvents, setLoading, ...deps]);

  return updateEvents;
}

export default useEvent;