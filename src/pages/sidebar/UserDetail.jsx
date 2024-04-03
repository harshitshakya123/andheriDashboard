import { Avatar, Button, Image, Modal, Spin, Tabs, Tag, Typography, Upload, message } from "antd";
import React, { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const { Paragraph } = Typography;
import {
  InstagramOutlined,
  FacebookOutlined,
  FilePdfOutlined,
  TwitterOutlined,
  UploadOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import CustomTable from "../../components/CustomTable";
// import { useTranslation } from "react-i18next";
import { MAX_IMAGE_FILE_SIZE_MB, emptyImage } from "../../utils/constant";

const { confirm } = Modal;

const UserDetail = () => {
  // const [t] = useTranslation("global");

  const [userDetails, setUserDetails] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const navigate = useNavigate();
  const { path } = useParams();
  useEffect(() => {
    fetchList();
    fetchFollow();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    const leaderBoardResponse = await apiService.getUserDetailsAdmin(path);
    setUserDetails(leaderBoardResponse?.data);
    setLoading(false);
  };
  const fetchFollow = async () => {
    setFollowLoading(true);
    const followersResponse = await apiService.getUserFollowers(path, "user");
    const followingResponse = await apiService.getUserFollowing(path, "user");
    setFollowers(followersResponse?.data);
    setFollowing(followingResponse?.data);
    setFollowLoading(false);
  };
  const handleSocial = (url) => {
    const updatedUrl = url.includes("https://") ? url : "https://" + url;
    window.open(updatedUrl, "_blank", "noopener,noreferrer");
  };

  const SocialIcons = ({ url, handleSocial }) => {
    const socialPlatforms = [
      { platform: "instagram", icon: <InstagramOutlined style={{ fontSize: "30px", color: "#08c" }} /> },
      { platform: "facebook", icon: <FacebookOutlined style={{ fontSize: "30px", color: "#08c" }} /> },
      { platform: "x", icon: <TwitterOutlined style={{ fontSize: "30px", color: "#08c" }} /> },
    ];

    const renderSocialIcon = () => {
      for (const platform of socialPlatforms) {
        if (url.includes(platform.platform)) {
          return React.cloneElement(platform.icon, { onClick: () => handleSocial(url) });
        }
      }
      return null;
    };

    return renderSocialIcon();
  };
  const followColumns = [
    {
      title: "Profile",
      width: 70,
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
            {data?.first_name?.charAt(0).toUpperCase()}
          </Avatar>
        </>
      ),
    },

    {
      title: "Name",
      dataIndex: "first_name",
      key: "1",
      width: 100,
      searchable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 100,
      searchable: true,
    },
    {
      title: "Contact No",
      dataIndex: "phone_number",
      key: "3",
      width: 80,
      searchable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "6",
      width: 80,
      searchable: true,
    },

    {
      title: "User Referral Code",
      dataIndex: "user_referral_code",
      key: "5",
      width: 80,
      searchable: true,
    },

    {
      title: "Level",
      dataIndex: "label",
      key: "9",
      width: 50,
      sorter: {
        compare: (a, b) => a.level - b.level,
        multiple: 1,
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 60,
      render: (_, { status }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag onClick={() => {}} color={+status ? "geekblue" : "green"}>
              {+status ? "Inactive" : "Active"}
            </Tag>
          </div>
        );
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: "Followers",
      children: (
        <CustomTable columns={followColumns} dataList={followers} loading={loading} scrollY={"calc(100vh - 420px)"} />
      ),
    },
    {
      key: "2",
      label: "Following",
      children: (
        <CustomTable
          columns={followColumns}
          dataList={following}
          loading={followLoading}
          scrollY={"calc(100vh - 420px)"}
        />
      ),
    },
  ];

  const handleImageUpload = (info) => {
    // const file = info.file.originFileObj;
    const file = info.file;
    console.log("handleChange", info.file.status, info);
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_IMAGE_FILE_SIZE_MB) {
        message.error(`File size exceeds ${MAX_IMAGE_FILE_SIZE_MB} MB limit`);
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const data = await apiService.editUserImage({ id: path, file, type: "user" });
        if (data?.status) {
          message.success("Image uploaded successfully");
          setUserDetails({ ...userDetails, profile_picture_url: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const showDeleteConfirm = (e) => {
    e.stopPropagation();
    confirm({
      title: `Are you want to delete the image?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      loading: true,
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          apiService
            .deleteUserImage(path, "user")
            .then(() => {
              message.success("Image deleted successfully");
              setUserDetails({ ...userDetails, profile_picture_url: "" });
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <>
      <Button style={{ marginBottom: 6 }} icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      {loading ? (
        <div
          style={{
            padding: 100,
          }}
        >
          <Spin size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <Container>
          <div className="user-details">
            <div className="image">
              <div className="image-container">
                <Image
                  preview={!!userDetails?.profile_picture_url?.length}
                  loading={true}
                  rootClassName="profile-image"
                  src={userDetails?.profile_picture_url || emptyImage}
                />
                <Image rootClassName="crown-image" src={userDetails?.crown_image || emptyImage} />
                <Image rootClassName="social_avatar" src={userDetails?.social_avatar || emptyImage} />
                <div className="image-action">
                  <Upload
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => false}
                    className="upload-button"
                    showUploadList={false}
                    onChange={(info) => handleImageUpload(info)}
                  >
                    <Button icon={<UploadOutlined />}>
                      {userDetails?.profile_picture_url ? "Edit" : "Upload"} Image
                    </Button>
                  </Upload>
                  <Button onClick={(e) => showDeleteConfirm(e)} danger icon={<DeleteOutlined />} />
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="detail">
                <div className="item">
                  <div className="label">Name</div>
                  {/* <Image
                    alt="avatar"
                    preview={!!userDetails?.social_avatar?.length}
                    loading={true}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                    }}
                    src={userDetails?.social_avatar || emptyImage}
                  /> */}
                  <span>{userDetails?.first_name}</span>
                </div>
                <div className="item">
                  <div className="label">Address</div>
                  <span>{userDetails?.address || "---"}</span>
                </div>
                <div className="item">
                  <div className="label">Email</div>
                  <Paragraph copyable>{userDetails?.email}</Paragraph>
                </div>
                <div className="item">
                  <div className="label">Level</div>
                  <span>{userDetails?.label}</span>
                </div>
                <div className="item">
                  <div className="label">Million Point</div>
                  <span>{userDetails?.million_point}</span>
                </div>
                <div className="item">
                  <div className="label">Winning Percentage</div>
                  <span>{userDetails?.winning_percentage}</span>
                </div>
                <div className="item">
                  <div className="label">User Referral Code</div>
                  <Paragraph copyable>{userDetails?.user_referral_code}</Paragraph>
                </div>
                <div className="item">
                  <div className="label">Referral Count</div>
                  <span>{userDetails?.referral_count}</span>
                </div>
                <div className="item">
                  <div className="label">Status</div>
                  <span>{userDetails?.status == 0 ? "Active" : "inactive"}</span>
                </div>
              </div>
              <div className="social">
                {Object.values(userDetails?.social_media_links || {})?.map((item, index) => (
                  <span key={index}>
                    <SocialIcons url={item?.url} handleSocial={handleSocial} />
                  </span>
                ))}
                {userDetails?.pdf_url?.length && (
                  <FilePdfOutlined
                    onClick={() => handleSocial(userDetails?.pdf_url)}
                    style={{ fontSize: "30px", color: "#08c" }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="follow-table">
            <Tabs
              defaultActiveKey={activeTab}
              accessKey={activeTab}
              items={items}
              onChange={(e) => {
                setActiveTab(e);
              }}
            />
          </div>
        </Container>
      )}
    </>
  );
};

export default UserDetail;

const Container = styled.div`
  height: 500px;
  overflow-y: auto;
  padding: 10px;
  .user-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 16px;
    border-radius: 10px;

    .image {
      position: relative;
      .profile-image {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
      .crown-image {
        width: 50px;
        position: absolute;
        right: 15px;
        border-radius: 50%;
        overflow: hidden;
        top: 2px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        object-fit: contain;
        height: 46px;
        background: white;
      }
      .social_avatar {
        width: 50px;
        position: absolute;
        left: 5px;
        border-radius: 50%;
        overflow: hidden;
        top: 2px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        object-fit: contain;
        height: 46px;
        background: white;
      }
      .image-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        align-items: center;
      }
      .image-action {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .upload-button {
        // padding-left: 35px;
        // padding-right: 5px;
      }
    }
    .right-container {
      width: 80%;
      .detail {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .label {
        font-size: 17px;
      }
      .item {
        padding: 10px;
        width: 250px;
      }
      .social {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 14px;
      }
    }
  }
`;
