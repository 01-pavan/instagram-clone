import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DashBoard = lazy(() => import("./pages/DashBoard"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading.....</p>}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.DASHBOARD} element={<DashBoard />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
