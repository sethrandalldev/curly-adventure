import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

interface PrivateRouteProps {
  children: Array<JSX.Element>;
  [x: string]: any;
}

export default function PrivateRoute({ children, ...rest }: PrivateRouteProps) {
  const userId: string = useSelector((state: RootState) => state.user.id);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userId.length ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
