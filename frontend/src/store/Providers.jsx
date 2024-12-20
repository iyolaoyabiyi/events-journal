import PropTypes from "prop-types";
import { useState } from "react";

import { BannerContext, EventContext, FormContext } from "./Contexts";

import { defaultFormData } from "../utils/helpers";

export const BannerProvider = ({ children }) => {
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

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [totalJournalPages, setTotalJournalPages] = useState(1);

  return (
    <EventContext.Provider 
      value={{events, setEvents, expandedSections, setExpandedSections, totalJournalPages, 
      setTotalJournalPages, isLoading, setLoading}}>
      { children }
    </EventContext.Provider>
  )
}

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [isUpdate, setUpdateStat] = useState(false);

  return (
    <FormContext.Provider value={{formData, setFormData, isUpdate, setUpdateStat}}>
      { children }
    </FormContext.Provider>
  )
}

const AppProviders = ({ children }) =>  (
  <EventProvider>
  <BannerProvider>
  <FormProvider>
    { children }
  </FormProvider>
  </BannerProvider>
  </EventProvider>
)

BannerProvider.propTypes = {
  children: PropTypes.element
}

EventProvider.propTypes = {
  children: PropTypes.element
}

FormProvider.propTypes = {
  children: PropTypes.element
}

AppProviders.propTypes = {
  children: PropTypes.element
}

export default AppProviders;