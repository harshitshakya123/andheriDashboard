import { Avatar, Button, Image, Modal, Spin, Tabs, Tag, Typography, Upload, message } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const { Paragraph } = Typography;
import {
  UploadOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  LoadingOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import CustomTable from "../../components/CustomTable";
// import { useTranslation } from "react-i18next";
import { MAX_FILE_SIZE_MB, MAX_IMAGE_FILE_SIZE_MB, emptyImage } from "../../utils/constant";
import ImageCropper from "../../components/ImageCropper";
import Empty from "../../assets/upload.svg";
import SampleFile from "../../assets/sample_catalog.xlsx";

const { confirm } = Modal;

const StoreDetails = () => {
  // const [t] = useTranslation("global");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editImageId, setEditImageId] = useState("");

  const [storeDetails, setStoreDetails] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [catalog, setCatalog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [catalogUploadLoading, setCatalogUploadLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const navigate = useNavigate();
  const { path } = useParams();
  useEffect(() => {
    fetchList();
    fetchFollow();
  }, []);

  const fetchList = async () => {
    setLoading(true);
    const leaderBoardResponse = await apiService.storeDetails(path);
    setStoreDetails(leaderBoardResponse?.data);
    setLoading(false);
  };
  const fetchFollow = async () => {
    setFollowLoading(true);
    const followersResponse = await apiService.getUserFollowers(path, "store");
    const catalogResponse = await apiService.getStoreCatalog(path);
    setFollowers(followersResponse?.data);
    setCatalog(catalogResponse?.data);
    setFollowLoading(false);
  };

  const followColumns = [
    {
      title: "Profile",
      width: 70,
      dataIndex: "logo_url",
      key: "logo_url",
      fixed: "left",
      render: (text, data) => (
        <>
          <Avatar
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            src={
              data?.logo_url?.trim()?.length
                ? data?.logo_url
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
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "6",
    //   width: 80,
    //   searchable: true,
    // },

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
  const catalogColumns = [
    {
      title: "Image",
      width: 50,
      dataIndex: "image",
      key: "image",
      fixed: "left",
      render: (text, data) => (
        <>
          <Avatar
            shape="square"
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
              cursor: "pointer",
            }}
            src={data?.image?.length ? data?.image : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"}
            size="large"
            gap={4}
            onClick={() => {
              setEditImageId(data);
              setIsModalOpen(true);
            }}
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
      width: 70,
      searchable: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "3",
      width: 80,
      searchable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "6",
      width: 40,
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "5",
      width: 40,
      searchable: true,
    },
    {
      title: "Price",
      dataIndex: "sellPrice",
      key: "7",
      width: 40,
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
      key: "4",
      width: 60,
      searchable: true,
    },

    {
      title: "Ratings",
      dataIndex: "ratings",
      key: "8",
      width: 40,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "9",
      width: 40,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "9",
      width: 40,
      render: (_, { currency }) =>
        currency && (
          <Tag color={"green"} key="green" style={{ fontSize: 30, padding: 7 }}>
            {currency}
          </Tag>
        ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 40,
      render: (_, data) => <a onClick={(e) => showDeleteConfirm(e, data?.id)}>Delete</a>,
    },
  ];

  const items = [
    {
      key: "1",
      label: "Followers",
      children: (
        <CustomTable
          columns={followColumns}
          dataList={followers}
          loading={followLoading}
          scrollY={"calc(100vh - 520px)"}
        />
      ),
    },
    {
      key: "2",
      label: "Catalog",
      children: (
        <CustomTable
          columns={catalogColumns}
          dataList={catalog}
          loading={followLoading}
          // scrollX={1400}
          scrollY={"calc(100vh - 420px)"}
        />
      ),
    },
  ];

  const handleImageUpload = (info) => {
    const file = info.file;
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_IMAGE_FILE_SIZE_MB) {
        message.error(`File size exceeds ${MAX_IMAGE_FILE_SIZE_MB} MB limit`);
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const data = await apiService.editUserImage({ id: path, file, type: "store" });
        if (data?.status) {
          message.success("Image uploaded successfully");
          setStoreDetails({ ...storeDetails, logo_url: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUploadCatalog = (info) => {
    const file = info.file;
    setCatalogUploadLoading(true);
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        message.error(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit`);
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const data = await apiService.uploadStoreCatalog({ id: path, file });
        if (data?.status) {
          message.success("Catalog uploaded successfully");
          setTimeout(() => {
            fetchFollow();
          }, 2000);
        }
        setCatalogUploadLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };
  const showDeleteConfirm = (e, catalogId) => {
    e.stopPropagation();
    confirm({
      title: `Are you want to delete the ${catalogId ? "catalog" : "image"}?`,
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      loading: true,
      cancelText: "No",
      onOk() {
        return new Promise((resolve, reject) => {
          const path = catalogId
            ? apiService.removeStoreCatalogById(catalogId)
            : apiService.deleteUserImage(path, "store");

          path
            .then(() => {
              message.success(`${catalogId ? "Catalog" : "Image"} deleted successfully`);
              if (catalogId) {
                const updateCatalog = catalog.filter((item) => item.id !== catalogId);
                setCatalog(updateCatalog);
              } else {
                setStoreDetails({ ...storeDetails, logo_url: "" });
              }
              console.log("success enter");
              resolve();
            })
            .catch((error) => {
              console.log(error);
              reject(error);
            });
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDownloadSample = async () => {
    try {
      // Fetch the file as a Blob
      const response = await fetch(SampleFile);
      const blob = await response.blob();

      // Create a link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "sample_catalog.xlsx";

      // Trigger a click on the link to start the download
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
        }}
      >
        <Button style={{ marginBottom: 6 }} icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
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
                  preview={!!storeDetails?.logo_url?.length}
                  loading={true}
                  rootClassName="profile-image"
                  src={storeDetails?.logo_url || emptyImage}
                />
                <Image rootClassName="crown-image" src={storeDetails?.crown_image} />
                <div className="image-action">
                  <Upload
                    multiple={false}
                    maxCount={1}
                    beforeUpload={() => false}
                    className="upload-button"
                    showUploadList={false}
                    onChange={(info) => handleImageUpload(info)}
                  >
                    <Button icon={<UploadOutlined />}>{storeDetails?.logo_url ? "Edit" : "Upload"} Image</Button>
                  </Upload>
                  {storeDetails?.logo_url && (
                    <Button onClick={(e) => showDeleteConfirm(e)} danger icon={<DeleteOutlined />} />
                  )}
                </div>
              </div>
            </div>
            <div className="right-container">
              <div className="detail">
                <div className="item">
                  <div className="label">Name</div>
                  <span>{storeDetails?.name}</span>
                </div>
                <div className="item">
                  <div className="label">Address</div>
                  <span>{storeDetails?.address || "---"}</span>
                </div>
                <div className="item">
                  <div className="label">Email</div>
                  <Paragraph copyable>{storeDetails?.email}</Paragraph>
                </div>
                <div className="item">
                  <div className="label">Level</div>
                  <span>{storeDetails?.level}</span>
                </div>
                <div className="item">
                  <div className="label">Million Point</div>
                  <span>{storeDetails?.million_point}</span>
                </div>
                <div className="item">
                  <div className="label">Winning Percentage</div>
                  <span>{storeDetails?.winning_percentage}</span>
                </div>
                <div className="item">
                  <div className="label">User Referral Code</div>
                  {storeDetails?.user_referral_code ? (
                    <Paragraph copyable>{storeDetails?.user_referral_code}</Paragraph>
                  ) : (
                    "---"
                  )}
                </div>
                <div className="item">
                  <div className="label">Referral Count</div>
                  <span>{storeDetails?.referral_count}</span>
                </div>
                <div className="item">
                  <div className="label">Status</div>
                  <span>{storeDetails?.status == 0 ? "Active" : "Inactive"}</span>
                </div>
              </div>
              <div
                style={{
                  padding: 2,
                  // width: 250,
                  display: "flex",
                  gap: 10,
                }}
              >
                <Upload
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  className="upload-button"
                  loading={true}
                  showUploadList={false}
                  accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(info) => handleUploadCatalog(info)}
                >
                  <Button icon={catalogUploadLoading ? <LoadingOutlined /> : <UploadOutlined />}>Upload Catalog</Button>
                </Upload>
                <Button onClick={handleDownloadSample} type="primary" icon={<DownloadOutlined />} size={"middle"}>
                  Sample Catalog
                </Button>
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
          {isModalOpen && (
            <MyModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              fetchList={fetchFollow}
              editImageId={editImageId}
            />
          )}
        </Container>
      )}
    </>
  );
};

export default StoreDetails;
const MyModal = ({ isModalOpen, setIsModalOpen, fetchList, editImageId }) => {
  const [createLoading, setCreateLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [cropImage, setCropImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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
    const response = await apiService.updateStoreCatalogImage({
      image: cropImage,
      storeId: editImageId?.storeId,
      catalogId: editImageId?.id,
    });
    if (response?.status) {
      setCreateLoading(true);
      message.success("Image updated successfully");
      setIsModalOpen(false);
      setCropImage("");
      fetchList();
    }
  };
  const handleRemoveCard = async () => {
    setRemoveLoading(true);
    const response = await apiService.removeStoreCatalogImage({
      storeId: editImageId?.storeId,
      catalogId: editImageId?.id,
    });
    if (response?.status) {
      message.success("Image removed successfully");
      setIsModalOpen(false);
      setRemoveLoading(false);
      fetchList();
    }
  };

  return (
    <CustomModal
      title="Upload Catalog Image"
      open={isModalOpen}
      width={450}
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
          disabled={!cropImage?.length}
          loading={createLoading}
          onClick={() => {
            handleCreateCard();
          }}
        >
          {createLoading ? "Updating" : "Update"}
        </Button>,
      ]}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {selectedImage ? (
          <div style={{ margin: "8px 0px" }}>
            <ImageCropper setCropImage={setCropImage} aspect={"1"} imageFile={selectedImage} />
          </div>
        ) : (
          <img
            style={{
              width: 345,
              height: 283,
              borderRadius: 5,
            }}
            src={editImageId?.image || Empty}
          />
        )}
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
          {editImageId?.image && (
            <Button
              loading={removeLoading}
              onClick={() => handleRemoveCard()}
              style={{ marginLeft: "10px" }}
              type="primary"
              danger
            >
              Remove Image
            </Button>
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
