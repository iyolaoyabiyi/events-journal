import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { BannerContext, FormContext } from "../store/Contexts";
import { useEventOperations } from "../hooks/Hooks";
import EventForm from "../components/EventForm";
import { showBanner } from "../utils/helpers";

const LogEvent = () => {
  const { addEvent, editEvent } = useEventOperations();
  const {formData, setFormData, isUpdate, setUpdateStat} = useContext(FormContext);
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
      if (isUpdate) {
        await editEvent(formData.id, formData);
        message = "Event updated!";
      } else {
        message = "New event added!";
        await addEvent(formData);
      }
      showBanner({setMessage, message, setType, type, setIsVisible });
      // Navigate to homepage
      navigate("/", { replace: true });
      setTimeout(() => {
        setUpdateStat(false);
      }, 100);
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
