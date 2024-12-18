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
  "/": `Journal :: ${CONFIG.appName}`,
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

// Group events
export const groupEvents = events =>  {
  return events.reduce((acc, event) => {
    const year = new Date(event.startTime).getFullYear();
    const month = new Date(event.startTime).toLocaleString('default', { month: 'long' });
    const day = new Date(event.startTime).toLocaleDateString('default', { weekday: 'long', day: 'numeric' });
    
    acc[year] = acc[year] || {};
    acc[year][month] = acc[year][month] || {};
    acc[year][month][day] = acc[year][month][day] || [];
    acc[year][month][day].push(event);

    return acc;
  }, {});
}

// Find the most recent year, month, and day with events
export const getMostRecentDate = (groupedEvents) => {
  const years = Object.keys(groupedEvents).map(Number).sort((a, b) => b - a); // Sort years descending
  for (const year of years) {
    const months = Object.keys(groupedEvents[year])
      .sort((a, b) => new Date(`01 ${b} ${year}`) - new Date(`01 ${a} ${year}`)); // Sort months descending
    for (const month of months) {
      const days = Object.keys(groupedEvents[year][month])
        .sort(
          (a, b) =>
            new Date(`${year}-${month}-${b.split(", ")[1]}`) -
            new Date(`${year}-${month}-${a.split(", ")[1]}`)
        ); // Sort days descending
      if (days.length > 0) {
        return { year, month, day: days[0] }; // Return the most recent year, month, and day
      }
    }
  }
  return null; // If no events exist
};

// Get unique events
export const getEventNames = events => {
  const updatedEvents = events.filter((event, index, events) => index === events.findIndex(item => event.name === item.name) );
  return updatedEvents;
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