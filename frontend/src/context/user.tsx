import { createContext, useState } from "react";

import client from "@config/apollo";

const initial_value = {
  token: "",
  user: {
    _id: null,
    avatar: null,
    created_events: null,
    email: null,
    name: null,
  },
};

const UserContext = createContext({
  user: initial_value,
  setUser: (_: { token: string; user: any }) => {},
  clearUser: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(initial_value);

  const clearUser = () => {
    setUser(initial_value);
    // Since Apollo caches all of your query results,
    // it's important to get rid of them when the login state changes.
    client.clearStore();
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
