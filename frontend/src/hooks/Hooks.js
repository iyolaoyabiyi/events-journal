import { useCallback, useContext, useEffect } from "react";
import { useNavigate,  useLocation } from "react-router-dom";

import { BannerContext, EventContext, FormContext  } from "../store/Contexts";

import { createEvent, updateEvent, deleteEvent, fetchEvents } from '../services/apiServices';
import { defaultFormData, getMostRecentDate, showBanner, titles  } from "../utils/helpers";
import CONFIG from "../../CONFIG";

const appName = CONFIG?.appName || "Events Journal";

// Events management hook
export const useEventOperations = () => {
  const { setMessage, setType, setIsVisible } = useContext(BannerContext)
  const { setEvents, setLoading, setTotalJournalPages } = useContext(EventContext);

  const refreshEvents = useCallback(async (filters = {}) => {
    let { page = 1, limit = 100, isForced = false } = filters;

    setLoading(true);
    try {
      const cachedEvents = sessionStorage.getItem("events");
      if (cachedEvents && !isForced) {
        setEvents(JSON.parse(cachedEvents));
        setLoading(false)
        return cachedEvents;
      }
      
      const res = await fetchEvents(page, limit);
      const events = res.data.events;
      setEvents(events);
      setTotalJournalPages(res.data.totalPages);
      sessionStorage.setItem("events", JSON.stringify(events));
      
      return events;
    } catch (err) {
      console.error('Error fetching events:', err);
      showBanner({ 
        message: 'Failed to fetch events', 
        type: 'error', 
        setMessage, setType, setIsVisible 
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading, setEvents, setTotalJournalPages, setMessage, setType, setIsVisible]);

  // Update cache
  const updateCache = useCallback(() => {
    sessionStorage.removeItem("events");
    refreshEvents();
  }, [refreshEvents]);

  const addEvent = async (eventData) => {
    await createEvent(eventData);
    updateCache();
  };

  const editEvent = async (id, eventData) => {
    await updateEvent(id, eventData);
    updateCache();
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    updateCache();
  };

  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

  return { addEvent, editEvent, removeEvent, refreshEvents };
};

// Prepopulate form data
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

// Handles Journal section toggling
export const useToggleSections = (groupedEvents) => {
  const { expandedSections, setExpandedSections } = useContext(EventContext);

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
          setExpandedSections(prev => ({ 
            ...prev,
            [mostRecentDate.year]: true,
            [`${mostRecentDate.year}-${mostRecentDate.month}`]: true,
            [`${mostRecentDate.year}-${mostRecentDate.month}-${mostRecentDate.day}`]: true,
          }));
        }
      }
    }, [groupedEvents, setExpandedSections]);

  return { expandedSections, setExpandedSections, toggleSection };
};
