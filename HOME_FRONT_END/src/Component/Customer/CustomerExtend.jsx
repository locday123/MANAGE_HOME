import {Input, Button, Tag, Space, Col} from "antd"
import {SearchOutlined} from "@ant-design/icons"

const columnsTable = [
    {
        key: "customer_ID",
        title: "CCCD | ID",
        dataIndex: "customer_ID",
        align: "center",
        width: "1rem",
        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "customer_Name",
        title: "Tên khách hàng",
        dataIndex: "customer_Name",
        width: "12rem",
    },
    {
        key: "customer_PhoneNumber",
        title: "Số điện thoại",
        dataIndex: "customer_PhoneNumber",
        align: "center",
        width: "9rem",
    },
    {
        key: "customer_Address",
        title: "Địa chỉ",
        dataIndex: "customer_Address",
        width: "12rem",
    },
    {
        key: "customer_Date",
        title: "Ngày sinh",
        dataIndex: "customer_Date",
        align: "center",
        width: "6rem",
    },
    {
        key: "customer_Status",
        title: "Trạng thái",
        dataIndex: "customer_Status",
        align: "center",
        width: "8rem",
        render: (value) => <Tag color='success'>{value ? "Đang hoạt động" : "Dừng hoạt động"}</Tag>,
    },
    {
        key: "date_Add",
        title: "Ngày",
        dataIndex: "date_Add",
        align: "center",
        width: "6rem",
    },
]

const SearchBar = ({searchText, setSearchText}) => {
    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }

    return (
        <Col span={8}>
            <Input
                value={searchText}
                placeholder='Tìm kiếm tên khách hàng | ID'
                onChange={handleSearch}
                style={{width: "100%", marginBottom: 8, display: "block"}}
            />
        </Col>
    )
}

export {columnsTable, SearchBar}
