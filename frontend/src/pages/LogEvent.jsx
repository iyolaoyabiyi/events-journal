import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import { BannerContext } from "../store/Contexts";
import EventForm from "../components/EventForm";
import { FormContext } from "../store/Contexts";
import { showBanner } from "../utils/helpers";
import { useEvent } from "../hooks/Hooks";

const LogEvent = () => {
  const {formData, setFormData, isUpdate, setUpdateStat} = useContext(FormContext);
  const { setMessage, setType, setIsVisible } = useContext(BannerContext)

  const navigate = useNavigate();
  const updateEvents = useEvent();
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
      // Update events
      updateEvents();
      // Navigate to homepage
      navigate('/');
      showBanner({setMessage, message, setType, type, setIsVisible });
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
