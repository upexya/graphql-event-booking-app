import { useState, useContext, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import images from "@constants/images";
import routes from "@constants/routes";

import { UserContext } from "@context/user";

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, clearUser } = useContext(UserContext);

  const is_logged_in = user?.user?._id;

  const [navbar_expanded, setNavbarExpanded] = useState(false);
  const [show_user_dropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const el_body = document.getElementsByTagName("body")?.[0];
    if (!el_body) return;

    if (navbar_expanded) {
      el_body.classList.add("no-mobile-scroll");
    } else {
      el_body.classList.remove("no-mobile-scroll");
    }
  }, [navbar_expanded]);

  const nav_items = useMemo(() => {
    let items = [{ name: "Events", link: routes.EVENTS }];
    if (is_logged_in) items.push({ name: "Bookings", link: routes.BOOKINGS });

    return items;
  }, [is_logged_in]);

  const closeNavbar = () => {
    if (navbar_expanded) setNavbarExpanded(false);
  };

  const handleLogout = () => {
    clearUser();
    closeNavbar();
    if (show_user_dropdown) setShowUserDropdown(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const user_dropdown = show_user_dropdown ? (
    <div
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden hidden sm:flex"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
      tabIndex={-1}
    >
      <Link
        to="#"
        className="block px-4 py-2 text-sm text-gray-700"
        role="menuitem"
        tabIndex={-1}
        onClick={handleLogout}
      >
        Sign out
      </Link>
    </div>
  ) : null;

  const user_profile_content = (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <div className="relative ml-3">
        <button
          type="button"
          className="relative flex cursor-pointer rounded-full bg-white text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary focus:outline-hidden"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setShowUserDropdown(!show_user_dropdown)}
        >
          <img
            className="size-8 rounded-full object-cover"
            src={user?.user?.avatar || images.default_user_img}
            alt=""
          />
        </button>
        {user_dropdown}
      </div>
    </div>
  );

  const login_or_signup_content = (
    <div
      className={`absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 border-0 sm:border rounded-md hover:border-primary ${
        pathname === routes.AUTH ? "border-primary" : "border-primary-200"
      }`}
    >
      <Link
        to={routes.AUTH}
        className={`px-3 py-2 font-semibold hover:text-primary ${
          pathname === routes.AUTH ? "text-primary" : "text-primary-200"
        }`}
      >
        Sign up / Login
      </Link>
    </div>
  );

  return (
    <nav className=" relative shadow-xs">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 fixed w-full bg-white z-10">
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
              onClick={closeNavbar}
            >
              <div className="flex shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src={images.logo}
                  alt="Your Company"
                />
              </div>
            </Link>
            {/* Desktop navigation links */}
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
          {!is_logged_in ? login_or_signup_content : user_profile_content}
        </div>
      </div>
      <div
        style={{
          height: "64px",
          width: "100%",
        }}
      />

      {/* Navigation for mobile view */}
      <div
        className={`sm:hidden absolute w-full z-1 ${
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
              onClick={closeNavbar}
              className="block px-3 py-2 text-base font-medium text-white"
            >
              {item.name}
            </Link>
          ))}
          {is_logged_in ? (
            <Link
              to="#"
              onClick={handleLogout}
              className="block px-3 py-2 text-base font-medium text-white"
            >
              Logout
            </Link>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
