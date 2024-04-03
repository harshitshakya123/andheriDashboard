import { Button, Image, Input, Tabs, Upload, message } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UploadOutlined } from "@ant-design/icons";
import CustomTable from "../../components/CustomTable";
import { MAX_IMAGE_FILE_SIZE_MB, emptyImage } from "../../utils/constant";
import moment from "moment";
import Empty from "../../assets/upload.svg";
import ImageCropper from "../../components/ImageCropper";

const Announcement = () => {
  const [announcement, setAnnouncement] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [createLoading, setCreateLoading] = useState(false);
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    body: "",
    file: "",
  });
  const [uploadedImage, setUploadedImage] = useState("");
  const { path } = useParams();
  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    setLoading(true);
    const followersResponse = await apiService.getAnnouncement(path, "user");
    setAnnouncement(followersResponse?.data);
    setLoading(false);
  };

  const announcementColumns = [
    {
      title: "Image",
      width: 70,
      dataIndex: "image_url",
      key: "image_url",
      render: (text, data) => (
        <>
          {/* <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            src={data?.image_url?.trim()?.length ? data?.image_url : emptyImage}
            size="large"
            gap={4}
          >
            {data?.name?.charAt(0).toUpperCase()}
          </Avatar> */}
          <Image width={40} src={data?.image_url?.trim()?.length ? data?.image_url : emptyImage} />
        </>
      ),
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "1",
    //   width: 100,
    //   searchable: true,
    // },
    {
      title: "Body",
      dataIndex: "body",
      key: "2",
      width: 100,
      searchable: true,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "3",
      width: 80,
      searchable: true,
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "4",
      width: 80,
      render: (_, { created_date }) => {
        return moment(created_date, "YYYY-MM-DD").format("DD-MM-YYYY");
      },
    },
  ];

  const items = [
    {
      key: "1",
      label: "Announcements",
      children: (
        <CustomTable
          columns={announcementColumns}
          dataList={announcement}
          loading={loading}
          scrollY={"calc(100vh - 520px)"}
        />
      ),
    },
  ];

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
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    setCreateLoading(true);

    const res = await apiService.createAnnouncement(announcementData);
    if (res?.status) {
      message.success("Announcement created successfully");
      fetchAnnouncement();
      setAnnouncementData({});
      setUploadedImage("");
    }
    setCreateLoading(false);
  };

  return (
    <Container>
      <div className="announcement-form">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "50%",
              padding: "5px 21px",
              borderRadius: 13,
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
            }}
          >
            <div style={{ margin: "8px 0px" }}>
              <label>Title*</label>
              <Input
                value={announcementData?.title}
                onChange={(e) => setAnnouncementData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Please enter title"
              />
            </div>

            <div style={{ margin: "8px 0px" }}>
              <label>Description*</label>
              <Input.TextArea
                placeholder="Please enter description"
                value={announcementData?.body}
                onChange={(e) => setAnnouncementData((prev) => ({ ...prev, body: e.target.value }))}
              />
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
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
            </div>
            <div
              style={{
                textAlign: "end",
                paddingTop: 40,
              }}
            >
              <Button
                key="submit"
                type="primary"
                disabled={!announcementData?.title?.length || !announcementData?.body?.length}
                loading={createLoading}
                onClick={() => {
                  handleCreate();
                }}
              >
                {createLoading ? "Creating" : "Create"}
              </Button>
            </div>
          </div>
          <div>
            {uploadedImage ? (
              <div style={{ margin: "8px 0px" }}>
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Final Image
                </label>
                <ImageCropper
                  setCropImage={(data) => {
                    console.log("data", data);
                    setAnnouncementData((prev) => ({ ...prev, file: data }));
                  }}
                  aspect={"1"}
                  imageFile={uploadedImage}
                />
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
      </div>
      <div className="announcement-table">
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
  );
};

export default Announcement;

const Container = styled.div`
  height: 550px;
  overflow-y: auto;
  padding: 10px;
  .announcement-form {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 16px;
    border-radius: 10px;
  }
`;
