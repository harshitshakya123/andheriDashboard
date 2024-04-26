import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "../pages/sidebar/Sidebar";
import Login from "../pages/Login";
import Error from "../components/Error";
import UserDetail from "../pages/sidebar/UserDetail";
import Register from "../pages/Register";
import EditProfile from "../pages/EditProfile";
import ForgotPassword from "../pages/ForgotPassword";
import MyLayout from "../pages/sidebar/MyLayout";
import { ConfigProvider } from "antd";
import { constantColor } from "../utils/constant";
import { UserProfileContext } from "../store/UserProfileStore";

const PrivateRoutes = ({ signedIn }) => {
  return signedIn ? <Outlet /> : <Navigate to="/login" />;
};

const RouteConfig = ({ userRole, signedIn }) => {
  const [userProfileC] = UserProfileContext();
  return (
    <ConfigProvider
      theme={{
        token: {
          ...constantColor,
          colorPrimary: userProfileC?.theme,
        },
      }}
    >
      <MyLayout userRole={[userRole]} signedIn={signedIn}>
        <Routes>
          <Route path="/login" element={signedIn ? <Navigate to="/sidebar/dashboard" /> : <Login />} />
          <Route path="/register" element={signedIn ? <Navigate to="/sidebar/dashboard" /> : <Register />} />
          <Route path="/forgot" element={signedIn ? <Navigate to="/sidebar/dashboard" /> : <ForgotPassword />} />
          <Route path="/" element={signedIn ? <Navigate to="/sidebar/dashboard" /> : <Login />} />
          <Route path="*" element={<Error />} />
          <Route path="/unknown" element={<Error />} />

          <Route element={<PrivateRoutes signedIn={signedIn} />}>
            <Route path="/sidebar" element={<Sidebar />}>
              <Route path=":path" element={<Sidebar />}>
                <Route path="userDetails" element={<UserDetail />} />
              </Route>
            </Route>
            <Route path="editProfile" element={<EditProfile />} />
          </Route>
        </Routes>
      </MyLayout>
    </ConfigProvider>
  );
};

export default RouteConfig;
