import { Avatar, Button, Card, Modal, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import CustomTable from "../../components/CustomTable";
import styled from "styled-components";

const GameBoard = () => {
  const [gameBoardList, setGameBoardList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [cardData, setCardData] = useState("");
  const navigate = useNavigate();
  const { path } = useParams();
  useEffect(() => {
    fetchList();
  }, []);
  const LeaderBoardColumns = [
    {
      title: "Profile",
      width: 15,
      dataIndex: "profile_picture_url",
      key: "profile_picture_url",
      fixed: "left",

      render: (text, data) => (
        <>
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            src={
              data?.profile_picture_url?.trim()?.length
                ? data?.profile_picture_url
                : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
            }
            size="large"
            gap={4}
          >
            {data?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "1",
      width: 30,
      searchable: true,
    },
    {
      title: "Store Name",
      dataIndex: "store_name",
      key: "1.2",
      width: 30,
      searchable: true,
    },
    {
      title: "Invoice Amount",
      dataIndex: "invoiceAmount",
      key: "2",
      width: 30,
      searchable: true,
    },
    {
      title: "Winning Probability",
      dataIndex: "winningProbability",
      key: "3",
      width: 30,
      searchable: true,
    },
    {
      title: "Rounds",
      dataIndex: "rounds",
      key: "4",
      width: 30,
      sorter: {
        compare: (a, b) => a.referral_count - b.referral_count,
        multiple: 1,
      },
    },
    {
      title: "isWin",
      dataIndex: "isWin",
      key: "5",
      width: 30,
      render: (_, { isWin }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag color={!isWin ? "geekblue" : "green"}>{`${isWin}`.toUpperCase()}</Tag>
          </div>
        );
      },
      sorter: {
        compare: (a, b) => a.referral_count - b.referral_count,
        multiple: 1,
      },
    },
    {
      title: "isPlayed",
      dataIndex: "isPlayed",
      key: "6",
      width: 30,
      render: (_, { isPlayed }) => {
        console.log(isPlayed);
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag color={!isPlayed ? "geekblue" : "green"}>{`${isPlayed}`.toUpperCase()}</Tag>
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
        return (
          <div style={{ cursor: "pointer" }}>
            {moment(created_date, "DD/MM/YYYY HH:mm:ss").format("DD-MM-YYYY hh:mm:ss")}
          </div>
        );
      },
    },
    {
      title: "Cards View",
      key: "operation",
      fixed: "right",
      width: 20,
      render: (_, { cardData, index }) => (
        <Space size="middle">
          <a
            onClick={() => {
              setCardData({ cardData, index });
              setViewModal(true);
            }}
          >
            View
          </a>
        </Space>
      ),
    },
  ];
  const fetchList = async () => {
    console.log("path", path);
    setLoading(true);
    const leaderBoardResponse = await apiService.getGameCardLogs(path);
    setGameBoardList(leaderBoardResponse?.data);
    setLoading(false);
  };

  return (
    <>
      <Button style={{ marginBottom: 6 }} icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <CustomTable
        columns={LeaderBoardColumns}
        dataList={gameBoardList}
        loading={loading}
        scrollX={1500}
        scrollY={400}
      />
      <Modal
        title="Winning Cards"
        open={viewModal}
        width={800}
        onCancel={() => {
          setViewModal(false);
        }}
        footer={null}
      >
        <div>
          <GameCard data={cardData} />
        </div>
      </Modal>
    </>
  );
};

export default GameBoard;

const GameCard = ({ data }) => {
  return (
    <GameCardContainer>
      <Card>
        {data?.cardData?.map((item, inde) => (
          <Card.Grid key={inde} style={{ border: `2px solid ${inde == data?.index ? "#52c41a" : "transparent"}` }}>
            {typeof item === "number" ? (
              <Tag style={{ fontSize: 20, padding: "10px 22px" }} size="lg" color="success">
                {item}
              </Tag>
            ) : (
              item
            )}
          </Card.Grid>
        ))}
      </Card>
    </GameCardContainer>
  );
};

const GameCardContainer = styled.div`
  .ant-card-body {
    display: flex;
    justify-content: center;
    padding: 24px !important;
  }
  .ant-card-grid {
    text-align: center;
    padding: 18px;
    width: 200px;
    margin: 10px;
    font-size: 17px;
    border-radius: 10px;
  }
`;
