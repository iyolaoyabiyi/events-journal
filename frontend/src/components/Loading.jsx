import PropTypes from "prop-types";

const Loading = ({count = 3, height = "20px", width = "100%"}) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 rounded-md"
          style={{ height: height, width }}
        ></div>
      ))}
    </div>
  );
};

Loading.propTypes = {
  count: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string
}

export default Loading;
