import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import EventForm from "../components/EventForm";
import FormContext from "../store/FormContext";


const LogEvent = () => {
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
        navigate('/');
        alert("Event updated successfully!");
      } else {
        await api.post('/events', formData);
        navigate('/');
        alert('Event added successfully!');
      }
      setUpdateStat(false);
    } catch (error) {
      console.error('Error adding event:', error);
    }
  }

  useEffect(() => {
    
  }, [])
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
