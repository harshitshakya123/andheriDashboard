import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserProfileContext } from "../store/UserProfileStore";
import { useTranslation } from "react-i18next";
// import US from "../assets/us.jpg";
// import JP from "../assets/japan.png";
import { constantColor } from "../utils/constant";
import apiService from "../services/apiServices";
import logo from "../assets/andheriLogo.jpeg";
const Header = () => {
  const navigate = useNavigate();
  const [userProfileC, dispatchUserProfile] = UserProfileContext();
  const [t] = useTranslation("global");

  // const handleChangeLang = (lang) => {
  //   i18n.changeLanguage(lang?.key);
  //   localStorage.setItem("lang", lang?.key);
  // };

  const profileDropdown = [
    {
      key: "1",
      label: (
        <a onClick={() => navigate("/editProfile")} rel="noopener noreferrer">
          {t("header.editProfile")}
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          rel="noopener noreferrer"
          onClick={async () => {
            await apiService.logout();
            localStorage.clear();
            dispatchUserProfile({
              type: "SET_SIGNED_IN",
              payload: false,
            });
            navigate("/login");
          }}
        >
          {t("header.signOut")}
        </a>
      ),
    },
  ];

  // const languages = [
  //   {
  //     key: "en",
  //     icon: <Avatar src={US} size={23} gap={4} shape="square" />,
  //     onClick: handleChangeLang,
  //   },
  //   {
  //     key: "jp",
  //     icon: <Avatar src={JP} size={23} gap={4} shape="square" />,
  //     onClick: handleChangeLang,
  //   },
  // ];
  const colorSelector = Object.keys(constantColor).map((key) => {
    return {
      key: key,
      icon: <div style={{ width: 23, height: 23, background: constantColor[key], borderRadius: "50%" }} />,
      onClick: () => handleTheme(constantColor[key]),
    };
  });

  const handleTheme = (color) => {
    dispatchUserProfile({
      type: "SET_THEME",
      payload: color,
    });
  };

  return (
    <Container>
      <div className="logo">
        <img src={logo} style={{ width: "51px", borderRadius: "50%", marginRight: "10px" }} />
        Andheri
      </div>

      <div className="right-menu">
        <div className="color-picker">
          <Dropdown
            menu={{
              items: colorSelector,
            }}
            placement="bottom"
            arrow
            trigger={["click"]}
          >
            <div
              style={{ width: 23, height: 23, background: userProfileC?.theme, borderRadius: "50%", marginTop: "5px" }}
            />
          </Dropdown>
        </div>
        {/* <div>
          <Dropdown
            menu={{
              items: languages,
            }}
            placement="bottom"
            arrow
            trigger={["click"]}
            // onClick={handleChangeLang}
          >
            <Avatar
              style={{
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                cursor: "pointer",
              }}
              src={i18n?.language === "en" ? US : JP}
              size="small"
              gap={4}
              shape="square"
            />
          </Dropdown>
        </div> */}
        <Dropdown
          menu={{
            items: profileDropdown,
          }}
          //   placement="bottom"
          trigger={["click"]}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              padding: "0 25px",
              minWidth: "200px",
            }}
          >
            <Avatar
              style={{
                // backgroundColor: "#f56a00",
                verticalAlign: "middle",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              }}
              src={
                userProfileC?.userData?.profile_picture_url?.trim()?.length
                  ? userProfileC?.userData?.profile_picture_url
                  : "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1"
              }
              size="large"
              gap={4}
            >
              {userProfileC?.userData?.fullName?.charAt(0).toUpperCase()}
            </Avatar>
            <div
              style={{
                paddingLeft: 10,
                lineHeight: "19px",
                minWidth: 122,
                maxWidth: 122,
              }}
            >
              <span
                style={{
                  color: "rgb(69, 85, 96)",
                  fontWeight: 500,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {userProfileC?.userData?.fullName}
              </span>
              <div
                style={{
                  fontSize: 13,
                }}
              >
                {userProfileC?.userData?.role?.toUpperCase()}
              </div>
            </div>
          </div>
        </Dropdown>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  .logo {
    cursor: pointer;
  }
  position: fixed;
  width: 100%;
  left: 0px;
  z-index: 1000;
  display: flex;
  justify-content: space-between;

  flex: 0 0 auto;
  height: 70px;
  line-height: 70px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 4px -1px;

  .logo {
    height: 70px;
    width: 250px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 1rem;
    background-color: transparent;
    // border: 1px solid red;

    font-weight: 600;
    font-size: 24px;
  }

  .right-menu {
    display: flex;
    .color-picker {
      margin: auto;
      padding-right: 7px;
      cursor: pointer;
    }
  }
`;
