import PropTypes from "prop-types";

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      {/* Header */}
      <p className="text-sm text-gray-500 mb-2">
        {new Date(event.startTime).toLocaleString()}
      </p>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-gray-800">{event.name}</h3>
        <span className="text-sm text-teal-500 font-medium">{event.category}</span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-2">
        {event.description || "No description available."}
      </p>

      {/* Time Details */}
      {event.endTime && (
        <p className="text-sm text-gray-500">
          <strong>End:</strong> {new Date(event.endTime).toLocaleString()}
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end mt-4 space-x-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 text-sm font-medium text-teal-600 border border-teal-600 rounded 
          hover:bg-teal-50"
        >
            Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded 
          hover:bg-red-50"
        >
            Delete
        </button>
      </div>
    </div>
  );
};

EventCard.propTypes = {
event: PropTypes.object,
onEdit: PropTypes.func,
onDelete: PropTypes.func
}

export default EventCard;
