import { useLocation} from "react-router-dom";

import Button from "./Button";
import { useFormNavigation } from "../hooks/Hooks";

const Footer = () => {
  const location = useLocation();
  const setFormAndNavigate = useFormNavigation();
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white py-4 shadow-lg flex justify-center">
      { 
        location.pathname !== "/log-event" &&
        <Button type="button" classType="primary" clickFunc={ setFormAndNavigate } btnText="Log new event" />
      }
  </footer>
  )
}

export default Footer;