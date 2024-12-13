import api from '../../services/api';

// Default data for event form
export const defaultFormData = {
  id: '',
  name: '',
  category: '',
  description: '',
  startTime: 'None',
  endTime: ''
}
// Set button styles based on type
export const getButtonClasses = (type) => {
  const baseClasses = "text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 uppercase";
  const typeClasses = {
    danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    primary: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    default: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
  };

  return `${baseClasses} ${typeClasses[type] || typeClasses.default}`;
};

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