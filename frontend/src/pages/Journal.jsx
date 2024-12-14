import PropTypes from "prop-types";
import { useContext } from "react";

import api from "../../services/api";
import BannerContext from "../store/BannerContext";
import EventContext from "../store/EventContext";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { showBanner } from "../utils/helpers";
import useFormNavigation from "../hooks/useFormNavigation";

const Journal = () => {
  const { events, isLoading, setEvents } = useContext(EventContext);
  const { setIsVisible, setMessage, setType} = useContext(BannerContext);

  const setFormAndNavigate = useFormNavigation()
  const handleEdit = (event) => {
    setFormAndNavigate({formData: event, status: true});
  };
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
    <section className="page">
      <h2 className="page-heading">Journal</h2>
      { isLoading ? 
        <Loading /> :
        <ul>
          { events.map(event => {
            return (
              <EventCard 
                key={event.id}
                event={ event }
                onEdit={() => handleEdit(event)}
                onDelete={() => handleDelete(event.id)}
              />
            )
          }) }
        </ul>
      }
    </section>
  );
}

Journal.propTypes = {
  isLoading: PropTypes.bool
}

export default Journal;