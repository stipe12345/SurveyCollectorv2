import React, { useContext } from "react";
import UserContext from "../../context/userContext";

import NotLoggedHome from "../layout/MainNotLogged";
import LoggedHome from "../layout/MainLogged";
import { useHistory } from "react-router-dom";
function Home() {
  const history=useHistory();
  const { userData } = useContext(UserContext);
  return (
    <div>
      {userData.user ? (
        userData.user.isVerified?(<LoggedHome />):(
          history.push({
            pathname: "/awaitverify",
            state: { props: userData.user},
          }))
      ) : (
        <>
          <NotLoggedHome />
        </>
      )}
    </div>
  );
}

export default Home;
