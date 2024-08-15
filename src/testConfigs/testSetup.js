import React from "react";
import UserContext from "../auth-user/UserContext";

const demoUser = {
    username: "testuser",
    first_name: "testfirst",
    last_name: "testlast",
    email: "test@test.com",
    photo_url: null,
    applications: []
  };

  const UserProvider =
      ({ children, currUser = demoUser, hasAppliedToJob = () => false }) => (
      <UserContext.Provider value={{ currUser, hasAppliedToJob }}>
        {children}
      </UserContext.Provider>
  );

  export {UserProvider};
