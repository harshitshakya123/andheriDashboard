import {
  Button,
  Card,
  Input,
  Modal,
  Spin,
  Select,
  Badge,
  Collapse,
  ConfigProvider,
  Tooltip,
  Image,
  message,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import apiService from "../../services/apiServices";
import ImageCropper from "../../components/ImageCropper";
import moment from "moment";
import placeholder from "../../assets/placeholder.png";
import { ExclamationCircleFilled, UploadOutlined, LinkOutlined } from "@ant-design/icons";
import { MAX_IMAGE_FILE_SIZE_MB, MAX_VIDEO_SIZE_MB } from "../../utils/constant";
import Empty from "../../assets/upload.svg";
import VideoThumbnail from "../../components/VideoThumbnail";
const { confirm } = Modal;

const AdvertiseManagement = () => {
  const [advertiseData, setAdvertiseData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchList();
  }, []);

  const fetchList = async () => {
    const response = await apiService.getAdvertisement();
    setAdvertiseData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(advertiseData || {}).length) {
      const items = Object.keys(advertiseData || {}).map((key, index) => {
        const label = key;
        const children = advertiseData[key];
        const panelStyle = {
          marginBottom: 15,
          borderRadius: 7,
          border: "none",
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        };

        return {
          key: (index + 1).toString(),
          label: key.toUpperCase(),
          style: panelStyle,
          children: <InnerContainer cards={children} label={label} fetchList={fetchList} />,
        };
      });
      setUpdatedItem(items);
    }
  }, [advertiseData]);

  return (
    <Container>
      {loading ? (
        <div
          style={{
            paddingTop: 100,
            margin: "auto",
          }}
        >
          <Spin size="large">
            <div className="content" />
          </Spin>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              padding: "0px 20px 20px 0px",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                marginLeft: 13,
              }}
            >
              Advertisement
            </h2>
            <Button onClick={() => setIsModalOpen(true)}>Add Card</Button>
          </div>
          {Object.keys(advertiseData || {})?.length && (
            <div className="card-container">
              <Collapse
                style={{
                  background: "#fff",
                }}
                bordered={false}
                accordion
                items={updatedItem}
              />
            </div>
          )}
          {isModalOpen && <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} fetchList={fetchList} />}
        </>
      )}
    </Container>
  );
};

export default AdvertiseManagement;

