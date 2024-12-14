import PropTypes from "prop-types";
import { useState } from "react";

import BannerContext from "./BannerContext";


const BannerProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");
  const [duration, setDuration] = useState(3000);

  return (
    <BannerContext.Provider value={ {isVisible, setIsVisible, message, setMessage, type, setType, duration, setDuration} }>
      { children }
    </BannerContext.Provider>
  )
}

BannerProvider.propTypes = {
  children: PropTypes.element
}

export default BannerProvider;