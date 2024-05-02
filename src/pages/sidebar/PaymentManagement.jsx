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

    fetchList();
    message.success("Payment Approved successfully");
  };
  const handleDecline = async (id) => {
    const res = await apiService.declinePayment(id);
    console.log(res);
    if (res?.success) {
      const updatedPayment = creditList.filter((item) => item._id !== id);
      setCreditList(updatedPayment);
      message.success("Payment Decline successfully");
    }
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
      render: (_, { attachment, status }) => (status === "credited" ? <Image width={50} src={attachment} /> : "---"),
    },

    {
      title: "Amount",
      dataIndex: "userAmount",
      key: "3",
      width: 80,
      // searchable: true,
      render: (_, { userAmount }) => <Tag color={"gold"}>{`${userAmount} Rs.`}</Tag>,
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
              color={
                status.toLowerCase() === "credited"
                  ? "gold"
                  : status.toLowerCase() === "won"
                  ? "green"
                  : status.toLowerCase() === "lost"
                  ? "red"
                  : "blue"
              }
            >
              {status.toUpperCase()}
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
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY hh:mm:ss a"),
    },
  ];
  const debitColumns = [
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
    // {
    //   title: "Attachment",
    //   dataIndex: "attachment",
    //   key: "2",
    //   width: 100,
    //   // searchable: true,
    //   render: (_, { attachment }) => (
    //     <Image width={50} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
    //   ),
    // },

    {
      title: "Amount",
      dataIndex: "userAmount",
      key: "3",
      width: 80,
      // searchable: true,
      render: (_, { userAmount }) => (
        <Tag onClick={() => {}} color={"gold"}>
          {`${userAmount} Rs.`}
        </Tag>
      ),
    },
    {
      title: "Reason",
      dataIndex: "other",
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
              {status.toUpperCase()}
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
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY hh:mm:ss a"),
    },
  ];
  const requestColumns = [
    {
      title: "Phone Number",
      width: 70,
      dataIndex: "userData",
      key: "userId",
      fixed: "left",
      render: (_, record) => <a onClick={() => navigate(`${record.userId}/userDetails`)}>{record?.userData?.phone}</a>,
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
      title: "User Amount",
      dataIndex: "userData2",
      key: "3",
      width: 80,
      // searchable: true,
      render: (_, record) => <Tag color={"green"}>{`${record?.userData?.amount} Rs.`}</Tag>,
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "2",
      width: 80,
      // searchable: true,
      render: (_, { attachment, status }) =>
        status.toLowerCase() === "withdraw" ? "---" : <Image width={50} src={attachment} />,
    },

    {
      title: "Request Amount",
      dataIndex: "userAmount",
      key: "3",
      width: 80,
      // searchable: true,
      render: (_, { userAmount }) => (
        <Tag onClick={() => {}} color={"gold"}>
          {`${userAmount} Rs.`}
        </Tag>
      ),
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
              {status.toUpperCase()}
            </Tag>
          </div>
        );
      },
      // filters: activeTab === "1" ? statusFilters : null,
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
      // onFilter: (value, record) => record.status.toLowerCase() === value,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "1",
      width: 80,
      // searchable: true,
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY hh:mm:ss a"),
    },
    {
      title: "Action",
      key: "operation",
      // fixed: "right",
      width: 80,
      render: (_, data) => (
        <>
          <Space size="middle">
            <a onClick={() => handleApprove(data._id)}>Approve</a>

            <a onClick={() => handleDecline(data._id)}>Decline</a>
          </Space>
        </>
      ),
    },
  ];
  const fetchList = async () => {
    const storeResponse = await apiService.getAllPayment();

    setPaymentList(
      storeResponse?.data.filter((item) => ["credited", "debited", "won", "lost"].includes(item?.status?.toLowerCase()))
    );
    setCreditList(storeResponse?.data.filter((item) => ["credit", "withdraw"].includes(item?.status?.toLowerCase())));
    setWithdrawList(storeResponse?.data.filter((item) => item?.status?.toLowerCase() === "debit"));
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
          label: "Request List",
          key: "1",
          children: (
            <CustomTable
              columns={requestColumns}
              // loading={!paymentList?.length}
              dataList={creditList}
              // scrollX={1500}
              scrollY={"calc(100% - 77px)"}
            />
          ),
        },
        {
          label: "Debit List",
          key: "2",
          children: (
            <CustomTable
              columns={debitColumns}
              // loading={!paymentList?.length}
              dataList={withdrawList}
              // scrollX={1500}
              scrollY={"calc(100% - 77px)"}
            />
          ),
        },
        {
          label: "Payment List",
          key: "3",
          children: (
            <CustomTable
              columns={paymentColumns}
              // loading={!paymentList?.length}
              dataList={paymentList}
              // scrollX={1500}
              scrollY={"calc(100% - 77px)"}
            />
          ),
        },
      ]}
    />
  );
};

export default PaymentManagement;