const InnerContainer = ({ cards, label, fetchList }) => {
  const handleStatusUpdate = (e, data) => {
    e.stopPropagation();
    confirm({
      title: `Are you want to ${data?.status ? "active" : "Inactive"} the status?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      loading: true,
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          apiService
            .updateStatusAdvertisement(data)
            .then(() => {
              fetchList();
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
    <div className="main-card">
      {cards?.map((item, index) =>
        label === "image" ? (
          <div key={index} className="inner-card">
            <Badge.Ribbon text={item?.language} color={"Green"}>
              <Card
                hoverable
                style={{ width: 250, height: 295 }}
                cover={
                  <Image
                    style={{
                      height: 200,
                      objectFit: "contain",
                      background: "#e6f4ff",
                    }}
                    src={item?.file || placeholder}
                  />
                }
              >
                <div className="game-config">
                  <div className="game-detail">
                    <ConfigProvider span={{}}>
                      <Tooltip className="my-tooltip" placement="bottom" title={item?.caption}>
                        <span>{item?.caption}</span>
                      </Tooltip>
                    </ConfigProvider>
                  </div>
                  <div>
                    <span>{moment(item?.created_date).format("DD-MM-YYYY")}</span>
                  </div>
                  <div>
                    <Button
                      type="primary"
                      danger={item?.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(e, { ...item, type: label });
                      }}
                    >
                      {!item?.status ? "In Active" : "Active"}
                    </Button>
                    <LinkOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item?.redirect_url, "_blank");
                      }}
                      style={{ marginLeft: 5, fontSize: "20px", color: "#08c" }}
                    />
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        ) : label === "video" ? (
          <Badge.Ribbon
            style={{
              top: "-4px",
            }}
            text={item?.language}
            color={"Green"}
          >
            <Card
              hoverable
              title={item?.caption}
              bordered={false}
              style={{
                width: 300,
                margin: 10,
              }}
            >
              {/* <video width="250" height="150" controls>
                <source src={item?.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video> */}
              <VideoThumbnail video={item?.file} thumbnail={item?.thumbnail} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  padding: 5,
                }}
              >
                <div>{moment(item?.created_date).format("DD-MM-YYYY")}</div>
                <div>
                  <Button
                    type="primary"
                    danger={item?.status}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusUpdate(e, { ...item, type: label });
                    }}
                  >
                    {!item?.status ? "In Active" : "Active"}
                  </Button>
                  <LinkOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item?.redirect_url, "_blank");
                    }}
                    style={{ marginLeft: 5, fontSize: "20px", color: "#08c" }}
                  />
                </div>
              </div>
            </Card>
          </Badge.Ribbon>
        ) : (
          <div key={index} className="inner-card">
            <Badge.Ribbon
              style={{
                top: "-4px",
              }}
              text={item?.language}
              color={"Green"}
            >
              <Card
                hoverable
                title={item?.caption}
                bordered={false}
                style={{
                  width: 300,
                  margin: 15,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <div>{moment(item?.created_date).format("DD-MM-YYYY")}</div>
                  <div>
                    <Button
                      type="primary"
                      danger={item?.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(e, { ...item, type: label });
                      }}
                    >
                      {!item?.status ? "In Active" : "Active"}
                    </Button>
                    <LinkOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item?.redirect_url, "_blank");
                      }}
                      style={{ marginLeft: 5, fontSize: "20px", color: "#08c" }}
                    />
                  </div>
                </div>
              </Card>
            </Badge.Ribbon>
          </div>
        )
      )}
      {!cards?.length && <h2>Data not Exist</h2>}
    </div>
  );
};

const MyModal = ({ isModalOpen, setIsModalOpen, fetchList }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [cropImage, setCropImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.file;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      const size = selectedType.toLowerCase() == "image" ? MAX_IMAGE_FILE_SIZE_MB : MAX_VIDEO_SIZE_MB;
      if (fileSizeInMB > size) {
        message.error(`File size exceeds ${size} MB limit`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCard = async () => {
    setCreateLoading(true);
    const response = await apiService.addAdvertisement({
      type: selectedType?.toLowerCase(),
      file: selectedType === "Video" ? selectedFile : cropImage,
      language: selectedLanguage,
      caption: content,
      redirect_url: url,
    });
    if (response.status === 200) {
      setIsModalOpen(false);
      setContent("");
      setCropImage("");
      fetchList();
    }
    setCreateLoading(true);
  };

  return (
    <CustomModal
      title="Add Advertisement"
      open={isModalOpen}
      width={1000}
      onCancel={() => {
        setIsModalOpen(null);
        setSelectedFile(null);
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setIsModalOpen(null);
            setSelectedFile(null);
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={
            !content?.length ||
            !selectedType?.length ||
            !selectedLanguage?.length ||
            !url?.length ||
            (selectedType != "Text" && !selectedFile?.length)
          }
          loading={createLoading}
          onClick={() => {
            handleCreateCard();
          }}
        >
          {createLoading ? "Creating" : "Create"}
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ width: "50%" }}>
          <div style={{ margin: "8px 0px" }}>
            <label>Select Type</label>
            <Select
              required
              size={"midddle"}
              placeholder="Select Category"
              onChange={(e) => {
                setSelectedFile(null);
                setSelectedType(e);
              }}
              style={{ width: "100%" }}
              options={[
                { value: "Image", label: "Image" },
                { value: "Video", label: "Video" },
                { value: "Text", label: "Text" },
              ]}
            />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Select Language</label>
            <Select
              required
              size={"midddle"}
              placeholder="Select Category"
              onChange={(e) => {
                setSelectedLanguage(e);
              }}
              style={{ width: "100%" }}
              options={[
                { value: "English", label: "English" },
                { value: "Japanese", label: "Japanese" },
              ]}
            />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Content</label>
            <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Redirect Url</label>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </div>
          {selectedType && selectedType !== "Text" && (
            <div style={{ margin: "8px 0px" }}>
              {/* <label>{selectedType}</label>
              <Input type="file" accept={`${selectedType.toLowerCase()}/*`} onChange={handleImageChange} /> */}
              <Upload
                multiple={false}
                maxCount={1}
                beforeUpload={() => false}
                type="file"
                accept={`${selectedType.toLowerCase()}/*`}
                className="upload-button"
                showUploadList={false}
                onChange={(info) => handleImageChange(info)}
              >
                <Button icon={<UploadOutlined />}>Upload {selectedType}</Button>
              </Upload>
            </div>
          )}
        </div>
        <div>
          {selectedFile && selectedType !== "Text" ? (
            <div style={{ margin: "8px 0px" }}>
              <label
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Final {selectedType}
              </label>
              {selectedType == "Image" ? (
                <ImageCropper setCropImage={setCropImage} imageFile={selectedFile} />
              ) : (
                <div>
                  <video width="320" height="240" controls>
                    <source src={selectedFile} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          ) : (
            <img
              style={{
                width: 280,
                paddingRight: 31,
                height: 280,
              }}
              src={Empty}
            />
          )}
        </div>
      </div>
    </CustomModal>
  );
};
const CustomModal = styled(Modal)`
  .ant-form-item {
    margin-bottom: 10px !important;
  }
  .cropContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
    background: '#333',
    [theme.breakpoints.up('sm')]: {
      height: 400,
    },
  },
`;

const Container = styled.div`
  .card-container {
    overflow-y: auto;
    height: 500px;
    padding: 10px;
  }
  .game-config {
    width: 100%;
    text-align: center;

    .game-detail {
      // color: rgb(69, 85, 96);
      font-weight: 400;
      font-size: 15px;
      padding: 2px 0px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .game-detail:first-child {
      font-weight: 500;
      max-height: 50px;
    }
  }
  .main-card {
    margin: 0px 20px 20px;
    width: 96%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;

    .ant-card-body {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      padding: 8px;
    }
    .ant-card-head-title {
      text-transform: uppercase;
      font-size: larger;
    }
    .inner-card {
      margin: 10px 20px 10px;
    }
  }
  .ant-collapse-header {
    font-weight: 500;
  }
`;
