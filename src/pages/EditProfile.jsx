import { Button, Collapse, Form, Image, Input, Modal, Tag, Upload, message } from "antd";
import { useEffect, useState } from "react";
import apiService from "../services/apiServices";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UploadOutlined, DeleteOutlined, ExclamationCircleFilled, LoadingOutlined } from "@ant-design/icons";
import { MAX_IMAGE_FILE_SIZE_MB, emptyImage } from "../utils/constant";
import commonService from "../services/commonServices";
import { UserProfileContext } from "../store/UserProfileStore";
// import moment from "moment";
// import dayjs from "dayjs";

const { confirm } = Modal;

const EditProfile = () => {
  const [userProfileC, dispatchUserProfile] = UserProfileContext();

  const [passLoading, setPassLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [adminData, setAdminData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    setAdminData(userProfileC?.userData);
  }, [userProfileC]);

  const handleImageUpload = (info) => {
    const file = info.file;
    setImageLoading(true);
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_IMAGE_FILE_SIZE_MB) {
        message.error(`File size exceeds ${MAX_IMAGE_FILE_SIZE_MB} MB limit`);
        return;
      }
      const reader = new FileReader();
      reader.onload = async () => {
        const data = await apiService.editUserImage({ id: adminData?.id, file, type: "admin" });
        if (data?.status) {
          message.success("Image uploaded successfully");
          setAdminData({ ...adminData, profile_picture_url: reader.result });
          localStorage.setItem("userData", JSON.stringify({ ...adminData, profile_picture_url: reader.result }));
          dispatchUserProfile({
            type: "UPDATE_IMAGE",
            payload: reader.result,
          });
        }
        setImageLoading(false);
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
            .deleteUserImage(adminData?.id, "admin")
            .then(() => {
              message.success("Image deleted successfully");
              setAdminData({ ...adminData, profile_picture_url: "" });
              dispatchUserProfile({
                type: "UPDATE_IMAGE",
                payload: "",
              });
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
  const handleResetPass = async (e) => {
    setPassLoading(true);
    const updatePayload = {
      email: adminData?.email,
      current_password: e.oldPassword,
      new_password: e.password,
    };
    const resp = await commonService.resetPassword(updatePayload);
    if (resp?.status) {
      message.success("Password updated successfully, Please login with new password !!");
      localStorage.clear();
      dispatchUserProfile({
        type: "SET_SIGNED_IN",
        payload: false,
      });
      navigate("/login");
    }
    setPassLoading(false);
  };
  const handleEdit = async () => {
    if (!isEdit) {
      setIsEdit((prev) => !prev);
      setEditData({
        fullName: adminData?.fullName,
        // address: adminData?.address,
        // dob: adminData?.dob,
      });
      return;
    }
    setEditLoading(true);
    const res = await apiService.updateAdminDetails({ ...editData });
    if (res?.success) {
      message.success("Profile updated successfully");
      setIsEdit((prev) => !prev);
      dispatchUserProfile({
        type: "EDIT_PROFILE",
        payload: editData,
      });
      localStorage.setItem("userData", JSON.stringify({ ...adminData, ...editData }));

      setEditData({});
    }

    setEditLoading(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Button style={{ marginBottom: 6 }} icon={<LeftOutlined />} type="link" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <div>
          <Button loading={editLoading} style={{ marginBottom: 6 }} type="link" onClick={() => handleEdit()}>
            {!isEdit ? "Edit" : "Save"}
          </Button>
          <Button disabled={!isEdit} style={{ marginBottom: 6 }} type="link" onClick={() => setIsEdit(false)}>
            Cancel
          </Button>
        </div>
      </div>

      <Container>
        <div className="user-details">
          <div className="image">
            <div className="image-container">
              <Image
                preview={!!adminData?.profile_picture_url?.length}
                loading={true}
                rootClassName="profile-image"
                src={adminData?.profile_picture_url || emptyImage}
              />
              <div className="image-action">
                <Upload
                  multiple={false}
                  maxCount={1}
                  beforeUpload={() => false}
                  className="upload-button"
                  showUploadList={false}
                  onChange={(info) => handleImageUpload(info)}
                >
                  <Button icon={imageLoading ? <LoadingOutlined /> : <UploadOutlined />}>
                    {adminData?.profile_picture_url ? "Edit" : "Upload"} Image
                  </Button>
                </Upload>
                {adminData?.profile_picture_url && (
                  <Button onClick={(e) => showDeleteConfirm(e)} danger icon={<DeleteOutlined />} />
                )}
              </div>
            </div>
          </div>
          <div className="right-container">
            <div className="detail">
              <div className="item">
                <div className="label">Name</div>
                <span>
                  {!isEdit ? (
                    adminData?.fullName
                  ) : (
                    <Input
                      onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
                      value={editData?.fullName}
                    />
                  )}
                </span>
              </div>
              {/* <div className="item">
                <div className="label">Address</div>
                <span>
                  {!isEdit ? (
                    adminData?.address || "---"
                  ) : (
                    <Input
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      value={editData?.address}
                    />
                  )}
                </span>
              </div> */}
              {/* <div className="item">
                <div className="label">DOB</div>
                <span>
                  {!isEdit ? (
                    adminData?.dob || "---"
                  ) : (
                    <DatePicker
                      format="DD-MM-YYYY"
                      // defaultValue={dayjs(adminData?.dob) }
                      placeholder="Select dob"
                      onChange={(e) => setEditData({ ...editData, dob: moment(e?.$d).format("DD-MM-YYYY") })}
                    />
                    // <Input onChange={(e) => setEditData({ ...editData, dob: e.target.value })} value={editData?.dob} />
                  )}
                </span>
              </div> */}
              {/* <div className="item">
                <div className="label">Email</div>
                <Paragraph copyable>{adminData?.email}</Paragraph>
              </div> */}

              {/* <div className="item">
                <div className="label">Phone Number</div>
                <span>{adminData?.phone}</span>
              </div> */}
              <div className="item">
                <div className="label">Phone Number</div>
                <span>{"+91 " + adminData?.phone}</span>
              </div>
              {/* <div className="item">
                <div className="label">Status</div>
                <span>{adminData?.status == 0 ? "Active" : "Inactive"}</span>
              </div> */}
              <div className="item">
                <div className="label">Amount</div>
                {/* <span>{adminData?.amount}</span>
                 */}
                <Tag color={"orange"}>{adminData?.amount + " Rs." || "NA"}</Tag>
              </div>
              <div className="item">
                <div className="label">Role</div>
                <span>
                  <div style={{ display: "flex" }}>
                    {/* {adminData?.role?.map((role, index) => ( */}
                    <Tag color={"green"}>{adminData?.role?.toUpperCase() || "NA"}</Tag>
                    {/* ))} */}
                  </div>
                </span>
              </div>
              <div className="item"></div>
            </div>
          </div>
        </div>
        <div>
          <Collapse
            items={[
              {
                key: "1",
                label: "Change Password",
                children: (
                  <Form
                    onFinish={(values) => handleResetPass({ ...values })}
                    name="dependencies"
                    autoComplete="off"
                    style={{ maxWidth: 600 }}
                    layout="vertical"
                  >
                    <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="New Password" name="password" rules={[{ required: true }]}>
                      <Input />
                    </Form.Item>

                    {/* Field */}
                    <Form.Item
                      label="Confirm Password"
                      name="confirmPassword"
                      dependencies={["password"]}
                      rules={[
                        {
                          required: true,
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error("The new password that you entered do not match!"));
                          },
                        }),
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item>
                      <Button loading={passLoading} type="primary" htmlType="submit" className="login-form-button">
                        Change Password
                      </Button>
                    </Form.Item>
                  </Form>
                ),
              },
            ]}
          />
        </div>
      </Container>
    </>
  );
};

export default EditProfile;

const Container = styled.div`
  // height: 500px;
  height: 75vh;
  overflow-y: auto;
  padding: 10px;

  .user-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 16px;
    border-radius: 10px;
    margin-bottom: 10px;

    .image {
      position: relative;
      .profile-image {
        display: flex;
        justify-content: center;
        align-items: center;

        // width: 200px;
        // height: 200px;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        img {
          width: 200px;
          height: 200px;
          object-fit: cover;
        }
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
