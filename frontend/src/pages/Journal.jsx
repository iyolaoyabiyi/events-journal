import { ChevronDownIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useMemo, useState } from "react";

import api from "../../services/api";
import { BannerContext, EventContext } from "../store/Contexts";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { getMostRecentDate, groupEvents, showBanner } from "../utils/helpers";
import { useFormNavigation } from "../hooks/Hooks";

const Journal = () => {
  const { events, isLoading, setEvents } = useContext(EventContext);
  const { setIsVisible, setMessage, setType} = useContext(BannerContext);
  const [expandedSections, setExpandedSections] = useState({});
  const setFormAndNavigate = useFormNavigation();
  
  // Group events when the events changes
  const groupedEvents = useMemo(() => {
    return events ? groupEvents(events) : {};
  }, [events]);

  console.log(groupedEvents);
  // Updates expanded sections when groupedEvents changes
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

  // Handle section toggles
  const toggleSection = (key) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  // Handle edit button
  const handleEdit = (event) => {
    setFormAndNavigate({formData: event, status: true});
  };
  // Handle delete button
  const handleDelete = async (id) => {
    // Confirm Deletion
    const isSure = confirm("Are you sure you want to delete event?");
    // Delete Event
    if (isSure) {
      await api.delete(`/events/${id}`);
      // Update events
      const res = await api.get("/events");
      setEvents(res.data.events);
      // Display banner
      const message = "Event Deleted";
      const type = "success";
      showBanner({setMessage, message, setType, type, setIsVisible});
    }
  };

  return (
    <section className="page bg-gray-50 p-6">
      <h2 className="page-heading text-3xl font-extrabold text-green-700 mb-4">Journal</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          {[...groupedEvents.entries()].map(([year, months]) => (
              <div key={year} className="border border-green-300 bg-white shadow-lg rounded-lg p-4">
                <h3
                  className="cursor-pointer font-bold text-xl text-green-800 flex items-center
                  justify-between"
                  onClick={() => toggleSection(year)}
                >
                  {year}
                  <span className="ml-2 text-green-500">
                    {expandedSections[year] ? (
                      <ChevronDownIcon className="w-6 h-6" />
                    ) : (
                      <ChevronRightIcon className="w-6 h-6" />
                    )}
                  </span>
                </h3>
                {expandedSections[year] &&
                  [...months.entries()].map(([month, days]) => (
                    <div key={month} className="pl-4 mt-2">
                      <h4
                        className="cursor-pointer font-medium text-lg text-green-700 flex items-center 
                        justify-between"
                        onClick={() => toggleSection(`${year}-${month}`)}
                      >
                        <span className="flex items-center">
                          <CalendarIcon className="w-5 h-5 mr-2 text-green-600" /> {month}
                        </span>
                        <span className="ml-2 text-green-500">
                          {expandedSections[`${year}-${month}`] ? (
                            <ChevronDownIcon className="w-6 h-6" />
                          ) : (
                            <ChevronRightIcon className="w-6 h-6" />
                          )}
                        </span>
                      </h4>
                      {expandedSections[`${year}-${month}`] &&
                        [...days.entries()].map(([day, dayEvents]) => (
                          <div key={day} className="pl-8 mt-2">
                            <h5
                              className="cursor-pointer font-light text-md text-green-600 flex items-center
                              justify-between"
                              onClick={() => toggleSection(`${year}-${month}-${day}`)}
                            >
                              <span className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-2 text-green-500" /> {day}
                              </span>
                              <span className="ml-2 text-green-500">
                                {expandedSections[`${year}-${month}-${day}`] ? (
                                  <ChevronDownIcon className="w-6 h-6" />
                                ) : (
                                  <ChevronRightIcon className="w-6 h-6" />
                                )}
                              </span>
                            </h5>
                            {expandedSections[`${year}-${month}-${day}`] &&
                              dayEvents.map((event) => (
                                <EventCard
                                  key={event.id}
                                  event={event}
                                  onEdit={() => handleEdit(event)}
                                  onDelete={() => handleDelete(event.id)}
                                  className="bg-green-50 shadow-md rounded-md p-4 mt-2"
                                />
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      )}
    </section>

  );
}

export default Journal;