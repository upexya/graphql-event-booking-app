import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "@constants/routes";

import Auth from "@views/Auth";
import Events from "@views/Events";
import Bookings from "@views/Bookings";
import Home from "@views/Home";

import Layout from "@components/Layout";

import { UserContext } from "@context/user";

import "./App.css";

function App() {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    let user: any = localStorage.getItem("user");
    let token: string = localStorage.getItem("token") || "";
    if (token && user) {
      user = JSON.parse(user);
      setUser({ token, user });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME} element={<Layout />}>
          <Route path={routes.HOME} element={<Home />} />
          <Route path={routes.AUTH} element={<Auth />} />
          <Route path={routes.EVENTS} element={<Events />} />
          <Route path={routes.BOOKINGS} element={<Bookings />} />
          <Route path="*" element={<>page not found</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
