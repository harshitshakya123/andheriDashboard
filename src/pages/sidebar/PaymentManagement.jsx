import { Avatar, Button, Slider, Input, Modal, Space, Tag, message, Tabs } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import styled from "styled-components";
import CustomTable from "../../components/CustomTable";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PaymentManagement = () => {
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
      width: 70,
      dataIndex: "logo_url",
      key: "logo_url",
      fixed: "left",
      // render: (_, { id, status }) => {
      //   return (
      //     <div style={{ cursor: "pointer" }}>
      //       <Tag onClick={() => handleUpdateStatus({ id, status: !status })} color={+status ? "geekblue" : "green"}>
      //         {+status ? "2x" : "100x"}
      //       </Tag>
      //     </div>
      //   );
      // },
    },
    {
      title: "Phone Number",
      dataIndex: "name",
      key: "1",
      width: 100,
      searchable: true,
    },
    {
      title: "Attachment",
      dataIndex: "email",
      key: "2",
      width: 100,
      searchable: true,
    },
    {
      title: "Add Amount",
      dataIndex: "phone_no",
      key: "3",
      width: 80,
      searchable: true,
    },

    {
      title: t("store.action"),
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
          <a onClick={() => navigate(`${data.id}/storeDetails`)}>Details</a>
        </Space>
      ),
    },
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
            label: "Credit List",
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
            label: "Withdrawl List",
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

export default PaymentManagement;
