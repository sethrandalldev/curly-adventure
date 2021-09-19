import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  profileBar: {
    width: "400px",
    backgroundColor: "#282C34",
    margin: "40px",
    borderRadius: "20px",
    color: "#fff",
    height: "fit-content",
  },
}));

function ProfileBar() {
  const classes = useStyles();
  return (
    <div className={classes.profileBar}>
      <div className="profile-image"></div>
      <div className="profile-personal-info">
        <p>Location</p>
        <p>Biography</p>
      </div>
    </div>
  );
}

export default ProfileBar;
