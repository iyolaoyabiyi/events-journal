import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom";

import { defaultFormData } from "../utils/helpers";
import FormContext from "../store/FormContext"

const useFormNavigation = () => {
  const { setFormData, setUpdateStat } = useContext(FormContext);
  const navigate = useNavigate();

  const setFormAndNavigate = useCallback(({ formData = defaultFormData, status = false }) => {
    // Set form data
    setUpdateStat(status);
    setFormData({...formData});
    // Navigate to form
    navigate("/log-event");
  }, [navigate, setFormData, setUpdateStat]);

  return setFormAndNavigate;
}

export default useFormNavigation;