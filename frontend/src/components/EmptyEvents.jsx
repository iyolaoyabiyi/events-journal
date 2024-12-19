import Button from "./Button";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const EmptyEvents = ({ text }) => {
  const navigate = useNavigate();
  const navigateToForm = () => {
    navigate("/log-event");
  }
  return (
    <div className="text-center py-10">
      <p className="text-lg text-gray-600 mb-4">No { text } found. Start by logging a new event!</p>
      <Button
        type="button"
        classType="primary"
        clickFunc={ navigateToForm }
        btnText="Log New Event"
      />
    </div>
  )
}

EmptyEvents.propTypes = {
  text: PropTypes.string
}

export default EmptyEvents;