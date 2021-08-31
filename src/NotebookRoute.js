import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function NotebookRoute({ children, ...rest }) {
  const userId = useSelector((state) => state.user.id);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return userId.length ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

export default NotebookRoute;
