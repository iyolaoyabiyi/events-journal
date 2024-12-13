import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "./Button";
import FormContext from "../store/FormContext";
import { defaultFormData } from "../utils/helpers";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setFormData, setUpdateStat } = useContext(FormContext);
  
  const navigateToForm = () => {
    setUpdateStat(false);
    setFormData({...defaultFormData});
    navigate("/log-event");
  }
  
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white py-4 shadow-lg flex justify-center">
      { 
        location.pathname !== "/log-event" &&
        <Button type="button" clickFunc={ navigateToForm } btnText="Log new event" />
      }
  </footer>
  )
}

export default Footer;