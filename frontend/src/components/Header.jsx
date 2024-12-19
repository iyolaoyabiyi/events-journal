import { NavLink } from "react-router-dom";
import { useContext } from "react";

import Banner from "./Banner";
import { BannerContext } from "../store/Contexts";
import CONFIG from "../../CONFIG";

const Header = () => {
  const { isVisible, message, type, duration} = useContext(BannerContext);
  const appName = CONFIG?.appName || "Events Journal";

  return (
    <header className="sticky top-0 z-10">
      <div className="bg-green-100 p-4 shadow-md">
        <h1 className="text-3xl font-extrabold text-green-600 text-center">{appName}</h1>
        <nav className="flex justify-center gap-6 mt-4 uppercase text-sm font-medium text-green-700">
          {[
            { path: "/", label: "Journal" },
            { path: "/events", label: "Events" },
            { path: "/categories", label: "Categories" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `hover:text-green-900 transition ${isActive ? "font-bold underline" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
      {
        isVisible && 
        <Banner message={ message } type={ type } duration={ duration }/>
      }
    </header>
  )
}

export default Header;