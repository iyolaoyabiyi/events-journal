import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Local imports
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import Journal from "./pages/Journal";
import Layout from "./components/Layout";
import LogEvent from "./pages/LogEvent";
// Context Providers
import BannerProvider from "./store/BannerProvider";
import EventProvider from "./store/EventProvider";
import FormProvider from "./store/FormProvider";

const App = () => (
  <EventProvider>
  <BannerProvider>
  <FormProvider>
    <Router>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Journal /> } />
          <Route path="categories" element={ <Categories /> } />
          <Route path="events" element={ <Events /> } />
          <Route path="log-event" element={ <LogEvent /> } />
        </Route>
      </Routes>
    </Router>
  </FormProvider>
  </BannerProvider>
  </EventProvider>
);
export default App;
