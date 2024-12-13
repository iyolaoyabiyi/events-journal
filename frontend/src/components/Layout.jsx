import { Outlet, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";

import EventContext from "../store/EventContext";
import Footer from "./Footer";
import Header from "./Header";
import { updateEvents } from "../utils/helpers"

const Layout = () => {
  const location = useLocation();
  const { setEvents, setLoading } = useContext(EventContext);

  useEffect(() => {
    updateEvents(setEvents, setLoading);
  }, [location, setEvents, setLoading]);

  return (
    <main className="min-h-screen flex flex-col justify-between p-5 max-w-screen-md mx-auto border bg-gray-50">
      <Header />
      <section className="flex-1 pt-6 pb-20">
        <Outlet />
      </section>
      <Footer />
    </main>
  )
}

export default Layout;