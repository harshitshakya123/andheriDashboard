import { Avatar, Button, Tag, Popover, Select, message } from "antd";
import { useEffect, useState } from "react";
import apiService from "../../services/apiServices";
import CustomTable from "../../components/CustomTable";
// import { useTranslation } from "react-i18next";
import moment from "moment";

const RolesManagement = () => {
  //   const [t] = useTranslation("global");

  const [storeList, setStoreList] = useState([]);
  const [open, setOpen] = useState(null);
  const [roles, setRoles] = useState([]);
  const [approveLoading, setApproveLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);

  useEffect(() => {
    fetchList();
  }, []);

  const storeColumns = [
    {
      title: "Profile",
      width: 20,
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
      title: "Email",
      dataIndex: "email",
      key: "2",
      width: 40,
      searchable: true,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "3",
      width: 30,
      searchable: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "6",
      width: 40,
      searchable: true,
    },
    {
      title: "Roles",
      key: "role",
      dataIndex: "role",
      width: 40,
      // searchable: true,
      render: (_, { role }) => (
        <span>
          {Array.isArray(role)
            ? role?.map((tag) => {
                let color = tag.length > 5 ? "geekblue" : "green";
                if (tag === "loser") {
                  color = "volcano";
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase() || "NA"}
                  </Tag>
                );
              })
            : "NA"}
        </span>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 30,
      render: (_, { id, status }) => {
        return (
          <div style={{ cursor: "pointer" }}>
            <Tag onClick={() => handleUpdateStatus({ id, status: !status })} color={+status ? "geekblue" : "green"}>
              {+status ? "Inactive" : "Active"}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "User Status",
      key: "role_status",
      dataIndex: "role_status",
      width: 30,
      render: (_, { role_status, id }) => {
        return (
          <Popover content={content} title="Update User Status" visible={open === id} trigger="click">
            <div style={{ cursor: role_status == 0 ? "pointer" : "auto" }}>
              <Tag
                onClick={() => {
                  role_status == 0 && setOpen(id);
                }}
                color={role_status == 0 ? "orange" : role_status == 1 ? "green" : "red"}
              >
                {role_status == 0 ? "Pending" : role_status == 1 ? "Approved" : "Rejected"}
              </Tag>
            </div>
          </Popover>
        );
      },
    },
    {
      title: "Created Date",
      dataIndex: "created_date",
      key: "6",
      width: 30,
      render: (_, { created_date }) => {
        return <div style={{ cursor: "pointer" }}>{moment(created_date).format("DD-MM-YYYY")}</div>;
      },
    },
  ];

  const content = (
    <div>
      <Select
        mode="multiple"
        size={"middle"}
        placeholder="Please select roles"
        loading={approveLoading}
        // defaultValue={["a10", "c12"]}
        onChange={(e, roles) => setSelectedRoles(roles)}
        style={{
          minWidth: 271,
          maxWidth: 271,
        }}
        options={roles?.map((item) => {
          return {
            value: item?.id,
            label: item?.role_name,
          };
        })}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingTop: 13,
        }}
      >
        <Button onClick={() => setOpen(null)}>Cancel</Button>
        <Button danger onClick={() => handleApprove("reject")} style={{ marginLeft: 5 }} type="primary">
          Reject
        </Button>
        <Button onClick={() => handleApprove("accept")} style={{ marginLeft: 5 }} type="primary">
          Approve
        </Button>
      </div>
    </div>
  );

  const handleApprove = async (type) => {
    setApproveLoading(true);
    const payload = {
      role: selectedRoles.map((item) => item.label),
      type: type,
      id: open,
    };
    const data = await apiService.approveUser(payload);
    console.log(data);
    fetchList();
    setOpen(null);
    setSelectedRoles([]);
    setApproveLoading(false);
  };

  const handleUpdateStatus = async (payload) => {
    const response = await apiService.updateUserStatusAdmin(payload);
    if (response.message) {
      message.success("User Status Updated Successfully");
      fetchList();
    }
  };

  const fetchList = async () => {
    const storeResponse = await apiService.getUsers();
    const rolesResponse = await apiService.getRoles();
    setStoreList(storeResponse?.data);
    setRoles(rolesResponse?.data);
  };

  return (
    <>
      <CustomTable
        columns={storeColumns}
        loading={!storeList?.length}
        dataList={storeList}
        // scrollX={1500}
        scrollY={"calc(100vh - 280px)"}
      />
    </>
  );
};

export default RolesManagement;
