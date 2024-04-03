import { Card } from "antd";
import React from "react";
import placeholder from "../assets/placeholder.png";
// import placeholder from "../assets/";

const CustomCard = ({ imageUrl, isDelete, callback, name }) => {
  return (
    <Badge.Ribbon text={item?.is_active ? "Active" : "In Active"} color={item?.is_active ? "Green" : "red"}>
      <Card
        onClick={() => callback()}
        hoverable
        style={{ width: 250 }}
        cover={
          <img
            style={{
              height: 200,
              objectFit: "fill",
            }}
            alt="example"
            src={imageUrl || placeholder}
          />
        }
      >
        <div className="game-config">
          <div className="game-name">{name || "NA"}</div>
          <div className="game-detail">
            <span>Max Budget: </span>
            <span>{item?.max_campaign_budget}</span>
          </div>
          <div className="game-detail">
            <span>Max Cashback: </span>
            <span>{item?.max_cashback}</span>
          </div>
          <div className="game-detail">
            <span>
              {moment(item?.start_date, "DD/MM/YYYY").format("DD-MM-YYYY")} -{" "}
              {moment(item?.end_date, "DD/MM/YYYY").format("DD-MM-YYYY")}
            </span>
          </div>
          {isDelete && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                paddingTop: 5,
              }}
            >
              <Button type="primary" danger onClick={(e) => showDeleteConfirm(e, { ...item })}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default CustomCard;
