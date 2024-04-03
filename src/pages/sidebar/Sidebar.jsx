import { useLocation, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import BidsManagement from "./BidsManagement";
import PaymentManagement from "./PaymentManagement";
// import SNSManagement from "./SNSManagement";
// import AdvertiseManagement from "./AdvertiseManagement";
// import MessageManagement from "./MessageManagement";
// import PointsAndReward from "./PointsAndReward";
// import ReportsManagement from "./ReportsManagement";
// import MediaVerseManagement from "./MediaVerseManagement";
// import LeaderBoard from "./Leaderboard";
// import GameBoard from "./Gameboard";
// import RolesManagement from "./RolesMangement";
// import UserDetail from "./UserDetail";
// import StoreDetails from "./StoreDetails";
// import WalletDetails from "./WalletDetails";
// import Announcement from "./Announcement";

const MENU_ITEMS = {
  dashboard: <Dashboard />,
  userManage: <UserManagement />,
  bidsManage: <BidsManagement />,
  paymentManage: <PaymentManagement />,
  //   mediaVerseManage: <MediaVerseManagement />,
  //   snsManage: <SNSManagement />,
  //   adsManage: <AdvertiseManagement />,
  //   messageManage: <MessageManagement />,
  //   pointsManage: <PointsAndReward />,
  //   reportsManage: <ReportsManagement />,
  //   rolesManage: <RolesManagement />,
  //   leaderBoard: <LeaderBoard />,
  //   gameBoard: <GameBoard />,
  //   userDetails: <UserDetail />,
  //   storeDetails: <StoreDetails />,
  //   walletDetails: <WalletDetails />,
  //   announcement: <Announcement />,
};
const Sidebar = () => {
  const params = useParams();
  const location = useLocation();

  return <div>{MENU_ITEMS[params?.path] || MENU_ITEMS[location.pathname.split("/").pop()]}</div>;
};
export default Sidebar;
