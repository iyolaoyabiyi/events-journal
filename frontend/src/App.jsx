import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
// Helper Functions
import { defaultFormData } from "./utils/helpers";
// Contexts
import EventContext from "./store/EventContext";
import FormContext from "./store/FormContext";
// Pages and Components
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import Journal from "./pages/Journal";
import Layout from "./components/Layout";
import LogEvent from "./pages/LogEvent";
import BannerProvider from "./store/BannerProvider";

function App() {
  // Initialize global states
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [isLoading, setLoading] = useState(true);
  const [isUpdate, setUpdateStat] = useState(false);
  // Updates the categories list
  useEffect(() => {
    const uniqueCategories = new Set(events.map(event => event.category));
    setCategories([...uniqueCategories]);
  }, [events]);

  return (
    <BannerProvider>
    <EventContext.Provider value={{events, setEvents, isLoading, setLoading}}>
    <FormContext.Provider value={{formData, setFormData, isUpdate, setUpdateStat}}>
      <Router>
        <Routes>
          <Route path="/" element={ <Layout /> }>
            <Route index element={ <Journal events={ events } isLoading={ isLoading } /> } />
            <Route path="categories" element={ <Categories categories={ categories } isLoading={ isLoading } /> } />
            <Route path="events" element={ <Events events={ events } isLoading={ isLoading } /> } />
            <Route path="log-event" element={ <LogEvent /> } />
          </Route>
        </Routes>
      </Router>
    </FormContext.Provider>
    </EventContext.Provider>
    </BannerProvider>
  );
}

export default App;
