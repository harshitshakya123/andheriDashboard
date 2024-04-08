import { useEffect, useState } from "react";
import {
  FileOutlined,
  PieChartOutlined,
  ControlOutlined,
  UserOutlined,
  AppstoreOutlined,
  FundOutlined,
  BarChartOutlined,
  ReadOutlined,
  MessageOutlined,
  DollarOutlined,
  HeatMapOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { Sider, Header, Content } = Layout;
import { useTranslation } from "react-i18next";
import MyHeader from "../Header";
import { rolePermissions } from "../../utils/constant";
import styled from "styled-components";

const MyLayout = ({ userRole, signedIn, children }) => {
  const [t] = useTranslation("global");
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const [selectedSidebar, setSelectedSidebar] = useState("dashboard");
  const allSideBars = [
    { label: t("dashboard"), key: "dashboard", icon: <PieChartOutlined /> },
    { label: t("user.manage"), key: "userManage", icon: <UserOutlined /> },
    { label: t("bids.manage"), key: "bidsManage", icon: <AppstoreOutlined /> },
    { label: t("payment.manage"), key: "paymentManage", icon: <FundOutlined /> },
    // { label: t("media.manage"), key: "mediaVerseManage", icon: <HeatMapOutlined /> },
    // { label: t("sns.manage"), key: "snsManage", icon: <BarChartOutlined /> },
    // { label: t("ad.manage"), key: "adsManage", icon: <ReadOutlined /> },
    // { label: t("points.manage"), key: "pointsManage", icon: <DollarOutlined /> },
    // { label: t("announcement"), key: "announcement", icon: <BellOutlined /> },
    // { label: t("roles.manage"), key: "rolesManage", icon: <ControlOutlined /> },
    // { label: t("reports.manage"), key: "reportsManage", icon: <FileOutlined />, disabled: true },
    // { label: t("message.manage"), key: "messageManage", icon: <MessageOutlined />, disabled: true },
  ];
  function getManagerMenuItems(managerRoles) {
    const filteredItems = [];

    managerRoles.forEach((role) => {
      const permissions = rolePermissions[role] || [];
      // Filter items based on permissions and exclude those already present in filteredItems
      const newItems = allSideBars.filter(
        (item) => permissions.includes(item.key) && !filteredItems.some((filteredItem) => filteredItem.key === item.key)
      );

      // Add the new items to filteredItems
      filteredItems.push(...newItems);
    });

    return filteredItems;
  }
  console.log("userRole", userRole);
  const roleBaseSidebar = userRole?.length && getManagerMenuItems(userRole);

  const { token } = theme.useToken();
  // console.log(colorBgContainer);

  useEffect(() => {
    const selectedKey = location.pathname.split("/").pop();
    setSelectedSidebar(selectedKey);

    if (location.pathname.includes("leaderBoard")) setSelectedSidebar("snsManage");
    if (location.pathname.includes("gameBoard")) setSelectedSidebar("paymentManage");
    if (location.pathname.includes("userDetails")) setSelectedSidebar("userManage");
    if (location.pathname.includes("storeDetails")) setSelectedSidebar("storeManage");
    if (location.pathname.includes("walletDetails")) setSelectedSidebar("pointsManage");
  }, [location]);

  return (
    <MyLayoutContainer token={token}>
      {signedIn ? (
        <>
          <Header style={{ display: "flex", alignItems: "center" }}>
            <MyHeader />
          </Header>
          <Layout>
            <Sider
              style={{
                background: token.colorBgContainer,
                overflow: "auto",
                height: "100vh",
                position: "fixed",
              }}
              collapsible
              collapsed={collapsed}
              onCollapse={(value) => setCollapsed(value)}
            >
              <Menu
                mode="inline"
                defaultSelectedKeys={[selectedSidebar]}
                selectedKeys={[selectedSidebar]}
                items={roleBaseSidebar}
                onClick={(e) => {
                  console.log("selected", e.key);
                  setSelectedSidebar(e.key);
                  navigate(`/sidebar/${e.key}`);
                }}
              />
            </Sider>

            <Layout style={{ padding: "20px", marginLeft: collapsed ? 80 : 200 }}>
              <Content
                style={{
                  padding: 20,
                  margin: 0,
                  maxHeight: "85vh",
                  minHeight: "85vh",
                  background: token.colorBgContainer,
                  overflow: "hidden",
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </>
      ) : (
        children
      )}
    </MyLayoutContainer>
  );
};
export default MyLayout;

const MyLayoutContainer = styled(Layout)`
  .ant-layout-sider-trigger {
    background: ${({ token }) => token.colorPrimaryTextActive};
  }
`;
