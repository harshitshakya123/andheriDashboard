import { useEffect, useState } from "react";
import RouteConfig from "./routes/RouteConfig";
import { UserProfileContext } from "./store/UserProfileStore";
import { asyncLocalStorage } from "./utils/apiUtils";
import FullPageLoader from "./components/FullPageLoader";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const [userProfileC, dispatchUserProfile] = UserProfileContext();
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    asyncLocalStorage
      .getItem("userData")
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          if (Object.keys(data).length) {
            dispatchUserProfile({
              type: "ADD_USER_DATA",
              payload: data,
            });
            navigate(pathname || "/sidebar/dashboard");
          } else {
            dispatchUserProfile({
              type: "SET_SIGNED_IN",
              payload: false,
            });
            return navigate("/login");
          }
        }, 1000);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, []);

  return (
    <>
      {loading ? (
        <FullPageLoader />
      ) : (
        // <RouteConfig userRole={userProfileC?.userData?.role} signedIn={userProfileC?.signedIn} />
        <RouteConfig userRole={"Super Admin"} signedIn={true} />
      )}
    </>
  );
}

export default App;
