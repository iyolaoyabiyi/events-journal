import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import BannerContext from "../store/BannerContext";
import EventForm from "../components/EventForm";
import EventContext from "../store/EventContext";
import FormContext from "../store/FormContext";
import { showBanner, updateEvents } from "../utils/helpers";

const LogEvent = () => {
  const {formData, setFormData, isUpdate, setUpdateStat} = useContext(FormContext);
  const { setEvents, setLoading } = useContext(EventContext);
  const { setMessage, setType, setIsVisible } = useContext(BannerContext)

  const navigate = useNavigate();
  // Handles form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Submits form inputs
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let message;
      let type = "success";
      // Update or Upload the event
      if (isUpdate === true) {
        await api.put(`/events/${formData.id}`, formData);
        message = "Event updated!";
      } else {
        message = "New event added!";
        await api.post('/events', formData);
      }
      setUpdateStat(false);
      showBanner({setMessage, message, setType, type, setIsVisible });
      await updateEvents(setEvents, setLoading);
      navigate('/');
    } catch (err) {
      const message = err.response.data.error.join(". ");
      const type = "error";
      showBanner({setMessage, message, setType, type, setIsVisible });
    }
  }

  return (
    <div className="page">
      <h2 className="page-heading">Log Event</h2>
      <EventForm
        handleChange={ handleChange }
        handleSubmit={ handleSubmit }
      />
    </div>
  );
};

export default LogEvent;
