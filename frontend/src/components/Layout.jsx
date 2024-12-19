import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";
// Hooks
import { useEventOperations,  useTitle } from "../hooks/Hooks";
import { useEffect } from "react";

const Layout = () => {
  const { refreshEvents } = useEventOperations();
  // Update page title
  useTitle();
  // Update events on mount
  useEffect(() => {
    refreshEvents();
  }, [refreshEvents]);

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