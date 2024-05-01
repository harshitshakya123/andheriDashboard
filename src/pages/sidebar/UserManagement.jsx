import { Button, Input, Modal, Space, Tabs, Tag, message } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import styled from "styled-components";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { UserProfileContext } from "../../store/UserProfileStore";

const UserManagement = () => {
  const [t] = useTranslation("global");
  const navigate = useNavigate();

  const [userList, setUserList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const handleStatus = async (id) => {
    const data = await apiService.updateUserStatus(id);
    console.log("data", data);
    // fetchList();
    // message.success("User Status Updated successfully");
  };
  const userColumns = [
    {
      title: t("user.name"),
      key: "1",
      // width: 100,
      dataIndex: "fullName",
      searchable: true,
    },
    {
      title: t("user.number"),
      dataIndex: "phone",
      key: "3",
      // width: 120,
      searchable: true,
    },
    {
      title: t("user.amount"),
      dataIndex: "amount",
      key: "4",
      // width: 120,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "4",
      // width: 120,
      render: (_, { role }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag color={role == "admin" ? "geekblue" : "orange"}>{role?.toUpperCase()}</Tag>
          </div>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "9",
      width: 200,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY hh:mm a"),
    },
    {
      title: t("user.status"),
      key: "status",
      dataIndex: "status",
      // width: 80,
      render: (_, { status, _id, activeStatus }) => {
        return (
          <div onClick={() => handleStatus(_id)} style={{ cursor: "pointer" }}>
            <Tag color={+status ? "geekblue" : "green"}>{!activeStatus ? "Inactive" : "Active"}</Tag>
          </div>
        );
      },
    },
    {
      title: t("user.action"),
      key: "operation",
      fixed: "right",
      // width: 80,
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
          <a onClick={() => navigate(`${data._id}/userDetails`)}>Details</a>
        </Space>
      ),
    },
  ];

  const fetchList = async () => {
    setLoading(true);
    const userResponse = await apiService.getUserList();
    setUserList(userResponse?.data);
    setLoading(false);
  };

  const updateList = (payload) => {
    const updatedData = userList.map((item) => {
      if (item._id === payload.id) {
        return {
          ...item,
          fullName: payload?.fullName,
        };
      }
      return item;
    });
    setUserList(updatedData);
  };

  return (
    <>
      <Tabs
        defaultActiveKey={1}
        // accessKey={activeTab}
        // tabBarExtraContent={operations}

        items={[
          {
            label: "User List",
            key: "1",
            children: (
              <CustomTable
                columns={userColumns}
                dataList={userList}
                loading={loading}
                // scrollX={1500}
                scrollY={"calc(100vh - 320px)"}
                pagination={true}
              />
            ),
          },
        ]}
      />

      <MyModal
        editData={editData}
        setEditData={setEditData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateList={updateList}
        setLoading={setLoading}
      />
    </>
  );
};

export default UserManagement;

const MyModal = ({ editData, setEditData, isModalOpen, setIsModalOpen, updateList }) => {
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState("");
  const [, dispatchUserProfile] = UserProfileContext();

  useEffect(() => {
    setEditFormData(editData);
  }, [editData]);

  const handleEdit = async (payload) => {
    setEditLoading(true);
    await apiService.updateAdminDetails({ ...payload, id: editData?._id });
    updateList({ ...payload, id: editData?._id });
    dispatchUserProfile({
      type: "EDIT_PROFILE",
      payload: editData,
    });
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
            value={editFormData?.fullName}
            onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
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
