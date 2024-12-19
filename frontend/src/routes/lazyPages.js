import { lazy } from "react";

// Lazy load pages
export const Categories = lazy(() => import("../pages/Categories"));
export const Events = lazy(() => import("../pages/Events"));
export const LogEvent = lazy(() => import("../pages/LogEvent"));
export const Journal = lazy(() => import("../pages/Journal"));