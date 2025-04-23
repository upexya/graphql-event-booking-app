import { createContext, useState } from "react";

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
  };

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
