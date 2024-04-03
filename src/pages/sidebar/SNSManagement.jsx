import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Input,
  Modal,
  Select,
  Spin,
  Tabs,
  notification,
  Badge,
  Popconfirm,
  message,
  Tooltip,
  ConfigProvider,
  Upload,
} from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import styled from "styled-components";
import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import ImageCropper from "../../components/ImageCropper";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment/moment";
import { isDateBetween } from "../../utils/apiUtils";
import { MAX_FILE_SIZE_MB, MAX_IMAGE_FILE_SIZE_MB } from "../../utils/constant";
import Empty from "../../assets/upload.svg";

const SNSManagement = () => {
  const [currentList, setCurrentList] = useState([]);
  const [pastList, setPastList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchList();
  }, []);

  const fetchList = async () => {
    const currResponse = await apiService.getSNSList("current");
    const pastResponse = await apiService.getSNSList("past");
    setCurrentList(currResponse?.data);
    setPastList(pastResponse?.data);
    setLoading(false);
  };

  const updateList = (payload) => {
    if (activeTab === "2") {
      const updatedData = pastList.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            status: payload.status,
            label: payload?.label,
          };
        }
        return item;
      });
      setPastList(updatedData);
    } else {
      const updatedData = currentList.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            status: payload.status,
            label: payload?.label,
          };
        }
        return item;
      });
      setCurrentList(updatedData);
    }
  };

  const operations = (
    <Button disabled={loading} onClick={() => setIsModalOpen(true)}>
      Add Event
    </Button>
  );
  return (
    <>
      <MyModal
        editData={editData}
        setEditData={setEditData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        updateList={updateList}
        fetchList={fetchList}
      />

      <Tabs
        tabBarExtraContent={activeTab != 3 && operations}
        defaultActiveKey={activeTab}
        onChange={(e) => {
          setActiveTab(e);
        }}
        loading
        items={[
          {
            label: "Current Events",
            key: "1",
            children: <Current currentList={currentList} loading={loading} fetchList={fetchList} />,
          },
          {
            label: "Past Events",
            key: "2",
            children: <Past pastList={pastList} loading={loading} fetchList={fetchList} />,
          },
          {
            label: "Event Setting",
            key: "3",
            children: <Event pastList={pastList} loading={loading} fetchList={fetchList} />,
          },
        ]}
      />
    </>
  );
};

export default SNSManagement;

