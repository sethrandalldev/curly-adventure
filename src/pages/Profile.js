import React, { useState, useEffect } from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../components/NavBar";
import PropTypes from "prop-types";
import ProfileBar from "../components/ProfileBar";
import ProfileMain from "../components/ProfileMain";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "100px auto",
    padding: "15px",
    borderRadius: "25px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
  },
  form: {},
  textfield: {
    width: "250px",
  },
  submitButton: {
    color: "#FFF",
    margin: "25px 0 40px",
  },
  createLink: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
  },
  book: {
    display: "flex",
  },
  profileContainer: {
    display: "flex",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Profile() {
  const classes = useStyles();
  let user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;

  return (
    <div>
      <NavBar />
      <div className={classes.profileContainer}>
        <ProfileBar />
        <ProfileMain />
      </div>
    </div>
  );
}

export default Profile;
