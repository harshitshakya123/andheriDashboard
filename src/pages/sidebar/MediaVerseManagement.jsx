import {
  Button,
  Card,
  Input,
  Modal,
  Tooltip,
  ConfigProvider,
  Spin,
  Select,
  Badge,
  Collapse,
  Image,
  message,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ExclamationCircleFilled, QuestionCircleOutlined, UploadOutlined } from "@ant-design/icons";
import apiService from "../../services/apiServices";
import placeholder from "../../assets/placeholder.png";
import ImageCropper from "../../components/ImageCropper";
import moment from "moment";
import { MAX_IMAGE_FILE_SIZE_MB } from "../../utils/constant";
import Empty from "../../assets/upload.svg";

const { confirm } = Modal;
const MediaVerseManagement = () => {
  const [mediaVerse, setMediaVerse] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    const response = await apiService.getMediaVerseList();
    setMediaVerse(response.data);
    setLoading(false);
  };
  const showDeleteConfirm = (e, data) => {
    console.log(data);
    e.stopPropagation();
    confirm({
      title: `Are you want to ${data?.isUpdate ? "update the status?" : "delete?"}`,
      icon: data?.isUpdate ? (
        <ExclamationCircleFilled />
      ) : (
        <QuestionCircleOutlined
          style={{
            color: "red",
          }}
        />
      ),
      okText: "Yes",
      okType: "danger",
      loading: true,
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          if (data?.isUpdate) {
            apiService
              .updateMediaCardStatus(data)
              .then(() => {
                fetchList();
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            apiService
              .deleteMediaVerseCard(data)
              .then(() => {
                fetchList();
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  useEffect(() => {
    if (mediaVerse?.length) {
      const items = mediaVerse.map((key, index) => {
        const label = Object.keys(key)[0];
        const children = key[label];
        const panelStyle = {
          marginBottom: 15,
          borderRadius: 7,
          border: "none",
          boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
        };

        return {
          key: (index + 1).toString(),
          label: label.toUpperCase(),
          style: panelStyle,
          children: <InnerContainer cards={children} label={label} showDeleteConfirm={showDeleteConfirm} />,
        };
      });
      setUpdatedItem(items);
    }
  }, [mediaVerse]);

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
              Media Verse
            </h2>
            <Button onClick={() => setIsModalOpen(true)}>Add Card</Button>
          </div>
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
        </>
      )}
      {isModalOpen && <MyModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} fetchList={fetchList} />}
    </Container>
  );
};

export default MediaVerseManagement;

const InnerContainer = ({ cards, label, showDeleteConfirm }) => {
  return (
    <div className="main-card">
      {cards?.map((item, index) => (
        <div key={index} className="inner-card">
          <Badge.Ribbon text={item?.status == 0 ? "Active" : "In Active"} color={item?.status == 0 ? "Green" : "red"}>
            <Card
              hoverable
              style={{ width: 250, height: "325px" }}
              cover={
                <Image
                  style={{
                    height: 200,
                    objectFit: "contain",
                    background: "#e6f4ff",
                  }}
                  src={item?.imageUrl || placeholder}
                />
              }
            >
              <div className="game-config">
                <div className="game-detail">
                  <ConfigProvider span={{}}>
                    <Tooltip className="my-tooltip" placement="bottom" title={item?.content}>
                      <span>{item?.content}</span>
                    </Tooltip>
                  </ConfigProvider>
                </div>
                <div>
                  <span>{moment(item?.created_date).format("DD-MM-YYYY")}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    paddingTop: 5,
                  }}
                >
                  <Button
                    type="primary"
                    danger
                    onClick={(e) => showDeleteConfirm(e, { ...item, type: label, isUpdate: false })}
                  >
                    Delete
                  </Button>
                  <Button
                    type="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      showDeleteConfirm(e, { ...item, type: label, isUpdate: true });
                    }}
                  >
                    Update Status
                  </Button>
                </div>
              </div>
            </Card>
          </Badge.Ribbon>
        </div>
      ))}
    </div>
  );
};

const MyModal = ({ isModalOpen, setIsModalOpen, fetchList }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [mediaConfig, setMediaConfig] = useState("");
  const [selectedAspectData, setSelectedAspectData] = useState([]);
  const [selectedAspect, setSelectedAspect] = useState("");
  const [content, setContent] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchConfig = async () => {
    const responseConfig = await apiService.getMediaConfig();
    setMediaConfig(responseConfig?.data[0]);
  };
  useEffect(() => {
    fetchConfig();
  }, []);

  const handleImageChange = (info) => {
    const file = info.file;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_IMAGE_FILE_SIZE_MB) {
        message.error(`File size exceeds ${MAX_IMAGE_FILE_SIZE_MB} MB limit`);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateCard = async () => {
    setCreateLoading(true);
    const response = await apiService.addMediaCard({
      type: selectedAspectData?.label,
      file: cropImage,
      content,
    });
    if (response.status === 200) {
      setCreateLoading(true);
      setIsModalOpen(false);
      setContent("");
      setCropImage("");
      fetchList();
    }
  };

  return (
    <CustomModal
      title="Add Media Card"
      open={isModalOpen}
      width={1000}
      onCancel={() => {
        setIsModalOpen(null);
        setSelectedImage(null);
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            setIsModalOpen(null);
            setSelectedImage(null);
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={!content?.length || !cropImage?.length || !selectedAspectData?.label?.length}
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
            <label>Select Category</label>
            <Select
              required
              size={"midddle"}
              placeholder="Select Category"
              onChange={(e) => {
                setSelectedAspectData({ label: e, value: mediaConfig[e] });
              }}
              style={{ width: "100%" }}
              options={Object.keys(mediaConfig)?.map((item) => ({ value: item, label: item }))}
            />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Select Aspect Ratio</label>
            <Select
              size={"midddle"}
              disabled={!selectedAspectData?.value?.length}
              placeholder="Select Aspect Ratio"
              onChange={(e) => {
                const ratio = e.split(".");
                setSelectedAspect(ratio[0] / ratio[1]);
              }}
              style={{ width: "100%" }}
              options={selectedAspectData?.value?.map((item) => ({
                value: item?.aspect_ratio,
                label: item?.aspect_ratio,
              }))}
            />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Content</label>
            <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <Upload
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              className="upload-button"
              showUploadList={false}
              onChange={(info) => handleImageChange(info)}
            >
              <Button disabled={!selectedAspect} icon={<UploadOutlined />}>
                Upload Image
              </Button>
            </Upload>
          </div>
        </div>
        <div>
          {selectedImage ? (
            <div style={{ margin: "8px 0px" }}>
              <label
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Final Image
              </label>
              <ImageCropper setCropImage={setCropImage} aspect={selectedAspect} imageFile={selectedImage} />
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
      height: 50px;
    }
  }
  .main-card {
    margin: 0px 20px 20px;
    width: 96%;
    display: flex;
    justify-content: center;
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
