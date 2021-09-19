import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

interface NotebookRouteProps {
  children: Array<JSX.Element>;
  [x: string]: any;
}

function NotebookRoute({ children, ...rest }: NotebookRouteProps) {
  const userId: string = useSelector((state: RootState) => state.user.id);

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
