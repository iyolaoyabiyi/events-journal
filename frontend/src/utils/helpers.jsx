import api from '../../services/api';

// Default data for event form
export const defaultFormData = {
  id: '',
  name: '',
  category: '',
  description: '',
  startTime: '',
  endTime: ''
}

// Updates event from backend
export const updateEvents = async (setEvents, setLoading) => {
  try {
    setLoading(true);
    const res = await api.get("/events");
    const events = res.data.events;
    setEvents(events);
    // setTimeout(() => {
      setLoading(false);
    // }, 2000);
  } catch (err) {
    console.log(err)
  }
  
}