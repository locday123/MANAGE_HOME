import {Card, Col, Input, Row, Table, Tag} from "antd"
import {useEffect, useState} from "react"

import {getAllRevExpenditure} from "../../Service/RevenueExpenditure/RevenueExpenditureService"

const FormSearch = () => {
    return (
        <Row gutter={8}>
            <Col span={8}>
                <Input width={"100%"} placeholder='Tìm kiếm: Code | Tên ngắn | Tên ngân hàng' />
            </Col>
        </Row>
    )
}

const columns = [
    {
        key: "revenueExpenditure_ID",
        title: "Mã thu chi",
        dataIndex: "revenueExpenditure_ID",
        align: "center",
        width: "7rem",
        fixed: "left",
    },
    {
        key: "revenueExpenditure_Form",
        title: "Hình thức",
        dataIndex: "revenueExpenditure_Form",
        align: "center",
        width: "7rem",
    },
    {
        key: "revenueExpenditure_Method",
        title: "Phương thức",
        dataIndex: "revenueExpenditure_Method",
        align: "center",
        width: "8rem",
    },
    {
        key: "revenueExpenditureType_ID",
        title: "Loại",
        dataIndex: "revenueExpenditureType_ID",
        align: "center",
        width: "10rem",
    },
    {
        key: "revenueExpenditure_Content",
        title: "Nội dung",
        dataIndex: "revenueExpenditure_Content",
        width: "17rem",
    },
    {
        key: "payment_ScheduleID",
        title: "Hợp đồng",
        dataIndex: "payment_ScheduleID",
        align: "center",
        width: "12rem",
        render: (value) => <Tag color='#2179fc'>{value}</Tag>,
    },
    {
        key: "bank_AccountID",
        title: "Tài khoản",
        dataIndex: "bank_AccountID",
        align: "center",
        width: "9rem",
        render: (value) => <Tag color='#3c5a97'>{value}</Tag>,
    },
    {
        key: "amountReceived_Amount",
        title: "Số tiền",
        dataIndex: "amountReceived_Amount",
        align: "center",
        width: "10rem",
        render: (value) => <b>{value.toLocaleString("vi")}</b>,
    },
    {
        key: "date_Add",
        title: "Ngày",
        dataIndex: "date_Add",
        align: "center",
        width: "10rem",
    },
    {
        key: "action",
        title: "Action",
        dataIndex: "action",
        align: "center",
        width: "10rem",
        fixed: "right",
    },
]
function RevenueExpenditure() {
    const [revExpenditure, setRevExpenditure] = useState([])

    useEffect(() => {
        getAllRevExpenditure().then((value) => {
            setRevExpenditure(value)
        })
    }, [revExpenditure != null])
    return (
        <Card title={<FormSearch />}>
            <Table
                scroll={{
                    x: "max-content",
                }}
                dataSource={revExpenditure}
                pagination={{position: ["bottomRight"]}}
                columns={columns}
            />
        </Card>
    )
}

export default RevenueExpenditure
