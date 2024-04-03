import { Avatar, Button, Slider, Input, Modal, Space, Tag, message, Tabs } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import styled from "styled-components";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BidsManagement = () => {
  const navigate = useNavigate();
  const [t] = useTranslation("global");
  const [storeList, setStoreList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const storeColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
      width: 100,
      searchable: true,
    },
    {
      title: "Game",
      width: 70,
      dataIndex: "logo_url",
      key: "logo_url",
      fixed: "left",
      render: (_, { id, status }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag onClick={() => handleUpdateStatus({ id, status: !status })} color={+status ? "geekblue" : "green"}>
              {+status ? "2x" : "100x"}
            </Tag>
          </div>
        );
      },
      // render: (text, data) => (
      //   <>
      //     <Avatar
      //       style={{
      //         backgroundColor: "#f56a00",
      //         verticalAlign: "middle",
      //       }}
      //       src={
      //         data?.logo_url?.trim()?.length
      //           ? data?.logo_url
      //           : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
      //       }
      //       size="large"
      //       gap={4}
      //     >
      //       {data?.name?.charAt(0).toUpperCase()}
      //     </Avatar>
      //   </>
      // ),
    },
    {
      title: "Phone Number",
      dataIndex: "name",
      key: "1",
      width: 100,
      searchable: true,
    },
    {
      title: "Bid Amount",
      dataIndex: "email",
      key: "2",
      width: 100,
      searchable: true,
    },
    {
      title: "Winning Amount",
      dataIndex: "phone_no",
      key: "3",
      width: 80,
      searchable: true,
    },
    {
      title: "Date",
      dataIndex: "phone_no",
      key: "3",
      width: 80,
      searchable: true,
    },
    // {
    //   title: t("store.address"),
    //   dataIndex: "address",
    //   key: "6",
    //   width: 180,
    //   searchable: true,
    // },
    // {
    //   title: t("store.referralCount"),
    //   dataIndex: "referral_count",
    //   key: "4",
    //   width: 80,
    //   sorter: {
    //     compare: (a, b) => a.referral_count - b.referral_count,
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: t("store.referralCode"),
    //   dataIndex: "referral_code",
    //   key: "5",
    //   width: 80,
    //   searchable: true,
    // },
    // {
    //   title: t("store.level"),
    //   dataIndex: "level",
    //   key: "9",
    //   width: 50,
    //   sorter: {
    //     compare: (a, b) => a.level - b.level,
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: t("store.status"),
    //   key: "status",
    //   dataIndex: "status",
    //   width: 60,
    //   render: (_, { id, status }) => {
    //     return (
    //       <div style={{ cursor: "pointer" }}>
    //         <Tag onClick={() => handleUpdateStatus({ id, status: !status })} color={+status ? "geekblue" : "green"}>
    //           {+status ? "Inactive" : "Active"}
    //         </Tag>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: t("store.action"),
    //   key: "operation",
    //   fixed: "right",
    //   width: 80,
    //   render: (_, data) => (
    //     <Space size="middle">
    //       <a
    //         onClick={() => {
    //           setEditData(data);
    //           setIsModalOpen(true);
    //         }}
    //       >
    //         Edit
    //       </a>
    //       <a onClick={() => navigate(`${data.id}/storeDetails`)}>Details</a>
    //     </Space>
    //   ),
    // },
  ];
  const fetchList = async () => {
    const storeResponse = await apiService.getStoreManagementList();
    setStoreList(storeResponse?.data);
  };

  const handleUpdateStatus = async (payload) => {
    console.log("Click");
    const response = await apiService.updateStoreStatus(payload);
    if (response.message) {
      fetchList();
      message.success("Store Status Updated Successfully");
    }
  };
  // const [t] = useTranslation("global");

  const [activeTab, setActiveTab] = useState("1");

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
            label: "Today Bids",
            key: "1",
            children: (
              <CustomTable
                columns={storeColumns}
                // loading={!storeList?.length}
                dataList={storeList}
                // scrollX={1500}
                scrollY={"calc(100vh - 280px)"}
              />
            ),
          },
          {
            label: "All Bids",
            key: "2",
            children: (
              <CustomTable
                columns={storeColumns}
                // loading={!storeList?.length}
                dataList={storeList}
                // scrollX={1500}
                scrollY={"calc(100vh - 280px)"}
              />
            ),
          },
        ]}
      />
      {/* <MyModal
        editData={editData}
        setEditData={setEditData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        // updateList={updateList}
        fetchList={fetchList}
      />
      <CustomTable
        columns={storeColumns}
        loading={!storeList?.length}
        dataList={storeList}
        // scrollX={1500}
        scrollY={"calc(100vh - 280px)"}
      /> */}
    </>
  );
};

export default BidsManagement;

const MyModal = ({ editData, setEditData, isModalOpen, setIsModalOpen, fetchList }) => {
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState("");
  useEffect(() => {
    setEditFormData(editData);
  }, [editData]);

  const handleEdit = async (payload) => {
    setEditLoading(true);
    await apiService.updateStoreData(payload);

    setEditLoading(false);
    setIsModalOpen(false);
    setEditData(null);
    // updateList();
    fetchList();
  };
  const [t] = useTranslation("global");

  const [activeTab, setActiveTab] = useState("1");

  return (
    <Tabs
      defaultActiveKey={activeTab}
      accessKey={activeTab}
      onChange={(e) => {
        setActiveTab(e);
      }}
      items={[
        {
          label: "Today Bids",
          key: "1",
          children: (
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
                  Edit
                </Button>,
              ]}
            >
              <div>
                <div style={{ margin: "8px 0px" }}>
                  <label>Shop Name</label>
                  <Input
                    value={editFormData?.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </div>
                {}
                <div style={{ margin: "8px 0px" }}>
                  <label>Level</label>
                  <Slider
                    value={editFormData?.level}
                    min={0}
                    max={9}
                    onChange={(e) => setEditFormData({ ...editFormData, level: e })}
                  />
                </div>
              </div>
            </CustomModal>
          ),
        },
        {
          label: "All Bids",
          key: "2",
          children: (
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
                  Edit
                </Button>,
              ]}
            >
              <div>
                <div style={{ margin: "8px 0px" }}>
                  <label>Shop Name</label>
                  <Input
                    value={editFormData?.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </div>
                {}
                <div style={{ margin: "8px 0px" }}>
                  <label>Level</label>
                  <Slider
                    value={editFormData?.level}
                    min={0}
                    max={9}
                    onChange={(e) => setEditFormData({ ...editFormData, level: e })}
                  />
                </div>
              </div>
            </CustomModal>
          ),
        },
      ]}
    />
  );
};

const CustomModal = styled(Modal)`
  .ant-form-item {
    margin-bottom: 10px !important;
  }
`;
