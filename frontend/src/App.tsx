import { BrowserRouter, Routes, Route } from "react-router-dom";

import routes from "@constants/routes";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME} element={<>home </>}></Route>
        <Route path={routes.AUTH} element={<>auth</>} />
        <Route path="*" element={<>page not found</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
