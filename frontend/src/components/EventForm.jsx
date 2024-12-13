import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import FormContext from "../store/FormContext";
import { defaultFormData } from "../utils/helpers";

const EventForm = ({ handleChange, handleSubmit }) => {
  const {formData, setFormData, isUpdate} = useContext(FormContext);
  const navigate = useNavigate();

  const closeForm = () => {
    setFormData(defaultFormData);
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg space-y-4 max-w-md
    mx-auto">
    {/* Event Name */}
    <div>
      <input type="hidden" name="eventId" value={ formData.id && formData.id } />
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
        Event
      </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter event"
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm
        focus:outline-none focus:ring-green-500 focus:border-green-500"
        value={ formData.name }
      />
    </div>

    {/* Category */}
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
        Category
      </label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter category"
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        value={ formData.category }
      />
    </div>

    {/* Description */}
    <div>
      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Add a brief description"
        onChange={handleChange}
        rows="4"
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        value={ formData.description }
      ></textarea>
    </div>

    {/* Start Time */}
    <div>
      <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
        Start Time
      </label>
      <input
        type="datetime-local"
        step="1"
        id="startTime"
        name="startTime"
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
        value={ formData.startTime && dayjs(formData.startTime).format("YYYY-MM-DDTHH:mm:ss") }
      />
    </div>

    {/* End Time */}
    <div>
      <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
        End Time
      </label>
      <input
        type="datetime-local"
        step="1"
        id="endTime"
        name="endTime"
        onChange={handleChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm 
        focus:outline-none focus:ring-green-500 focus:border-green-500"
        value={ formData.endTime ? dayjs(formData.endTime).format("YYYY-MM-DDTHH:mm:ss") : "" }
      />
    </div>

    {/* Buttons */}
    <div className="flex justify-center gap-5">
        <Button type="button" clickFunc={ closeForm } btnText="Cancel" />
        <Button type="submit" btnText={`${isUpdate ? "Edit" : "Add"} Event`} />
      </div>
    </form>
  )
}

EventForm.propTypes = {
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default EventForm;