import { Button, Form, Input, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useState } from "react";
import commonService from "../services/commonServices";
import { useNavigate } from "react-router-dom";
import { UserProfileContext } from "../store/UserProfileStore";
import LoginImage from "../assets/login-image.svg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [, dispatchUserProfile] = UserProfileContext();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    values.user_type = 1;
    setLoading(true);
    const data = await commonService.login(values);
    if (data?.token?.length) {
      dispatchUserProfile({
        type: "ADD_USER_DATA",
        payload: data?.data[0],
      });
      localStorage.setItem("token", JSON.stringify(data?.token));
      localStorage.setItem("userData", JSON.stringify(data?.data[0]));
      navigate("/sidebar/dashboard");
      message.success("User Login Successfully");
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
          onFinish={(values) => handleLogin({ ...values })}
        >
          <h1 style={{ textAlign: "center" }}>Login</h1>
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
            />
          </Form.Item>
          <Form.Item>
            {/* <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item> */}
            <a className="login-form-forgot" onClick={() => navigate("/forgot")}>
              Forgot Password
            </a>

            <a className="login-form-forgot" onClick={() => navigate("/register")}>
              Sign Up
            </a>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
        <img
          src={LoginImage}
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
export default Login;

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
