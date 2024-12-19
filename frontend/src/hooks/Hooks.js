import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate,  useLocation } from "react-router-dom";

import { EventContext, FormContext  } from "../store/Contexts";

import { createEvent, updateEvent, deleteEvent, fetchEvents } from '../../services/apiServices';
import { defaultFormData, getMostRecentDate, showBanner, titles  } from "../utils/helpers";
import CONFIG from "../../CONFIG";

const appName = CONFIG?.appName || "Events Journal";

export const useEventOperations = () => {
  const { setEvents, setLoading } = useContext(EventContext);

  const refreshEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchEvents();
      setEvents(res.data.events);
    } catch (err) {
      console.error('Error fetching events:', err);
      showBanner({ message: 'Failed to fetch events', type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [setEvents, setLoading]);

  const addEvent = async (eventData) => {
    await createEvent(eventData);
    refreshEvents();
  };

  const editEvent = async (id, eventData) => {
    await updateEvent(id, eventData);
    refreshEvents();
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    refreshEvents();
  };

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  return { addEvent, editEvent, removeEvent, refreshEvents };
};

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

// Update page title when the url path is updated.
export const useTitle = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = titles[location.pathname] || appName;
  }, [location.pathname]);

  return null;
}

export const useToggleSections = (groupedEvents) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  useEffect(() => {
      if (groupedEvents.size > 0) {
        const mostRecentDate = getMostRecentDate(groupedEvents);
        if (mostRecentDate) {
          setExpandedSections({
            [mostRecentDate.year]: true,
            [`${mostRecentDate.year}-${mostRecentDate.month}`]: true,
            [`${mostRecentDate.year}-${mostRecentDate.month}-${mostRecentDate.day}`]: true,
          });
        }
      }
    }, [groupedEvents]);

  return { expandedSections, setExpandedSections, toggleSection };
};
