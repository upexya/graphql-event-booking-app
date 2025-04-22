import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "@components/Login";
import Signup from "@components/Signup";

export default function Auth() {
  const [url_params, setUrlParams] = useSearchParams();

  const handleTabChange = (tab: "login" | "signup") => {
    setUrlParams({ tab: tab });
  };

  const active_tab = url_params.get("tab") || "login";

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-primary-200">
            {active_tab === "login" ? "Login" : "Sign up"}
          </h2>
        </div>

        <div className="mt-10 flex justify-center width-full">
          <button
            onClick={() => handleTabChange("login")}
            className={`${
              active_tab === "login" ? "bg-primary" : "bg-gray-200"
            } text-white px-4 py-2 rounded-l-md cursor-pointer`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabChange("signup")}
            className={`${
              active_tab === "signup" ? "bg-primary" : "bg-gray-200"
            } text-white px-4 py-2 rounded-r-md cursor-pointer`}
          >
            Sign up
          </button>
        </div>

        {active_tab === "login" ? <Login /> : <Signup />}
      </div>
      <ToastContainer />
    </>
  );
}
