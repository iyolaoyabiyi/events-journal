import PropTypes from "prop-types";
import { memo } from "react";

const List = ({ items, renderItem }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index} className="bg-green-50 text-green-700 px-4 py-2 rounded-md shadow-sm hover:bg-green-100 mb-2">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  )
}

List.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func
}

export default memo(List);