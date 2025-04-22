import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "@constants/images";
import routes from "@constants/routes";

const nav_items = [
  { name: "Home", link: routes.HOME },
  { name: "Events", link: routes.EVENTS },
  { name: "Bookings", link: routes.BOOKINGS },
];

export default function Navbar() {
  const { pathname } = useLocation();

  const [navbar_expanded, setNavbarExpanded] = useState(false);

  return (
    <nav className=" relative shadow-xs">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 fixed w-100 bg-white z-10">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              onClick={() => setNavbarExpanded(!navbar_expanded)}
              className="relative inline-flex items-center justify-center p-2 text-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <Link
              to={routes.HOME}
              className="px-3 py-2 font-semibold text-primary-200 hover:text-primary"
              aria-current="page"
            >
              <div className="flex shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src={images.logo}
                  alt="Your Company"
                />
              </div>
            </Link>
            <div className="hidden sm:ml-6 sm:flex items-center">
              <div className="flex items-center space-x-4">
                {nav_items.map((nav) => (
                  <Link
                    key={`desktop-navlink-${nav.name}`}
                    to={nav.link}
                    className={`px-3 py-2 font-semibold hover:text-primary ${
                      pathname === nav.link
                        ? "text-primary"
                        : "text-primary-200"
                    }`}
                    aria-current="page"
                  >
                    {nav.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* <!-- Profile dropdown --> */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="size-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "64px",
          width: "100%",
        }}
      />

      <div
        className={`sm:hidden absolute w-full ${
          navbar_expanded
            ? "animate-slide-down bg-backdrop"
            : "animate-slide-up hidden"
        }`}
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className={`space-y-1 px-2 pt-2 pb-3 bg-primary`}>
          {nav_items.map((item) => (
            <Link
              key={`mobile-navlink-${item.name}`}
              to={item.link}
              className="block px-3 py-2 text-base font-medium text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
