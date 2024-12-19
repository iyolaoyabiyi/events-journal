import CONFIG from '../../CONFIG';

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

// Group events
export const groupEvents = (events) => {
  if (!events || events.length === 0) return new Map();

  const groupedEvents = new Map();

  events.forEach((event) => {
    const startTime = new Date(event.startTime);
    const year = startTime.getFullYear();
    const month = startTime.toLocaleString("default", { month: "long" });
    const day = startTime.toLocaleDateString("default", { weekday: "long", day: "numeric" });
    // Initialize year group
    if (!groupedEvents.has(year)) {
      groupedEvents.set(year, new Map());
    }
    const yearGroup = groupedEvents.get(year);
    // Initialize month group
    if (!yearGroup.has(month)) {
      yearGroup.set(month, new Map());
    }
    const monthGroup = yearGroup.get(month);
    // Initialize day group
    if (!monthGroup.has(day)) {
      monthGroup.set(day, []);
    }
    // Add event to day group
    monthGroup.get(day).push(event);
  });

  return groupedEvents;
};

// Find the most recent year, month, and day with events
export const getMostRecentDate = (groupedEvents) => {
  if (!groupedEvents || groupedEvents.size === 0) return null;

  // Convert Map keys (years) to an array and sort in descending order
  const sortedYears = Array.from(groupedEvents.keys()).sort((a, b) => b - a);

  for (const year of sortedYears) {
    const months = groupedEvents.get(year);
    if (months && months.size > 0) {
      // Convert month keys to an array and sort in descending order
      const sortedMonths = Array.from(months.keys()).sort((a, b) => 
        new Date(`01 ${b} ${year}`) - new Date(`01 ${a} ${year}`)
      );

      for (const month of sortedMonths) {
        const days = months.get(month);
        if (days && days.size > 0) {
          // Convert day keys to an array and sort in descending order
          const sortedDays = Array.from(days.keys()).sort(
            (a, b) =>
              new Date(`${year}-${month}-${b.split(", ")[1]}`) -
              new Date(`${year}-${month}-${a.split(", ")[1]}`)
          );

          if (sortedDays.length > 0) {
            return { year, month, day: sortedDays[0] };
          }
        }
      }
    }
  }

  return null; // If no events exist
};

// Get unique events
export const getEventNames = events => {
  const updatedEvents = events.filter((event, index, events) => index === events.findIndex(item => event.name === item.name && event.category === item.category));
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