const Current = ({ currentList, loading, fetchList }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const confirm = async (e, payload) => {
    e.stopPropagation();
    setConfirmLoading(true);
    const res = await apiService.updateSnsStatus(payload);
    console.log("Res", res);
    if (res?.status) {
      setOpen(null);
      setConfirmLoading(false);
      fetchList();
      message.success("Status updated successfully.");
    }
  };
  const cancel = (e) => {
    e.stopPropagation();
    console.log("cancel");
    setOpen(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        gap: 26,
        maxHeight: "68vh",
        minHeight: "68vh",
        overflow: "auto",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        currentList?.map((item, index) => {
          return (
            <Badge.Ribbon
              key={index}
              text={isDateBetween(item?.start_date, item?.end_date) ? "Ongoing" : "Upcoming"}
              color={isDateBetween(item?.start_date, item?.end_date) ? "Green" : "red"}
            >
              <MediaCard
                hoverable
                style={{ width: 250, height: "304px" }}
                onClick={() => navigate(`${item.id}/leaderBoard`)}
                cover={
                  <img
                    style={{
                      height: 200,
                      objectFit: "contain",
                      background: "#e6f4ff",
                    }}
                    alt=""
                    src={item?.bannerUrl || placeholder}
                  />
                }
              >
                <div className="game-config">
                  <div
                    style={{
                      display: "flex",
                      padding: "0 0 10px",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <div>
                      <Avatar
                        style={{
                          backgroundColor: "#f56a00",
                          verticalAlign: "middle",
                        }}
                        src={
                          item?.store_logo_url?.trim()?.length
                            ? item?.store_logo_url
                            : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                        }
                        size="large"
                        gap={4}
                      >
                        {item?.name?.charAt(0).toUpperCase()}
                      </Avatar>
                    </div>
                    <div>
                      <div
                        className="name"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          maxWidth: 150,
                          fontWeight: 600,
                        }}
                      >
                        <ConfigProvider span={{}}>
                          <Tooltip className="my-tooltip" placement="bottom" title={item?.content}>
                            <span>{item?.name}</span>
                          </Tooltip>
                        </ConfigProvider>
                      </div>
                      <div className="date">
                        <span>
                          {moment(item?.start_date, "DD/MM/YYYY").format("DD-MM-YYYY")} -{" "}
                          {moment(item?.end_date, "DD/MM/YYYY").format("DD-MM-YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <Popconfirm
                      title="Status Update"
                      description={`Click yes for ${item?.status === 1 ? "Enable" : "Disable"}`}
                      open={open === index}
                      onConfirm={(e) => confirm(e, item)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{
                        loading: confirmLoading,
                      }}
                    >
                      <Button
                        type="primary"
                        danger={!item?.status}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(index);
                        }}
                      >
                        {item?.status == 1 ? "Enable" : "Disable"}
                      </Button>
                    </Popconfirm>
                    <FilePdfOutlined
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(item?.pdfUrl, "_blank");
                      }}
                      style={{ fontSize: "30px", color: "#08c" }}
                    />
                  </div>
                </div>
              </MediaCard>
            </Badge.Ribbon>
          );
        })
      )}
    </div>
  );
};
const Past = ({ pastList, loading, fetchList }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const confirm = async (e, payload) => {
    e.stopPropagation();
    setConfirmLoading(true);
    const res = await apiService.updateSnsStatus(payload);
    console.log("Res", res);
    if (res?.status) {
      setOpen(null);
      setConfirmLoading(false);
      fetchList();
      message.success("Status updated successfully.");
    }
  };
  const cancel = (e) => {
    e.stopPropagation();
    console.log("cancel");
    setOpen(null);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        gap: 15,
        maxHeight: "68vh",
        minHeight: "68vh",
        overflow: "auto",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        pastList?.map((item, index) => {
          return (
            <MediaCard
              key={index}
              hoverable
              style={{ width: 250, height: "304px" }}
              onClick={() => navigate(`${item.id}/leaderBoard`)}
              cover={
                <img
                  style={{
                    height: 200,
                    objectFit: "contain",
                    background: "#e6f4ff",
                  }}
                  alt=""
                  src={item?.bannerUrl || placeholder}
                />
              }
            >
              <div className="game-config">
                <div
                  style={{
                    display: "flex",
                    padding: "0 0 10px",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div>
                    <Avatar
                      style={{
                        backgroundColor: "#f56a00",
                        verticalAlign: "middle",
                      }}
                      src={
                        item?.store_logo_url?.trim()?.length
                          ? item?.store_logo_url
                          : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
                      }
                      size="large"
                      gap={4}
                    >
                      {item?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                  <div>
                    <div
                      className="name"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        maxWidth: 150,
                        fontWeight: 600,
                      }}
                    >
                      <ConfigProvider span={{}}>
                        <Tooltip className="my-tooltip" placement="bottom" title={item?.content}>
                          <span>{item?.name}</span>
                        </Tooltip>
                      </ConfigProvider>
                    </div>
                    <div className="date">
                      <span>
                        {moment(item?.start_date, "DD/MM/YYYY").format("DD-MM-YYYY")} -{" "}
                        {moment(item?.end_date, "DD/MM/YYYY").format("DD-MM-YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  <Popconfirm
                    title="Status Update"
                    description={`Click yes for ${item?.status === 1 ? "Enable" : "Disable"}`}
                    open={open === index}
                    onConfirm={(e) => confirm(e, item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{
                      loading: confirmLoading,
                    }}
                  >
                    <Button
                      type="primary"
                      danger={!item?.status}
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(index);
                      }}
                    >
                      {item?.status == 1 ? "Enable" : "Disable"}
                    </Button>
                  </Popconfirm>
                  <FilePdfOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item?.pdfUrl, "_blank");
                    }}
                    style={{ fontSize: "30px", color: "#08c" }}
                  />
                </div>
              </div>
            </MediaCard>
          );
        })
      )}
      {/* {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )} */}
    </div>
  );
};

