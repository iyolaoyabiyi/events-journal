import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import EventForm from "../components/EventForm";
import EventContext from "../store/EventContext";
import FormContext from "../store/FormContext";

import { updateEvents } from "../utils/helpers";

const LogEvent = () => {
  const { setEvents, setLoading } = useContext(EventContext);
  const {formData, setFormData, isUpdate, setUpdateStat} = useContext(FormContext);

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
      // Update or Upload the event
      if (isUpdate === true) {
        await api.put(`/events/${formData.id}`, formData);
        alert("Event updated successfully!")
      } else {
        await api.post('/events', formData);
        alert('Event added successfully!');
      }
      setUpdateStat(false);
      await updateEvents(setEvents, setLoading);
      navigate('/');
    } catch (err) {
      console.log(err.response.data.error.join("\n"))
      alert(`An error occured \n \n ${err.response.data.error.join("\n")}`);
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
