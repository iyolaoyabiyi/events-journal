import CONFIG from '../../CONFIG';
import api from '../../services/api';

// Default data for event form
export const defaultFormData = {
  id: '',
  name: '',
  category: 'None',
  description: '',
  startTime: '',
  endTime: ''
}

// Page Titles
export const titles = {
  "/": `Journals :: ${CONFIG.appName}`,
  "/events": `Events :: ${CONFIG.appName}`,
  "/categories": `Categories :: ${CONFIG.appName}`,
  "/log-event": `Event Form :: ${CONFIG.appName}`,
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

// Banner styles
export const bannerStyles = {
  info: "bg-blue-100 text-blue-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700"
}

// Gets latest events from server
export const getEvents = async () => {
  try {
    const res = await api.get("/events");
    const events = res.data.events;
    return events;
  } catch (err) {
    console.error(err);
  }
}

// Get categories from event
export const getCategories = events => {
  return [...new Set(events.map(event => event.category))];
}

// Shows banner
export const showBanner = (options) => {
  options.setMessage(options.message);
  options.setType(options.type);
  options.setIsVisible(true);
}