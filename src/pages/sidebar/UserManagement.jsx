import { Avatar, Button, Input, Modal, Slider, Space, Tabs, Tag, notification } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import styled from "styled-components";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const UserManagement = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [agentList, setAgentList] = useState([]);
  const [userConfigList, setUserConfigList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);
  const userColumns = [
    // {
    //   title: t("user.profile"),
    //   width: 70,
    //   dataIndex: "profile_picture_url",
    //   key: "profile_picture_url",
    //   fixed: "left",
    //   render: (text, data) => (
    //     <>
    //       <Avatar
    //         style={{
    //           backgroundColor: "#f56a00",
    //           verticalAlign: "middle",
    //         }}
    //         src={
    //           data?.profile_picture_url?.trim()?.length
    //             ? data?.profile_picture_url
    //             : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
    //         }
    //         size="large"
    //         gap={4}
    //       >
    //         {data?.first_name?.charAt(0).toUpperCase()}
    //       </Avatar>
    //     </>
    //   ),
    // },
    {
      title: t("user.name"),
      key: "1",
      width: 100,
      dataIndex: "first_name",
      searchable: true,
      fixed: "left",
    },
    // {
    //   title: t("user.email"),
    //   dataIndex: "email",
    //   key: "2",
    //   width: 150,
    //   searchable: true,
    // },
    {
      title: t("user.number"),
      dataIndex: "phone_number",
      key: "3",
      width: 120,
      searchable: true,
    },
    {
      title: t("user.amount"),
      dataIndex: "referral_count",
      key: "4",
      width: 120,
    },
    // {
    //   title: t("user.referralCode"),
    //   dataIndex: "user_referral_code",
    //   key: "5",
    //   width: 120,
    //   searchable: true,
    // },
    // {
    //   title: t("user.point"),
    //   dataIndex: "million_point",
    //   key: "6",
    //   width: 100,
    //   sorter: {
    //     compare: (a, b) => a.million_point - b.million_point,
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: t("user.followers"),
    //   dataIndex: "followers_no",
    //   key: "7",
    //   width: 80,
    //   sorter: {
    //     compare: (a, b) => a.followers_no - b.followers_no,
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: t("user.following"),
    //   dataIndex: "following_no",
    //   key: "8",
    //   width: 80,
    //   sorter: {
    //     compare: (a, b) => a.following_no - b.following_no,
    //     multiple: 1,
    //   },
    // },
    {
      title: t("user.level"),
      dataIndex: "label",
      key: "9",
      width: 80,
      sorter: {
        compare: (a, b) => a.label - b.label,
        multiple: 1,
      },
    },
    {
      title: t("user.status"),
      key: "status",
      dataIndex: "status",
      width: 80,
      render: (_, { status, id }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag onClick={() => handleUpdateStatus({ id, status: !status })} color={+status ? "geekblue" : "green"}>
              {+status ? "Inactive" : "Active"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: t("user.action"),
      key: "operation",
      fixed: "right",
      width: 80,
      render: (_, data) => (
        <Space size="middle">
          <a
            onClick={() => {
              setEditData(data);
              setIsModalOpen(true);
            }}
          >
            Edit
          </a>
          <a onClick={() => navigate(`${data.id}/userDetails`)}>Details</a>
        </Space>
      ),
    },
  ];
  // const agentColumns = [
  //   {
  //     title: t("user.profile"),
  //     width: 50,
  //     dataIndex: "profile_picture_url",
  //     key: "profile_picture_url",
  //     fixed: "left",
  //     render: (text, data) => (
  //       <>
  //         <Avatar
  //           style={{
  //             backgroundColor: "#f56a00",
  //             verticalAlign: "middle",
  //           }}
  //           src={
  //             data?.profile_picture_url?.trim()?.length
  //               ? data?.profile_picture_url
  //               : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
  //           }
  //           size="large"
  //           gap={4}
  //         >
  //           {data?.first_name?.charAt(0).toUpperCase()}
  //         </Avatar>
  //       </>
  //     ),
  //   },
  //   {
  //     title: t("user.name"),
  //     key: "1",
  //     width: 100,
  //     dataIndex: "first_name",
  //     searchable: true,
  //   },
  //   {
  //     title: t("user.email"),
  //     dataIndex: "email",
  //     key: "2",
  //     width: 150,
  //     searchable: true,
  //   },
  //   {
  //     title: t("user.number"),
  //     dataIndex: "phone_number",
  //     key: "3",
  //     width: 100,
  //     searchable: true,
  //   },
  //   {
  //     title: t("user.referral"),
  //     dataIndex: "referral_count",
  //     key: "4",
  //     width: 100,
  //     sorter: {
  //       compare: (a, b) => a.referral_count - b.referral_count,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     title: t("user.referralCode"),
  //     dataIndex: "referral_code",
  //     key: "5",
  //     width: 100,
  //     searchable: true,
  //   },
  //   {
  //     title: t("user.point"),
  //     dataIndex: "million_point",
  //     key: "6",
  //     width: 100,
  //     sorter: {
  //       compare: (a, b) => a.million_point - b.million_point,
  //       multiple: 1,
  //     },
  //   },

  //   // {
  //   //   title: t("user.following"),
  //   //   dataIndex: "following_no",
  //   //   key: "7",
  //   //   width: 80,
  //   //   sorter: {
  //   //     compare: (a, b) => a.following_no - b.following_no,
  //   //     multiple: 1,
  //   //   },
  //   // },

  //   {
  //     title: t("user.level"),
  //     dataIndex: "label",
  //     key: "8",
  //     width: 70,
  //     sorter: {
  //       compare: (a, b) => a.label - b.label,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     title: t("user.status"),
  //     key: "status",
  //     dataIndex: "status",
  //     width: 70,
  //     render: (_, { status, id }) => {
  //       return (
  //         <div style={{ cursor: "pointer" }}>
  //           <Tag onClick={() => handleUpdateStatus({ id, status: !status })} color={+status ? "geekblue" : "green"}>
  //             {+status ? "Inactive" : "Active"}
  //           </Tag>
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     title: t("user.action"),
  //     key: "operation",
  //     fixed: "right",
  //     width: 60,
  //     render: (_, data) => (
  //       <Space size="middle">
  //         <a
  //           onClick={() => {
  //             setEditData(data);
  //             setIsModalOpen(true);
  //           }}
  //         >
  //           Edit
  //         </a>
  //         <a onClick={() => navigate(`${data.id}/userDetails`)}>Details</a>
  //       </Space>
  //     ),
  //   },
  // ];
  // const userConfigColumns = [
  //   {
  //     title: t("user.profile"),
  //     width: 10,
  //     dataIndex: "imageUrl",
  //     key: "imageUrl",
  //     // fixed: "left",
  //     render: (text, data) => (
  //       <>
  //         <Avatar
  //           style={{
  //             backgroundColor: "#f56a00",
  //             verticalAlign: "middle",
  //           }}
  //           src={
  //             data?.imageUrl?.trim()?.length
  //               ? data?.imageUrl
  //               : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
  //           }
  //           size="large"
  //           gap={4}
  //         >
  //           {data?.first_name?.charAt(0).toUpperCase()}
  //         </Avatar>
  //       </>
  //     ),
  //   },
  //   {
  //     title: t("user.level"),
  //     key: "1",
  //     width: 20,
  //     dataIndex: "level",
  //     searchable: true,
  //   },
  //   {
  //     title: t("user.minReferral"),
  //     dataIndex: "min_referral_count",
  //     key: "4",
  //     width: 20,
  //     sorter: {
  //       compare: (a, b) => a.referral_count - b.referral_count,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     title: t("user.maxReferral"),
  //     dataIndex: "max_referral_count",
  //     key: "2",
  //     width: 20,
  //     searchable: true,
  //   },
  //   {
  //     title: t("user.minStoreReferral"),
  //     dataIndex: "min_store_referral_count",
  //     key: "5",
  //     width: 20,
  //     sorter: {
  //       compare: (a, b) => a.referral_code - b.referral_code,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     title: t("user.maxStoreReferral"),
  //     dataIndex: "max_store_referral_count",
  //     key: "3",
  //     width: 20,
  //     // searchable: true,
  //     sorter: {
  //       compare: (a, b) => a.referral_count - b.referral_count,
  //       multiple: 1,
  //     },
  //   },
  // ];

  const fetchList = async () => {
    setLoading(true);
    const userResponse = await apiService.getUserList();
    const agentResponse = await apiService.getAgentList();
    const userConfigResponse = await apiService.getUserConfigLogs();
    setUserList(userResponse?.data);
    setAgentList(agentResponse?.data);
    setUserConfigList(userConfigResponse?.data);
    setLoading(false);
  };
  const handleUpdateStatus = async (payload) => {
    const response = await apiService.updateUserStatus(payload);
    if (response.message) {
      notification.success({
        message: "User Status Updated Successfully",
        duration: 1,
        rtl: true,
      });
      updateList(payload);
    }
  };
  const updateList = (payload) => {
    if (activeTab === "2") {
      const updatedData = agentList.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            status: payload.status,
            label: payload?.label,
            first_name: payload?.first_name,
          };
        }
        return item;
      });
      setAgentList(updatedData);
    } else {
      const updatedData = userList.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            status: payload.status,
            label: payload?.label,
            first_name: payload?.first_name,
          };
        }
        return item;
      });
      setUserList(updatedData);
    }
  };

  const handleLeftPagination = () => {};
  const handleRightPagination = () => {};

  return (
    <>
      {/* <Tabs
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
                dataList={userList}
                loading={loading}
                // scrollX={1500}
                scrollY={"calc(100vh - 320px)"}
                pagination={true}
                leftPagination={handleLeftPagination}
                rightPagination={handleRightPagination}
              />
            ),
          },
          {
            label: t("user.agents"),
            key: "2",
            children: (
              <CustomTable
                columns={agentColumns}
                dataList={agentList}
                loading={loading}
                scrollX={1500}
                scrollY={"calc(100vh - 320px)"}
              />
            ),
          },
          {
            label: t("user.levels"),
            key: "3",
            children: (
              <CustomTable
                columns={userConfigColumns}
                dataList={userConfigList}
                loading={loading}
                scrollY={"calc(100vh - 320px)"}
              />
            ),
          },
        ]}
      /> */}
      <CustomTable
        columns={userColumns}
        dataList={userList}
        loading={loading}
        // scrollX={1500}
        scrollY={"calc(100vh - 320px)"}
        pagination={true}
        leftPagination={handleLeftPagination}
        rightPagination={handleRightPagination}
      />
      <MyModal
        editData={editData}
        setEditData={setEditData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateList={updateList}
        activeTab={activeTab}
        setLoading={setLoading}
        setUserList={(d) => {
          setUserList(d);
        }}
        setAgentList={setAgentList}
      />
    </>
  );
};

