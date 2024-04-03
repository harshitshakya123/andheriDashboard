import { Avatar, Space, Tabs, Tag } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PointsAndReward = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const [storeList, setStoreList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const userColumns = [
    {
      title: t("user.profile"),
      width: 50,
      dataIndex: "profile_picture_url",
      key: "profile_picture_url",
      fixed: "left",
      render: (text, data) => (
        <>
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            src={
              data?.profile_picture_url?.trim()?.length
                ? data?.profile_picture_url
                : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            }
            size="large"
            gap={4}
          >
            {data?.first_name?.charAt(0).toUpperCase()}
          </Avatar>
        </>
      ),
    },
    {
      title: t("user.name"),
      key: "1",
      width: 70,
      dataIndex: "first_name",
      searchable: true,
    },
    {
      title: t("user.email"),
      dataIndex: "email",
      key: "2",
      width: 100,
      searchable: true,
    },
    {
      title: t("user.number"),
      dataIndex: "phone_number",
      key: "3",
      width: 120,
      searchable: true,
    },
    {
      title: t("user.referral"),
      dataIndex: "referral_count",
      key: "4",
      width: 80,
      sorter: {
        compare: (a, b) => a.referral_count - b.referral_count,
        multiple: 1,
      },
    },
    {
      title: t("user.referralCode"),
      dataIndex: "user_referral_code",
      key: "5",
      width: 80,
      searchable: true,
    },
    {
      title: t("user.point"),
      dataIndex: "million_point",
      key: "6",
      width: 80,
      sorter: {
        compare: (a, b) => a.million_point - b.million_point,
        multiple: 1,
      },
    },
    {
      title: t("user.level"),
      dataIndex: "label",
      key: "9",
      width: 50,
      sorter: {
        compare: (a, b) => a.label - b.label,
        multiple: 1,
      },
    },
    {
      title: t("user.status"),
      key: "status",
      dataIndex: "status",
      width: 50,
      render: (_, { status }) => {
        return (
          <div>
            <Tag color={+status ? "geekblue" : "green"}>{+status ? "Inactive" : "Active"}</Tag>
          </div>
        );
      },
    },
    {
      title: t("user.action"),
      key: "operation",
      fixed: "right",
      width: 60,
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => navigate(`${data.id}/walletDetails`)}>Wallet</a>
        </Space>
      ),
    },
  ];
  const fetchList = async () => {
    setLoading(true);
    const storeResponse = await apiService.getUserList();
    setStoreList(storeResponse?.data);
    setLoading(false);
  };

  return (
    <>
      <Tabs
        defaultActiveKey={activeTab}
        accessKey={activeTab}
        onChange={(e) => {
          setActiveTab(e);
        }}
        items={[
          {
            label: t("user.users"),
            key: "1",
            children: (
              <CustomTable
                columns={userColumns}
                dataList={storeList}
                loading={loading}
                // scrollX={1500}
                scrollY={"calc(100vh - 320px)"}
              />
            ),
          },
          {
            label: t("user.agents"),
            key: "2",
            disabled: true,
            children: <></>,
          },
          {
            label: "Store",
            key: "3",
            disabled: true,
            children: <></>,
          },
        ]}
      />
    </>
  );
};

export default PointsAndReward;
