import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
const AwaitVerify = (props) => {
  const history = useHistory();
  const [sent, setSent] = useState(false);
  const resend = async () => {
    setSent(true);
    await axios.post("/users/resendemail", {
      email: props.location.state.props.email,
    });
  };
  return props.location.state.props.isVerified ? (
    history.push("/")
  ) : (
    <div style="margin:2px;padding:2px;">
      <Typography>
        You need to verify your email adress before using this website. If you
        didnt recieve your email check your spam and unwanted folders.
      </Typography>
      <Typography>
        Click on the button to resend verification mail and return to home page
      </Typography>
      <Typography>{props.location.state.props.email}</Typography>
      <Button variant="contained" color="primary" onClick={resend}>
        Resend email
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => history.push("/")}
      >
        Return to home page
      </Button>
      {sent ? <Typography>Email sent!</Typography> : <></>}
    </div>
  );
};
export default AwaitVerify;
