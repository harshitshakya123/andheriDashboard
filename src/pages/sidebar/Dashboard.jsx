import { Card, theme } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import commonService from "../../services/commonServices";
import { useNavigate } from "react-router-dom";

const { useToken } = theme;

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useToken();

  useEffect(() => {
    fetch();
  }, []);
  const fetch = async () => {
    setLoading(true);
    const response = await commonService.getDashboard();
    setLoading(false);
    setDashboardData(response?.data);
  };
  const handleRedirect = (item) => {
    if (item === "total_users" || item === "active_users") {
      navigate("/sidebar/userManage");
    }
    if (item === "live_campaign") {
      navigate("/sidebar/snsManage");
    }
    if (item === "reward_budget") {
      navigate("/sidebar/pointsManage");
    }
    if (item === "partner_shops") {
      navigate("/sidebar/storeManage");
    }
    return;
  };
  return (
    <DashboardContainer token={token}>
      {Object?.keys(dashboardData || { 1: "", 2: "", 3: "" }).map((item, index) => (
        <Card
          key={index}
          loading={loading}
          onClick={() => handleRedirect(item)}
          style={{
            width: 300,
            margin: "10px",
            boxShadow:
              "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
          }}
        >
          <div className="count">{dashboardData && dashboardData[item]}</div>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {item.toUpperCase().replace("_", " ")}
          </div>
        </Card>
      ))}
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    font-family: ${({ token }) => token.fontFamily};
  }
  .count {
    // color: #1677ff;
    color: ${({ token }) => token.colorPrimary};
    font-weight: 700;
    font-size: 30px;
  }
`;
