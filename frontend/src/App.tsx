import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";

import routes from "@constants/routes";

import Auth from "@views/Auth";
import Events from "@views/Events";
import Bookings from "@views/Bookings";
import Home from "@views/Home";

import Layout from "@components/Layout";

import "./App.css";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

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
