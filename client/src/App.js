import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/layout/Header.jsx";
import Home from "./components/pages/Home";
import SignUp from "./components/auth/Register2";
import SignIn from "./components/auth/Login2";
import UserContext from "./context/userContext";
import NewSurvey from "./components/layout/NewSurvey";
import Survey from "./components/layout/Survey";
import FinishSurvey from "./components/layout/FinishSurvey";
import Completed from "./components/layout/Completed";
import Verified from "./components/layout/Verified";
import AwaitVerify from "./components/layout/AwaitVerify";
import Footer from "./components/layout/Footer";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(()=>{
    if(userData.user!==undefined && userData.token!==undefined)
    {console.log(userData)
    sessionStorage.setItem("auth-token",userData.token);
    console.log(sessionStorage.getItem("auth-token"))
    sessionStorage.setItem("user-data",JSON.stringify(userData.user));
    console.log(sessionStorage.getItem("user-data"))
    }
  },[userData]);
  useEffect(() => {
    const checkLoggedIn = async () => {
      var userdatabuffer=sessionStorage.getItem("user-data");
      var tokenbuffer=sessionStorage.getItem("auth-token");
      if(!((userdatabuffer=== undefined) ||
      (userdatabuffer == null) || (userdatabuffer == "undefined")) && !((tokenbuffer=== undefined) ||
      (tokenbuffer == null) || (tokenbuffer == "undefined")) )
      {
        setUserData({
          user:JSON.parse(userdatabuffer),
          token:sessionStorage.getItem("auth-token"),
        })
      }
      else
      {
      let token = sessionStorage.getItem("auth-token");
      if (token === null || token=== undefined 
       || token == "undefined") {
        sessionStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenResponse = await axios.post(
        "/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenResponse.data) {
        const userRes = await axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    }
    };

    checkLoggedIn();
  }, []);

  return (
    <div className="maincontainer">
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <div className="header">
        <Header />
        </div>
        <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={SignUp} />
          <Route path="/login" component={SignIn} />
          <Route path="/newsurvey" component={NewSurvey} />
          <Route path="/survey/:id" component={Survey} />
          <Route path="/finishsurvey" component={FinishSurvey} />
          <Route path="/completed" component={Completed} />
          <Route path="/confirmation/:email/:token" component={Verified}/>
          <Route path="/awaitverify" component={AwaitVerify}/>
        </Switch>
        </div>
        <div className="footer">
        <Footer/>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
    </div>
  );
}

export default App;
