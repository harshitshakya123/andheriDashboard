import { Tag, Tabs, Button, DatePicker, Modal, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
const { RangePicker } = DatePicker;
const BidsManagement = () => {
  const [userBids, setUserBids] = useState([]);
  const [bidsChart, setBidsChart] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchList();
    fetchChart();
  }, []);

  const allBidsColumns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "3",
      width: 80,
      // searchable: true,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "11:00 AM(2x)",
      dataIndex: "eleven",
      key: "1",
      width: 100,
      // searchable: true,
      render: (_, { eleven }) => (eleven ? eleven : "---"),
    },
    {
      title: "01:00 PM(2x)",
      dataIndex: "thirteen",
      key: "2",
      width: 100,
      // searchable: true,
      render: (_, { thirteen }) => (thirteen ? thirteen : "---"),
    },
    {
      title: "03:00 PM(2x)",
      dataIndex: "fifteen",
      key: "3",
      width: 100,
      // searchable: true,
      render: (_, { fifteen }) => (fifteen ? fifteen : "---"),
    },
    {
      title: "05:00 PM(2x)",
      dataIndex: "seventeen",
      key: "4",
      width: 100,
      // searchable: true,
      render: (_, { seventeen }) => (seventeen ? seventeen : "---"),
    },
    {
      title: "06:00 PM(100x)",
      dataIndex: "eighteen",
      key: "5",
      width: 100,
      // searchable: true,
      render: (_, { eighteen }) => (eighteen ? eighteen : "---"),
    },
    {
      title: "07:00 PM(2x)",
      dataIndex: "nineteen",
      key: "5",
      width: 100,
      // searchable: true,
      render: (_, { nineteen }) => (nineteen ? nineteen : "---"),
    },
    {
      title: "09:00 PM(2x)",
      dataIndex: "nineteen",
      key: "5",
      width: 100,
      // searchable: true,
      render: (_, { nineteen }) => (nineteen ? nineteen : "---"),
    },
    {
      title: "09:00 PM(2x)",
      dataIndex: "twentyone",
      key: "5",
      width: 100,
      // searchable: true,
      render: (_, { twentyone }) => (twentyone ? twentyone : "---"),
    },
  ];
  const userBidsColumns = [
    {
      title: "Phone Number",
      key: "phone",
      render: (text, record) => (
        <a key={record} onClick={() => navigate(`${record.userId}/userDetails`)}>
          {record?.userData?.phone}
        </a>
      ),
      // width: 100,
    },

    {
      title: "Game",
      // width: 70,
      dataIndex: "type",
      key: "logo_url",
      fixed: "left",
      render: (_, { type }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag color={type == "2x" ? "geekblue" : "green"}>{type}</Tag>
          </div>
        );
      },
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "1",
      // width: 100,
      searchable: true,
    },

    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
      key: "2",
      // width: 100,
      searchable: true,
    },
    {
      title: "Winning Amount",
      dataIndex: "bidAmount",
      key: "3",
      // width: 80,
      render: (_, { bidAmount }) => bidAmount * 2,
    },
    {
      title: "Winning Status",
      key: "status",
      dataIndex: "status",
      // width: 60,
      render: (_, { winningStatus }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag onClick={() => {}} color={winningStatus === "won" ? "green" : "red"}>
              {winningStatus}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "3",
      // width: 80,
      // searchable: true,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY hh:mm a"),
    },
  ];
  const fetchList = async (startDate, endDate) => {
    const storeResponse = await apiService.getBidsList(startDate, endDate);
    setUserBids(storeResponse?.data);
  };
  const fetchChart = async (startDate, endDate) => {
    const chartResponse = await apiService.getBidsChart(startDate, endDate);
    setBidsChart(chartResponse?.data);
  };

  const [activeTab, setActiveTab] = useState("1");
  const operations = (
    <div>
      {activeTab === "2" && (
        <Button style={{ marginRight: "10px" }} type="primary" onClick={() => setIsModalOpen(true)}>
          Add Bid
        </Button>
      )}
      <RangePicker
        onChange={(e, d) => {
          if (activeTab == 2) fetchList(d[0], d[1]);
          else fetchChart(d[0], d[1]);
        }}
        format={"YYYY-MM-DD"}
      />
    </div>
  );
  return (
    <>
      <Tabs
        defaultActiveKey={activeTab}
        accessKey={activeTab}
        tabBarExtraContent={operations}
        onChange={(e) => {
          setActiveTab(e);
        }}
        items={[
          {
            label: "Bids Chart",
            key: "1",
            children: (
              <CustomTable
                columns={allBidsColumns}
                // loading={!userBids?.length}
                dataList={bidsChart}
                // scrollX={1500}
                scrollY={"calc(100vh - 280px)"}
              />
            ),
          },
          {
            label: "User Bids",
            key: "2",
            children: (
              <CustomTable
                columns={userBidsColumns}
                // loading={!userBids?.length}
                dataList={userBids}
                // scrollX={1500}
                scrollY={"calc(100vh - 280px)"}
              />
            ),
          },
        ]}
      />
      <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} fetchList={fetchList} />
    </>
  );
};

export default BidsManagement;

const MyModal = ({ isModalOpen, setIsModalOpen, fetchList }) => {
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState("");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch();
  }, []);
  console.log("userData", userData);
  const fetch = async () => {
    const response = await apiService.getUserList();
    setUserData(response?.data?.map((item) => ({ key: item?._id, label: item?.fullName, value: item?._id })));
  };

  const handleAdd = async (payload) => {
    setEditLoading(true);
    await apiService.addBid(payload);
    fetchList();

    setEditLoading(false);
    setIsModalOpen(false);
  };

  return (
    <CustomModal
      title="Add Bid"
      open={isModalOpen}
      onCancel={() => {
        // setEditData(null);
        setIsModalOpen(null);
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            // setEditData(null);
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
            handleAdd(editFormData);
          }}
        >
          {editLoading ? "Adding..." : "Add"}
        </Button>,
      ]}
    >
      <div>
        <div style={{ display: "flex", gap: "10px", marginBottom: 10 }}>
          <div>
            <label>Type</label>
            <div>
              <Select
                placeholder="Select Type"
                // defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, type: e }))}
                options={[
                  {
                    value: "2x",
                    label: "2x",
                  },
                  {
                    value: "100x",
                    label: "100x",
                  },
                ]}
              />
            </div>
          </div>
          <div>
            <label>Users</label>
            <div>
              <Select
                placeholder="Select User"
                // defaultValue="lucy"
                style={{
                  width: 120,
                }}
                // onChange={(e, d) => console.log(e, d)}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, id: e }))}
                options={userData}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div>
            <label>Bid Amount</label>
            <div>
              <InputNumber
                // min={editFormData?.type === "2x" ? 1 : 0}
                // max={editFormData?.type === "2x" ? 2 : 99}
                onChange={(e) => {
                  console.log(e);
                  setEditFormData((prev) => ({ ...prev, bidAmount: e }));
                }}
              />
            </div>
          </div>
          <div>
            <label>Bid Number</label>
            <div>
              <InputNumber
                min={editFormData?.type === "2x" ? 1 : 0}
                max={editFormData?.type === "2x" ? 2 : 99}
                onChange={(e) => {
                  console.log(e);
                  setEditFormData((prev) => ({ ...prev, number: e }));
                }}
              />
            </div>
          </div>
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
