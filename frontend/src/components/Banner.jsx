import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

import { BannerContext } from "../store/Contexts";
import { bannerStyles } from "../utils/helpers";

const Banner = ({ type, message, duration = 5000 }) => {
  const {isVisible, setIsVisible} = useContext(BannerContext);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setIsVisible(false);
      }, duration);
    }
  }, [duration, isVisible, setIsVisible]);

  if (!isVisible) return null;

  return (
    <div className={`p-4 my-4 rounded-lg shadow-md text-center ${bannerStyles[type]} transition-opacity`}>
      { message }
    </div>
  )
}

Banner.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["info", "success", "warning", "error"]),
  duration: PropTypes.number,
};

export default Banner;