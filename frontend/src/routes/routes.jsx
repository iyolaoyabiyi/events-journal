import { Categories, Events, Journal, LogEvent } from "./lazyPages";

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