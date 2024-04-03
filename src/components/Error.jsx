import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are access wrong page."
      extra={
        <Button onClick={() => navigate("/login")} type="primary">
          Back Home
        </Button>
      }
    />
  );
};
export default Error;
