import { Button, Form, Input, Select, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import commonService from "../services/commonServices";
import { useNavigate } from "react-router-dom";
import RegisterImage from "../assets/Register.svg";

const { Option } = Select;
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    const payload = {
      fullName: values?.fullName,
      phone: values?.phone,
      password: values?.password,
    };
    const data = await commonService.adminRegister(payload);
    if (data?.success) {
      navigate("/login");
      message.success("Register Successfully!!");
    }

    if (!data?.success) {
      message.error(data?.message);
    }
    setLoading(false);
  };
  const prefixSelector = (
    <Form.Item name="prefix" initialValue="+81" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+81">+91</Option>
        {/* <Option value="+01">+01</Option> */}
      </Select>
    </Form.Item>
  );

  return (
    <Container>
      <div className="login-form">
        <Form
          name="normal_login"
          className="my-login-form"
          initialValues={{
            remember: false,
          }}
          onFinish={(values) => handleRegister({ ...values })}
        >
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <Form.Item
            name="fullName"
            id="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              type="text"
              autoComplete="off"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
              {
                max: 10,
                min: 10,
                message: "Phone number must not exceed 10 characters!",
              },
            ]}
          >
            <Input
              type="number"
              addonBefore={prefixSelector}
              placeholder="Contact Number"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
              Sign Up
            </Button>
            OR <a onClick={() => navigate("/login")}>Already Sign Up</a>
          </Form.Item>
        </Form>
        <img
          src={RegisterImage}
          alt="login"
          style={{
            height: 400,
            width: 350,
          }}
        />
      </div>
    </Container>
  );
};
export default Register;

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;

  .login-form {
    display: flex;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    padding: 20px 50px;
    border-radius: 10px;
  }
  .my-login-form {
    width: 400px;
    margin-right: 20px;
    align-items: center;
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
  }
`;
