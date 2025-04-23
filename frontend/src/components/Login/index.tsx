import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Spinner from "@components/Common/Spinner";
import Toast from "@components/Common/Toast";

import { LOGIN_USER } from "@queries/auth";
import routes from "@constants/routes";

export default function Login() {
  const navigate = useNavigate();

  const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN_USER);

  const [show_password, setShowPassword] = useState(false);
  const [form_state, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form_state;
    if (loading || !email.trim() || !password.trim()) return;

    await loginUser({ variables: { input: { email, password } } });
    if (data?.login) {
      const { token, user } = data.login;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {error?.message ? <Toast type="danger" message={error?.message} /> : null}

      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              onChange={handleFormChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              type={show_password ? "text" : "password"}
              name="password"
              onChange={handleFormChange}
              id="password"
              autoComplete="current-password"
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
            <span
              className="absolute right-0 top-0 cursor-pointer h-9 flex items-center pr-1"
              onClick={() => setShowPassword(!show_password)}
            >
              <FontAwesomeIcon
                icon={show_password ? faEyeSlash : faEye}
                className="text-gray-400"
              />
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100 cursor-pointer`}
          >
            {loading ? (
              <div className="mr-2">
                <Spinner />
              </div>
            ) : null}
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <Link
          to={routes.SIGNUP}
          className="font-semibold text-primary hover:text-primary-100"
        >
          {" "}
          Signup now
        </Link>
      </p>
    </div>
  );
}
