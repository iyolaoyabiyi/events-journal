import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
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