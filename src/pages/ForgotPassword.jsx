import { Button, Form, Input, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import commonService from "../services/commonServices";
import { useNavigate } from "react-router-dom";
import Forgot from "../assets/forgot.svg";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async (values) => {
    setLoading(true);
    const data = await commonService.forgotRegister(values?.email);
    if (data?.status) {
      message.success("Sent Password Reset Link Successfully");
    }
    if (!data?.status) {
      message.error(data?.message);
    }
    setLoading(false);
  };

  return (
    <Container>
      <div className="login-form">
        <Form
          name="normal_login"
          className="my-login-form"
          initialValues={{
            remember: false,
          }}
          onFinish={(values) => handleForgot({ ...values })}
        >
          <h1 style={{ textAlign: "center" }}>Forgot Password</h1>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
              Reset Password
            </Button>
            <a className="login-form-forgot" onClick={() => navigate("/login")}>
              Sign In
            </a>
          </Form.Item>
        </Form>
        <img
          src={Forgot}
          alt="login"
          style={{
            height: "300px",
            width: "300px",
          }}
        />
      </div>
    </Container>
  );
};
export default ForgotPassword;

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
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: space-between;
  }
`;
