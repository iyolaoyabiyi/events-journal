import PropTypes from "prop-types";
import { memo } from "react";

function EventCard({ event, onEdit, onDelete }) {
  return (
    <div className="bg-gray-50 shadow-sm rounded-md p-4 mb-4 transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="bg-green-50 text-green-700 rounded-md shadow-sm hover:bg-green-100 mb-2">{event.category}</h3>
          <p className="text-sm text-gray-700 font-medium">
            {new Date(event.startTime).toLocaleTimeString()} - {event.name}
          </p>
          <p className="text-xs text-gray-500">
            {event.endTime && `To ${new Date(event.endTime).toLocaleTimeString()}`}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        {event.description || "No description available."}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onEdit}
          className="px-3 py-1.5 text-xs font-medium text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label={`Edit ${event.name}`}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1.5 text-xs font-medium text-red-600 border border-red-600 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label={`Delete ${event.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
}

export default memo(EventCard);
