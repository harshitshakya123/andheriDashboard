import { Tag, Tabs, Button, DatePicker } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import CustomTable from "../../components/CustomTable";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;
const BidsManagement = () => {
  const [userBids, setUserBids] = useState([]);
  const [bidsChart, setBidsChart] = useState([]);
  const navigate = useNavigate();

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
      render: (_, { createdAt }) => moment(createdAt).format("DD-MM-YYYY"),
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
    <RangePicker
      onChange={(e, d) => {
        if (activeTab == 2) fetchList(d[0], d[1]);
        else fetchChart(d[0], d[1]);
      }}
      format={"YYYY-MM-DD"}
    />
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
    </>
  );
};

export default BidsManagement;
