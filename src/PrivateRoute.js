import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  let user = sessionStorage.getItem('user');
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}