export default UserManagement;

const MyModal = ({ editData, setEditData, isModalOpen, setIsModalOpen, updateList }) => {
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState("");
  useEffect(() => {
    setEditFormData(editData);
  }, [editData]);

  const handleEdit = async (payload) => {
    setEditLoading(true);
    await apiService.updateUserData(payload);
    updateList(payload);
    setEditLoading(false);
    setIsModalOpen(false);
    setEditData(null);
  };
  return (
    <CustomModal
      title="Edit User"
      open={isModalOpen}
      onCancel={() => {
        setEditData(null);
        setIsModalOpen(null);
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setEditData(null);
            setIsModalOpen(null);
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={editLoading}
          onClick={() => {
            handleEdit(editFormData);
          }}
        >
          {editLoading ? "Editing..." : "Edit"}
        </Button>,
      ]}
    >
      <div>
        <div style={{ margin: "8px 0px" }}>
          <label>Name</label>
          <Input
            value={editFormData?.first_name}
            onChange={(e) => setEditFormData({ ...editFormData, first_name: e.target.value })}
          />
        </div>
        <div style={{ margin: "8px 0px" }}>
          <label>Level</label>
          <Slider
            value={editFormData?.label}
            min={0}
            max={9}
            onChange={(e) => setEditFormData({ ...editFormData, label: e })}
          />
        </div>
      </div>
    </CustomModal>
  );
};
const CustomModal = styled(Modal)`
  .ant-form-item {
    margin-bottom: 10px !important;
  }
`;
