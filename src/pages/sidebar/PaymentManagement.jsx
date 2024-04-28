import { Tag, message, Tabs, Image, Space } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PaymentManagement = () => {
  const [paymentList, setPaymentList] = useState([]);
  const [creditList, setCreditList] = useState([]);
  const [withdrawList, setWithdrawList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
  }, []);

  const handleUpdateStatus = async (id) => {
    await apiService.updatePaymentStatus(id);

    message.success("User Status Updated successfully");
  };
  const handleApprove = async (id) => {
    await apiService.approvePayment(id);

    message.success("Payment Approved successfully");
  };
  const statusFilters = [
    {
      text: "Approved",
      value: "approved",
    },
    {
      text: "Pending",
      value: "pending",
    },
  ];
  const storeColumns = [
    {
      title: "Phone Number",
      width: 70,
      dataIndex: "userData",
      key: "userId",
      fixed: "left",
      render: (text, record) => (
        <a onClick={() => navigate(`${record.userId}/userDetails`)}>{record?.userData?.phone}</a>
      ),
      // searchable: true,
    },
    {
      title: "Name",
      width: 70,
      dataIndex: "userData",
      key: "userId",
      fixed: "left",
      render: (text, record) => (
        <a onClick={() => navigate(`${record.userId}/userDetails`)}>{record?.userData?.fullName}</a>
      ),
      // searchable: true,
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "2",
      width: 100,
      // searchable: true,
      render: (_, { attachment }) => (
        <Image width={50} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      ),
    },

    {
      title: "Amount",
      dataIndex: "userAmount",
      key: "3",
      width: 80,
      searchable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      // searchable: true,
      render: (_, { _id, status }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag
              onClick={() => status.toLowerCase() === "credit" && handleUpdateStatus(_id)}
              color={status.toLowerCase() === "approved" ? "green" : status === "credit" ? "orange" : "blue"}
            >
              {status}
            </Tag>
          </div>
        );
      },
      filters: activeTab === "1" ? statusFilters : null,
      // filters: [
      //   {
      //     text: "Approved",
      //     value: "London",
      //   },
      //   {
      //     text: "Pending",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
      onFilter: (value, record) => record.status.toLowerCase() === value,
      // onFilter: (value, record) => console.log("hello", value, record),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "1",
      width: 100,
      // searchable: true,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY"),
    },
  ];
  const paymentColumns = [
    {
      title: "Phone Number",
      width: 70,
      dataIndex: "userData",
      key: "userId",
      fixed: "left",
      render: (text, record) => (
        <a onClick={() => navigate(`${record.userId}/userDetails`)}>{record?.userData?.phone}</a>
      ),
      // searchable: true,
    },
    {
      title: "Name",
      width: 70,
      dataIndex: "userData",
      key: "userId",
      fixed: "left",
      render: (text, record) => (
        <a onClick={() => navigate(`${record.userId}/userDetails`)}>{record?.userData?.fullName}</a>
      ),
      // searchable: true,
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "2",
      width: 100,
      // searchable: true,
      render: (_, { attachment }) => (
        <Image width={50} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
      ),
    },

    {
      title: "Amount",
      dataIndex: "userAmount",
      key: "3",
      width: 80,
      searchable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      // searchable: true,
      render: (_, { _id, status }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag
              onClick={() => status.toLowerCase() === "credit" && handleUpdateStatus(_id)}
              color={status.toLowerCase() === "approved" ? "green" : status === "credit" ? "orange" : "blue"}
            >
              {status}
            </Tag>
          </div>
        );
      },
      filters: activeTab === "1" ? statusFilters : null,
      // filters: [
      //   {
      //     text: "Approved",
      //     value: "London",
      //   },
      //   {
      //     text: "Pending",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value, record) => record.address.indexOf(value) === 0,
      onFilter: (value, record) => record.status.toLowerCase() === value,
      // onFilter: (value, record) => console.log("hello", value, record),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "1",
      width: 80,
      // searchable: true,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      width: 80,
      render: (_, data) => (
        <Space size="middle">
          <a onClick={() => handleApprove(data._id)}>Approve</a>
        </Space>
      ),
    },
  ];
  const fetchList = async () => {
    const storeResponse = await apiService.getAllPayment();

    setPaymentList(storeResponse?.data.filter((item) => item?.status?.toLowerCase() === "approved"));
    setCreditList(storeResponse?.data.filter((item) => item?.status?.toLowerCase() === "credit"));
    setWithdrawList(storeResponse?.data.filter((item) => item?.status?.toLowerCase() === "withdraw"));
  };

  return (
    // <>
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
              columns={paymentColumns}
              // loading={!paymentList?.length}
              dataList={creditList}
              // scrollX={1500}
              scrollY={"calc(100vh - 280px)"}
            />
          ),
        },
        {
          label: "Withdraw List",
          key: "2",
          children: (
            <CustomTable
              columns={storeColumns}
              // loading={!paymentList?.length}
              dataList={withdrawList}
              // scrollX={1500}
              scrollY={"calc(100vh - 280px)"}
            />
          ),
        },
        {
          label: "Payment List",
          key: "3",
          children: (
            <CustomTable
              columns={storeColumns}
              // loading={!paymentList?.length}
              dataList={paymentList}
              // scrollX={1500}
              scrollY={"calc(100vh - 280px)"}
            />
          ),
        },
      ]}
    />
  );
};

export default PaymentManagement;
