import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Layout from "./components/Layout";
import Loading from "./components/Loading";
// Context Providers
import AppProviders from "./store/Providers";
// routes
import routes from "./routes/routes";

const App = () => (
  <AppProviders>
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />} >
            {routes.map(({ path, element, exact }, index) => (
              <Route key={index} path={path} element={element} exact={exact} />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </Router>
  </AppProviders>
);
export default App;
