import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "../../App.css"
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
    <div className="verifybox">
      <Typography>
        You need to verify your email adress before using this website. 
      </Typography>
      <Typography>
        If you didnt recieve your email check your spam and unwanted folders or click on the button to resend email.
      </Typography>
      <Button variant="contained" color="primary" className="verifybutton" onClick={resend}>
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
