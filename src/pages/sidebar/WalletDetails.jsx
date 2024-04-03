import { Button, Tag } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import CustomTable from "../../components/CustomTable";

const WalletDetails = () => {
  const [walletList, setWalletList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { path } = useParams();
  useEffect(() => {
    fetchList();
  }, []);
  const WalletColumns = [
    {
      title: "Name",
      dataIndex: "created_by",
      key: "5",
      width: 30,
      searchable: true,
    },
    {
      title: "Previous Points",
      dataIndex: "previous_points",
      key: "5",
      width: 30,
      searchable: true,
    },
    {
      title: "Credit Points",
      dataIndex: "credit_points",
      key: "1",
      width: 30,
    },

    {
      title: "Debit Points",
      dataIndex: "debit_points",
      key: "3",
      width: 30,
    },

    {
      title: "Current Points",
      dataIndex: "current_points",
      key: "5",
      searchable: true,
      width: 30,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "5",
      width: 30,
    },

    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "6",
      width: 30,
      render: (_, { transaction_type }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag size="lg" color="success">
              {`${transaction_type}`.toUpperCase()}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "7",
      width: 30,
      sorter: {
        compare: (a, b) => a.referral_count - b.referral_count,
        multiple: 1,
      },
      render: (_, { created_date }) => {
        return <div>{moment(created_date, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY hh:mm:ss")}</div>;
      },
    },
  ];
  const fetchList = async () => {
    setLoading(true);
    const walletResponse = await apiService.getPoints(path);
    setWalletList(walletResponse?.data);
    setLoading(false);
  };

  return (
    <>
      <Button style={{ marginBottom: 6 }} icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <CustomTable columns={WalletColumns} dataList={walletList} loading={loading} scrollY={400} />
    </>
  );
};

export default WalletDetails;
