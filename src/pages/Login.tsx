import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { login } from "../api/api";
import { useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user";
import { RootState } from "../app/store";

const useStyles = makeStyles({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "80px auto",
    padding: "15px",
    borderRadius: "25px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  textfield: {
    width: "250px",
  },
  submitButton: {
    color: "#FFF",
    margin: "25px 0 40px",
  },
  createLink: {
    textDecoration: "none",
  },
  header: {
    fontSize: "48px",
    margin: "30px 0 10px",
  },
  subhead: {
    color: "#000",
    fontSize: "24px",
    margin: "0",
  },
});

function Login() {
  const classes = useStyles();
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userId: string = useSelector((state: RootState) => state.user.id);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    setValue: {
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (arg0: any): void;
    }
  ) => {
    const { value } = e.target;
    setValue(value);
  };

  const formSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    login({
      email,
      password,
    }).then((val) => {
      if (val) {
        dispatch(setUser(val));
        history.push("/");
      }
    });
  };

  return userId.length ? (
    <Redirect to="/" />
  ) : (
    <div>
      <h1 className={classes.header}>Shelfinator</h1>
      <h3 className={classes.subhead}>A virtual bookshelf.</h3>
      <div className={classes.formContainer}>
        <h1>Login</h1>
        <form onSubmit={formSubmit}>
          <TextField
            className={classes.textfield}
            required
            label="Email"
            value={email}
            onChange={(e) => handleInputChange(e, setEmail)}
          />
          <TextField
            className={classes.textfield}
            required
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
          />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submitButton}
          >
            Submit
          </Button>
        </form>
        <Link to="/register" className={classes.createLink}>
          Create New Account
        </Link>
      </div>
    </div>
  );
}

export default Login;
