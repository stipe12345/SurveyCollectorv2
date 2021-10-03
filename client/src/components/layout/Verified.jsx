import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import "../../App.css";
const Verified = (props) => {
  const { email } = useParams();
  const { token } = useParams();
  const history = useHistory();
  useEffect(() => {
    const Fetch = async () => {
      try {
        const FetchForm = await axios.post("/users/verify", { email: email });
      } catch (err) {}
    };
    Fetch();
  }, []);
  return (
    <div className="verifybox">
      <Typography>Email verification completed!</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Return to home page
      </Button>
    </div>
  );
};
export default Verified;
