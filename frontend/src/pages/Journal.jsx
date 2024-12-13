import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import api from "../../services/api";
import EventContext from "../store/EventContext";
import FormContext from "../store/FormContext";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";

const Journal = ({ isLoading }) => {
  const { events, setEvents } = useContext(EventContext);
  const { setFormData, setUpdateStat } = useContext(FormContext);
  const navigate = useNavigate();

  const handleEdit = (event) => {
    setFormData(event);
    setUpdateStat(true);
    navigate("/log-event");
  };
  const handleDelete = async (id) => {
    await api.delete(`/events/${id}`)
    const res = await api.get("/events");
    setEvents(res.data.events);
    alert(`Deleted event with ID: ${id}`);
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