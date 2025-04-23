import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import Spinner from "@components/Common/Spinner";
import Toast from "@components/Common/Toast";

import routes from "@constants/routes";
import { REGISTER_USER } from "@queries/auth";

export default function Signup() {
  const navigate = useNavigate();

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const [show_password, setShowPassword] = useState(false);
  const [form_state, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, password, avatar } = form_state;

    if (loading || !name.trim() || !email.trim() || !password.trim()) return;

    await registerUser({
      variables: {
        input: {
          name,
          email,
          password,
          avatar,
        },
      },
    });
    navigate(routes.LOGIN);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      {error ? <Toast type="danger" message={error?.message} /> : null}

      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              type="name"
              name="name"
              id="name"
              autoComplete="name"
              required
              onChange={handleFormChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="avatar"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Image url
          </label>
          <div className="mt-2">
            <input
              type="avatar"
              name="avatar"
              id="avatar"
              autoComplete="avatar"
              required
              onChange={handleFormChange}
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
            />
          </div>
        </div>

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
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
          <div className="mt-2 relative">
            <input
              type={show_password ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={handleFormChange}
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
            className="flex w-full cursor-pointer justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-100"
          >
            {loading ? (
              <div className="mr-2">
                <Spinner />
              </div>
            ) : null}
            Sign up
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?
        <Link
          to={routes.LOGIN}
          className="font-semibold text-primary hover:text-primary-100"
        >
          {" "}
          Login instead
        </Link>
      </p>
    </div>
  );
}