const Event = () => {
  const [eventCount, setEventCount] = useState("");
  const [editData, setEditData] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = async () => {
    const res = await apiService.getSNSEventCount();
    setEventCount(res?.data?.report_count);
  };
  const handleUpdate = async () => {
    await apiService.updateSNSEventCount({ report_count: +editData });
    message.success("Report Banned Count updated successfully");
    fetchList();
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>
          Report Banned Count: <span>{eventCount}</span>
          {isEdit && (
            <Input
              type="number"
              onChange={(e) => setEditData(e.target.value)}
              placeholder="Please enter"
              maxLength={16}
            />
          )}
        </h2>
        <div>
          <Button
            style={{ marginBottom: 6 }}
            onClick={() => {
              !isEdit ? setIsEdit(true) : handleUpdate();
            }}
          >
            {isEdit ? "Submit" : "Edit"}
          </Button>
          {isEdit && (
            <Button style={{ marginLeft: 6 }} onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const MyModal = ({ isModalOpen, setIsModalOpen, fetchList }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [storeList, setStoreList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [cropImage, setCropImage] = useState("");
  const [content, setContent] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeId, setStoreId] = useState("");
  const fetchStore = async () => {
    const responseStore = await apiService.getStoreList();
    setStoreList(responseStore?.data);
  };

  useEffect(() => {
    fetchStore();
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
  const handlePdfChange = (info) => {
    const file = info.file;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        message.error(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit`);
        return;
      }
      setSelectedPdf(file);
    }
  };
  const handleStartDateChange = (selectedDate) => {
    setStartDate(moment(selectedDate?.$d).format("DD/MM/YYYY"));
  };
  function disabledDate(current) {
    return current && dayjs(current).isBefore(dayjs().startOf("day"));
  }
  const handleEndDateChange = (selectedDate) => {
    setEndDate(moment(selectedDate?.$d).format("DD/MM/YYYY"));
  };

  const handleCreateCard = async () => {
    setCreateLoading(true);
    const response = await apiService.addSnsCard({
      id: storeId,
      file: cropImage,
      content,
      startDate,
      endDate,
      storeName,
      selectedPdf,
    });
    if (response.status === 200) {
      setIsModalOpen(false);
      setContent("");
      setCropImage("");
      setEndDate(null);
      setSelectedImage(null);
      setStartDate(null);
      setStoreId("");
      setStoreName("");
      notification.success({
        message: "Event added Successfully",
        duration: 1,
        rtl: true,
      });
      fetchList();
    }
    setCreateLoading(false);
  };
  return (
    <CustomModal
      title="Create"
      open={isModalOpen}
      width={1000}
      onCancel={() => {
        // setEditData(null);
        setIsModalOpen(null);
        setCreateLoading(false);
        setContent("");
        setCropImage("");
        setEndDate(null);
        setSelectedImage("");
        setStartDate(null);
        setStoreId("");
        setStoreName("");
      }}
      footer={[
        <Button
          key="back"
          onClick={() => {
            // setEditData(null);
            setIsModalOpen(null);
            setCreateLoading(false);
            setContent("");
            setCropImage("");
            setEndDate(null);
            setSelectedImage("");
            setStartDate(null);
            setStoreId("");
            setStoreName("");
          }}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={!content?.length || !cropImage?.length}
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
            <label>Select Store</label>

            <Select
              style={{ width: "100%" }}
              required
              size="middle"
              placeholder="Select Store"
              onChange={(storeId) => {
                {
                  setStoreId({ storeId });
                }
              }}
              options={storeList?.map((item) => ({ label: item?.name, value: item?.id }))}
            />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Name</label>
            <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
          </div>
          <label>Select Dates</label>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
          >
            <DatePicker style={{ width: "100%" }} onChange={handleStartDateChange} disabledDate={disabledDate} />
            <DatePicker style={{ width: "100%" }} onChange={handleEndDateChange} disabledDate={disabledDate} />
          </div>
          <div style={{ margin: "8px 0px" }}>
            <label>Content</label>
            <Input.TextArea value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Upload
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              type="file"
              accept="application/pdf"
              className="upload-button"
              onChange={(info) => handlePdfChange(info)}
            >
              <Button icon={<UploadOutlined />}>Upload Pdf</Button>
            </Upload>

            <Upload
              multiple={false}
              maxCount={1}
              beforeUpload={() => false}
              className="upload-button"
              showUploadList={false}
              onChange={(info) => handleImageChange(info)}
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
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
              <ImageCropper setCropImage={setCropImage} imageFile={selectedImage} />
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
`;

const MediaCard = styled(Card)`
  .ant-card-body {
    padding: 10px 13px;
  }
  .desc {
    word-wrap: break-word;
    // color: rgb(69, 85, 96);
    font-weight: 400;
    font-size: 15px;
    padding: 2px 0px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 50px;
  }
  .sns-date {
    padding: 4px 9px;
    font-size: 15px;
  }
`;
