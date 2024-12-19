import { lazy } from "react";

// Lazy load pages
const Categories = lazy(() => import("../pages/Categories"));
const Events = lazy(() => import("../pages/Events"));
const LogEvent = lazy(() => import("../pages/LogEvent"));
const Journal = lazy(() => import("../pages/Journal"));

// Route Configuration
const routes = [
  {
    path: "/",
    element: <Journal />,
    exact: true,
  },
  {
    path: "/categories",
    element: <Categories />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/log-event",
    element: <LogEvent />,
  },
];

export default routes;