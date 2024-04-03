// import React from "react";
import { Avatar, Button, Image, Tabs, Tag, message } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import CustomTable from "../../components/CustomTable";

const LeaderBoard = () => {
  const [leaderBoardList, setLeaderBoardList] = useState([]);
  const [timeLine, settimeLine] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const navigate = useNavigate();
  const { path } = useParams();
  useEffect(() => {
    fetchList();
  }, []);
  const LeaderBoardColumns = [
    {
      title: "Profile",
      width: 30,
      dataIndex: "profile_picture_url",
      key: "profile_picture_url",
      // fixed: "left",
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
      width: 50,
    },
    {
      title: "Caption",
      dataIndex: "caption",
      key: "1",
      width: 50,
    },
    {
      title: "Timeline",
      width: 35,
      dataIndex: "image",
      key: "image",
      // fixed: "left",
      render: (text, data) => (
        <>
          {data.profile_picture_url ? (
            <Image width={50} height={50} src={data?.image?.trim()?.length ? data?.image : ""} />
          ) : (
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                width: 50,
                height: 50,
                borderRadius: "inherit",
                padding: 5,
              }}
              size="large"
              gap={4}
            >
              NA
            </Avatar>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "2",
      width: 50,
      render: (_, { status }) => {
        return (
          <div>
            <Tag color={status ? "geekblue" : "green"}>{status ? "Inactive" : "Active"}</Tag>
          </div>
        );
      },
    },
    // {
    //   title: "Report Count",
    //   dataIndex: "report_count",
    //   key: "3",
    //   width: 50,
    // },
    // {
    //   title: "Reported",
    //   dataIndex: "is_reported",
    //   key: "4",
    //   width: 50,
    //   render: (_, { is_reported }) => {
    //     return (
    //       <div>
    //         <Tag color={!is_reported ? "geekblue" : "green"}>{`${is_reported}`.toUpperCase()}</Tag>
    //       </div>
    //     );
    //   },
    // },
    {
      title: "Like Count",
      dataIndex: "like_count",
      key: "5",
      width: 50,
    },
    {
      title: "Like Percentage",
      dataIndex: "like_percentage",
      key: "5",
      width: 50,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "6",
      width: 50,
      render: (_, { created_date }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            {moment(created_date).format("DD-MM-YYYY hh:mm A")}
            {/* <Tag color={!is_reported ? "geekblue" : "green"}>{!is_reported ? "Inactive" : "Active"}</Tag> */}
          </div>
        );
      },
    },
  ];
  const TimeLineColumns = [
    {
      title: "Profile",
      width: 30,
      dataIndex: "profile_picture_url",
      key: "profile_picture_url",
      // fixed: "left",
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
      width: 50,
    },
    {
      title: "Caption",
      dataIndex: "caption",
      key: "1",
      width: 50,
    },
    {
      title: "Timeline",
      width: 35,
      dataIndex: "image",
      key: "image",
      // fixed: "left",
      render: (text, data) => (
        <>
          {data.profile_picture_url ? (
            <Image width={50} height={50} src={data?.image?.trim()?.length ? data?.image : ""} />
          ) : (
            <Avatar
              style={{
                backgroundColor: "#f56a00",
                width: 50,
                height: 50,
                borderRadius: "inherit",
                padding: 5,
              }}
              size="large"
              gap={4}
            >
              NA
            </Avatar>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "2",
      width: 50,
      render: (_, { id, status }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag onClick={() => handleUpdateStatus({ id: id, status: !status })} color={status ? "geekblue" : "green"}>
              {status ? "Inactive" : "Active"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Report Count",
      dataIndex: "report_count",
      key: "3",
      width: 50,
    },
    {
      title: "Reported",
      dataIndex: "is_reported",
      key: "4",
      width: 50,
      render: (_, { is_reported }) => {
        return (
          <div>
            <Tag color={!is_reported ? "geekblue" : "green"}>{`${is_reported}`.toUpperCase()}</Tag>
          </div>
        );
      },
    },
    {
      title: "Like Count",
      dataIndex: "like_count",
      key: "5",
      width: 50,
    },

    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "6",
      width: 50,
      render: (_, { created_date }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            {moment(created_date).format("DD-MM-YYYY hh:mm A")}
            {/* <Tag color={!is_reported ? "geekblue" : "green"}>{!is_reported ? "Inactive" : "Active"}</Tag> */}
          </div>
        );
      },
    },
  ];

  const handleUpdateStatus = async (payload) => {
    const response = await apiService.updateTimeLineStatusList(payload);
    if (response.message) {
      message.success("User Status Updated Successfully");

      fetchList();
    }
  };
  const fetchList = async () => {
    setLoading(true);
    const leaderBoardResponse = await apiService.getLeaderBoardList(path);
    const timeLineResponse = await apiService.getTimeLineList(path);
    setLeaderBoardList(leaderBoardResponse?.data);
    settimeLine(timeLineResponse?.data);
    setLoading(false);
  };

  return (
    <>
      <Button icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Tabs
        defaultActiveKey={activeTab}
        accessKey={activeTab}
        onChange={(e) => {
          setActiveTab(e);
        }}
        items={[
          {
            label: "TimeLine",
            key: "1",
            children: (
              <CustomTable
                columns={TimeLineColumns}
                dataList={timeLine}
                loading={loading}
                scrollY={"calc(100vh - 320px)"}
              />
            ),
          },
          {
            label: "LeaderBoard",
            key: "2",
            children: (
              <CustomTable
                columns={LeaderBoardColumns}
                dataList={leaderBoardList}
                loading={loading}
                scrollY={"calc(100vh - 320px)"}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default LeaderBoard;
