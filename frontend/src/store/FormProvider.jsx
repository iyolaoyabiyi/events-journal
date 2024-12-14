import PropTypes from "prop-types";
import { useState } from "react";

import { defaultFormData } from "../utils/helpers";
import FormContext from "./FormContext";

const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isUpdate, setUpdateStat] = useState(false);

  return (
    <FormContext.Provider value={{formData, setFormData, isUpdate, setUpdateStat}}>
      { children }
    </FormContext.Provider>
  )
}

FormProvider.propTypes = {
  children: PropTypes.element
}

export default FormProvider;