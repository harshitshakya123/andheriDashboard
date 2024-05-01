import { Tag, Tabs, Button, DatePicker, Modal, InputNumber, Select, Dropdown, Space, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { DownOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const BidsManagement = () => {
  const [userBids, setUserBids] = useState([]);
  const [bidsChart, setBidsChart] = useState([]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eighteenVal, setEighteenVal] = useState("");

  useEffect(() => {
    fetchList();
    fetchChart();
  }, []);

  const handleUpdateChart = async (id, number, name) => {
    const payload = {
      name,
      number,
      id,
    };
    console.log("payload", payload);
    // const chartResponse = await apiService.updateBidsChart(payload);
    // if (chartResponse?.success) {
    //   const updatedBids = bidsChart.map((item) => {
    //     if (item._id === id) {
    //       return {
    //         ...item,
    //         [name]: number,
    //       };
    //     }
    //     return item;
    //   });
    //   message.success(chartResponse?.message);
    //   setBidsChart(updatedBids);
    // }
  };

  const allBidsColumns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "3",
      width: 100,
      // searchable: true,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "11:00 AM(2x)",
      dataIndex: "eleven",
      key: "1",
      width: 100,
      render: (_, { _id, eleven }) =>
        eleven ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "1",
                  onClick: () => handleUpdateChart(_id, 1, "eleven"),
                },
                {
                  key: "2",
                  // danger: true,
                  label: "2",
                  onClick: () => handleUpdateChart(_id, 2, "eleven"),
                },
              ],
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {eleven}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          "---"
        ),
    },
    {
      title: "01:00 PM(2x)",
      dataIndex: "thirteen",
      key: "2",
      width: 100,
      render: (_, { _id, thirteen }) =>
        thirteen ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "1",
                  onClick: () => handleUpdateChart(_id, 1, "thirteen"),
                },
                {
                  key: "2",
                  // danger: true,
                  label: "2",
                  onClick: () => handleUpdateChart(_id, 2, "thirteen"),
                },
              ],
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {thirteen}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          "---"
        ),
    },
    {
      title: "03:00 PM(2x)",
      dataIndex: "fifteen",
      key: "3",
      width: 100,
      render: (_, { _id, fifteen }) =>
        fifteen ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "1",
                  onClick: () => handleUpdateChart(_id, 1, "fifteen"),
                },
                {
                  key: "2",
                  // danger: true,
                  label: "2",
                  onClick: () => handleUpdateChart(_id, 2, "fifteen"),
                },
              ],
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {fifteen}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          "---"
        ),
    },
    {
      title: "05:00 PM(2x)",
      dataIndex: "seventeen",
      key: "4",
      width: 100,
      render: (_, { _id, seventeen }) =>
        seventeen ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "1",
                  onClick: () => handleUpdateChart(_id, 1, "seventeen"),
                },
                {
                  key: "4",
                  // danger: true,
                  label: "2",
                  onClick: () => handleUpdateChart(_id, 2, "seventeen"),
                },
              ],
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {seventeen}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          "---"
        ),
    },
    {
      title: "06:00 PM(100x)",
      dataIndex: "eighteen",
      key: "5",
      width: 100,
      render: (_, { _id, eighteen }) =>
        eighteen ? (
          <Popconfirm
            title="Update 100x"
            // description="Are you sure to delete this task?"
            description={
              <InputNumber
                min={0}
                max={99}
                onChange={(e) => {
                  setEighteenVal(e);
                }}
              />
            }
            onConfirm={() => handleUpdateChart(_id, eighteenVal, "eighteen")}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button>{eighteen}</Button>
          </Popconfirm>
        ) : (
          "---"
        ),
    },
    {
      title: "07:00 PM(2x)",
      dataIndex: "nineteen",
      key: "5",
      width: 100,
      // searchable: true,
      render: (_, { _id, nineteen }) =>
        nineteen ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "1",
                  onClick: () => handleUpdateChart(_id, 1, "nineteen"),
                },
                {
                  key: "2",
                  // danger: true,
                  label: "2",
                  onClick: () => handleUpdateChart(_id, 2, "nineteen"),
                },
              ],
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {nineteen}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          "---"
        ),
    },
    {
      title: "09:00 PM(2x)",
      dataIndex: "twentyone",
      key: "5",
      width: 100,
      render: (_, { _id, twentyone }) =>
        twentyone ? (
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: "1",
                  onClick: handleUpdateChart(_id, 1, "twentyone"),
                },
                {
                  key: "2",
                  // danger: true,
                  label: "2",
                  onClick: () => handleUpdateChart(_id, 2, "twentyone"),
                },
              ],
            }}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Space>
                {twentyone}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        ) : (
          "---"
        ),
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
      // searchable: true,
      render: (_, { bidAmount }) => `${bidAmount} Rs.`,
    },
    {
      title: "Winning Amount",
      dataIndex: "bidAmount",
      key: "3",
      // width: 80,
      // render: (_, { bidAmount, type }) => (type == "2x" ? bidAmount * 2 : bidAmount * 100),
      render: (_, { bidAmount, type }) => (
        <Tag onClick={() => {}} color={"gold"}>
          {`${type == "2x" ? bidAmount * 2 : bidAmount * 100} Rs.`}
        </Tag>
      ),
    },
    {
      title: "Winning Status",
      key: "status",
      dataIndex: "status",
      // width: 60,
      render: (_, { winningStatus }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag
              onClick={() => {}}
              color={winningStatus === "won" ? "green" : winningStatus === "lost" ? "red" : "blue"}
            >
              {winningStatus.toUpperCase()}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "3",
      width: 200,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY hh:mm:ss a"),
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
                scrollY={"calc(100% - 77px)"}
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
                // scrollY={"calc(100vh - 280px)"}
                scrollY={"calc(100% - 77px)"}
              />
            ),
          },
        ]}
      />
      {isModalOpen && <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} fetchList={fetchList} />}
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
    const data = await apiService.addBid(payload);
    if (data?.success) {
      message.success("Bid Added Successfully");
    } else {
      message.error(data?.message);
    }
    fetchList();
    setEditFormData("");
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
