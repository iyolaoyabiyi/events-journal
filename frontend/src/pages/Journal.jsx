import { ChevronDownIcon, ChevronRightIcon, CalendarIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useMemo, useState } from "react";

import { BannerContext, EventContext } from "../store/Contexts";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { groupEvents, showBanner } from "../utils/helpers";
import { useFormNavigation, useToggleSections, useEventOperations } from "../hooks/Hooks";
import EmptyEvents from '../components/EmptyEvents';
import Button from '../components/Button';

const Journal = () => {
  const { events, isLoading, totalJournalPages } = useContext(EventContext);
  const { setIsVisible, setMessage, setType} = useContext(BannerContext);
  const [currentPage, setCurrentPage] = useState(1);
  const setFormAndNavigate = useFormNavigation();
  const { refreshEvents, removeEvent } = useEventOperations();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  
  // Group events when the events changes
  const groupedEvents = useMemo(() => {
      return filteredEvents.length ? groupEvents(filteredEvents) : groupEvents(events);
  }, [events, filteredEvents]);
  const { expandedSections, toggleSection } = useToggleSections(groupedEvents);

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
      await removeEvent(id);
      // Display banner
      const message = "Event Deleted";
      const type = "success";
      showBanner({setMessage, message, setType, type, setIsVisible});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await refreshEvents({page: currentPage, limit: 100, isForced: true});
    };
    fetchData();
  }, [currentPage, refreshEvents]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredEvents(
        events.filter(
          (event) =>
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredEvents([]);
    }
  }, [searchTerm, events]);  

  return (
    <section className="page bg-gray-50 p-6">
      <h2 className="page-heading text-3xl font-extrabold text-green-700 mb-4">Journal</h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search events by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-green-500 focus:border-green-500"
        />
      </div>
      {isLoading ? (
        <Loading count={5} height="50px" />
      ) : 
      events.length < 1 ? <EmptyEvents text="events" /> : (
        <div className="space-y-6">
          {[...groupedEvents.entries()].map(([year, months]) => (
              <div key={year} className="border border-green-300 bg-white shadow-lg rounded-lg p-4">
                <h3 className="cursor-pointer font-bold text-xl text-green-800 flex items-center
                  justify-between"
                  onClick={() => toggleSection(year)}>
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
                      <h4 className="cursor-pointer font-medium text-lg text-green-700 flex items-center 
                        justify-between"
                        onClick={() => toggleSection(`${year}-${month}`)}>
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
                            <h5 className="cursor-pointer font-light text-md text-green-600 flex 
                              items-center justify-between"
                              onClick={() => toggleSection(`${year}-${month}-${day}`)}>
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
            <div className="flex justify-center items-center space-x-4 mt-6">
              <Button 
                type="button" 
                classType={currentPage === 1 ? "default" : "primary"}
                clickFunc={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                btnText="Previous" disabled={currentPage === 1}
              />
              <span>Page {currentPage} of {totalJournalPages}</span>
              <Button 
                type="button" 
                classType={currentPage === totalJournalPages ? "default" : "primary"}
                clickFunc={() => setCurrentPage((prev) => Math.min(prev + 1, totalJournalPages))}
                btnText="Next" disabled={currentPage === totalJournalPages}
              />
            </div>
        </div>
      )}
    </section>
  );
}

export default Journal;