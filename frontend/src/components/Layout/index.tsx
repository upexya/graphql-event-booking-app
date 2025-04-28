import { Outlet } from "react-router-dom";

import Navbar from "@components/Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="m-auto p-2 sm:p-6 lg:p-8">
        <Outlet />
      </div>
    </div>
  );
}
