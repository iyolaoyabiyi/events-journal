import { useCallback, useContext, useEffect } from "react";
import { useNavigate,  useLocation } from "react-router-dom";

import { EventContext, FormContext  } from "../store/Contexts";

import { defaultFormData, getEvents, titles  } from "../utils/helpers";
import CONFIG from "../../CONFIG";

const appName = CONFIG?.appName || "Events Journal";

export const useEvent = () => {
  const { setEvents, setLoading } = useContext(EventContext);

  const updateEvents = useCallback(
    async () => {
    // Update events state
      setLoading(true);
      try {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }, [setEvents, setLoading]
  );

  useEffect(() => {
    updateEvents();
  }, [setEvents, setLoading, updateEvents]);

  return updateEvents;
}

export const useFormNavigation = () => {
  const { setFormData, setUpdateStat } = useContext(FormContext);
  const navigate = useNavigate();

  const setFormAndNavigate = useCallback(({ formData = defaultFormData, status = false }) => {
    // Set form data
    setUpdateStat(status);
    setFormData({...formData});
    // Navigate to form
    navigate("/log-event");
  }, [navigate, setFormData, setUpdateStat]);

  return setFormAndNavigate;
}

export const useTitle = () => {
  const location = useLocation();
  // Update page title when the url path is updated.
  useEffect(() => {
    document.title = titles[location.pathname] || appName;
  }, [location.pathname]);

  return null;
}