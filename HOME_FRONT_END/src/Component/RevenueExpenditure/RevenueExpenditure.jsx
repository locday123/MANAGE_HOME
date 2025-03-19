import {Card, Col, Input, Row, Table, Tag} from "antd"
import {useEffect, useState} from "react"
import {CloseCircleOutlined} from "@ant-design/icons"
import {getAllRevExpenditure} from "../../Service/RevenueExpenditure/RevenueExpenditureService"

const FormSearch = () => {
    return (
        <Col span={5}>
            <Input width={"100%"} placeholder='Tìm kiếm: Code | Tên ngắn | Tên ngân hàng' />
        </Col>
    )
}

function RevenueExpenditure({value}) {
    const [revExpenditure, setRevExpenditure] = useState([])
    const [filter, setFilter] = useState([])

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
            key: "revenueExpenditureType_ID",
            title: "Loại",
            dataIndex: "revenueExpenditureType_ID",
            align: "center",
            width: "10rem",
        },
        {
            key: "revenueExpenditure_Method",
            title: "Phương thức",
            dataIndex: "revenueExpenditure_Method",
            align: "center",
            width: "10rem",
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
            filterSearch: true,
            filteredValue: [value ? value : ""],
            onFilter: (value, record) => {
                console.log(filter)

                return record.bank_AccountID.includes(value)
            },
            render: (value) => <Tag color='#3c5a97'>{value}</Tag>,
        },
        {
            key: "THU",
            title: "Thu",
            dataIndex: "THU",
            align: "center",
            width: "10rem",
            render: (_, value) => (
                <b>
                    {value.revenueExpenditure_Form === "THU"
                        ? Number(value.amountReceived_Amount).toLocaleString("vi")
                        : 0}
                </b>
            ),
        },
        {
            key: "CHI",
            title: "Chi",
            dataIndex: "CHI",
            align: "center",
            width: "10rem",
            render: (_, value) => (
                <b>
                    {value.revenueExpenditure_Form === "CHI"
                        ? Number(value.amountReceived_Amount).toLocaleString("vi")
                        : 0}
                </b>
            ),
        },
        {
            key: "revenueExpenditure_Content",
            title: "Ghi chú",
            dataIndex: "revenueExpenditure_Content",
            width: "12rem",
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
    useEffect(() => {
        getAllRevExpenditure().then((value) => {
            setRevExpenditure(value)
        })
    }, [revExpenditure != null])

    return (
        <Card
            title={
                <>
                    <Row gutter={8}>
                        <FormSearch />
                        {value.length ? (
                            <Col
                                style={{
                                    alignContent: "center",
                                    border: "1px solid #d9d9d9",
                                    borderRadius: "5px",
                                }}
                            >
                                Lọc theo: <Tag closeIcon={<CloseCircleOutlined />}>{"abc"}</Tag>
                            </Col>
                        ) : null}
                    </Row>
                </>
            }
        >
            <Table
                onChange={() => setFilter(value)}
                scroll={{
                    x: "max-content",
                    y: 80 * 5,
                }}
                dataSource={revExpenditure}
                columns={columns}
                pagination={false}
                summary={(pagedata) => {
                    let totalThu = 0
                    let totalChi = 0
                    pagedata.forEach(({amountReceived_Amount, revenueExpenditure_Form}) => {
                        totalThu +=
                            revenueExpenditure_Form === "THU" ? Number(amountReceived_Amount) : 0
                        totalChi +=
                            revenueExpenditure_Form === "CHI" ? Number(amountReceived_Amount) : 0
                    })
                    return (
                        <Table.Summary fixed={"bottom"}>
                            <Table.Summary.Cell index={0} align='center'>
                                <b style={{fontSize: "17px"}}>TỔNG</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={1}></Table.Summary.Cell>
                            <Table.Summary.Cell index={2}></Table.Summary.Cell>
                            <Table.Summary.Cell index={4}></Table.Summary.Cell>
                            <Table.Summary.Cell index={5}></Table.Summary.Cell>
                            <Table.Summary.Cell index={6} align='center'>
                                <b style={{fontSize: "17px"}}>{totalThu.toLocaleString("vi")}</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={7} align='center'>
                                <b style={{fontSize: "17px"}}>{totalChi.toLocaleString("vi")}</b>
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={5} align='center'></Table.Summary.Cell>
                        </Table.Summary>
                    )
                }}
            />
        </Card>
    )
}

export default RevenueExpenditure
