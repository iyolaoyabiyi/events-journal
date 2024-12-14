import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import CONFIG from "../../CONFIG";
import { titles } from "../utils/helpers";

const appName = CONFIG?.appName || "Events Journal";

const useTitle = () => {
  const location = useLocation();
  
  useEffect(() => {
    document.title = titles[location.pathname] || appName;
  }, [location.pathname]);

  return null;
}

export default useTitle;