import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import Footer from "../layout/Footer";
import NotLoggedHome from "../layout/MainNotLogged";
import LoggedHome from "../layout/MainLogged";
import AwaitVerify from "../layout/AwaitVerify"
function Home() {
  const { userData } = useContext(UserContext);
  return (
    <div>
      {userData.user ? (
        userData.user.isVerified?(<LoggedHome />):(<AwaitVerify/>)
        
      ) : (
        <>
          <NotLoggedHome />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;
