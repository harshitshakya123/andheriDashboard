import { useState } from "react";
import { Table, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const CustomTable = ({
  columns,
  dataList,
  loading,
  scrollX,
  scrollY,
  // leftDisabled = true,
  // leftPagination,
  // RightDisabled = true,
  // rightPagination,
  // pagination = false,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // let searchInputRef;

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(selectedKeys, dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          // ref={(node) => {
          //   searchInputRef = node;
          // }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button size="small" style={{ width: 90 }} onClick={() => handleReset(clearFilters)}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const modifiedColumns = columns.map((col) => {
    if (col.searchable) {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      };
    }
    return col;
  });
  const sorter = (a, b) => {
    console.log("params", sorter);
    return new Date(a.date) - new Date(b.date);
  };

  return (
    <>
      <Table
        columns={modifiedColumns}
        loading={loading}
        sorter={sorter}
        dataSource={dataList}
        rowKey={(record) => record.uuid}
        scroll={{
          x: scrollX,
          y: scrollY,
        }}
        // pagination={{
        //   onChange: (e) => console.log(e),
        //   pageSize: 10,
        //   total: 20,
        // }}
        pagination={true}
      />
      {/* {pagination && (
        <div
          style={{
            cursor: "pointer",
            padding: 8,
            display: "flex",
            gap: 5,
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={leftPagination}
            disabled={leftDisabled}
            type="primary"
            icon={<LeftOutlined style={{ fontSize: 20 }} />}
          >
            Left
          </Button>
          <Button
            onClick={rightPagination}
            disabled={RightDisabled}
            type="primary"
            icon={<RightOutlined style={{ fontSize: 20 }} />}
          >
            Right
          </Button>
        </div>
      )} */}
    </>
  );
};

export default CustomTable;
