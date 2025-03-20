import {Button, Card, Col, Image, Row, Table, Tag} from "antd"
import {TransactionOutlined, FileTextFilled, PrinterFilled} from "@ant-design/icons"

const ContractInfo = (info) => (
    <Row gutter={40} style={{rowGap: "10px"}}>
        {info.map((value, key) => (
            <Col xs={24} md={12} xl={12} xxl={8} key={key}>
                <Tag color='#108ee9' bordered style={{fontSize: "13px"}}>
                    {value.label}
                </Tag>
                {value.name.toLocaleString("vi")}
            </Col>
        ))}
    </Row>
)

const ExpensesColumn = [
    {
        title: "Chi phí",
        dataIndex: "Expenses",
        key: "expenses",
    },
    {
        title: "Chỉ số cũ",
        dataIndex: "oldIndex",
        key: "oldIndex",
        align: "center",
    },
    {
        title: "Chỉ số mới",
        dataIndex: "newIndex",
        key: "newIndex",
        align: "center",
    },
    {
        title: "Giá tiền",
        dataIndex: "price",
        key: "price",
        align: "center",
        render: (value) => value.toLocaleString("vi"),
    },
    {
        title: "Tổng tiền",
        dataIndex: "total",
        key: "total",
        align: "center",
        render: (_, value) =>
            ((value.newIndex - value.oldIndex) * value.price).toLocaleString("vi"),
    },
]

const actions = (children) => [
    !children.statusBill ? (
        <Button
            type='span'
            color='primary'
            iconPosition={"start"}
            icon={<TransactionOutlined />}
            key='pay'
            children='Thanh toán'
        />
    ) : (
        <Button
            type='span'
            color='primary'
            iconPosition={"start"}
            icon={<TransactionOutlined />}
            key='pay'
            children='Đã thanh toán'
        />
    ),
    <Button
        type='span'
        color='primary'
        iconPosition={"start"}
        icon={<PrinterFilled />}
        key='print'
        children='In hóa đơn'
    />,
    <Button
        type='span'
        color='primary'
        iconPosition={"start"}
        icon={<FileTextFilled />}
        key='edit'
        children='Khiếu nại'
    />,
]

const ExpensesTable = (children) => (
    <Card bordered={false} actions={actions(children)}>
        <Table
            pagination={false}
            dataSource={children.bill_Detail}
            columns={ExpensesColumn}
            scroll={{
                x: "max-content",
            }}
            summary={(pagedata) => {
                let total = 0
                pagedata.forEach(({oldIndex, newIndex, price}) => {
                    total += (newIndex - oldIndex) * price
                })

                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                            <b>QUÉT QR để thanh toán</b>
                            <Image
                                width={"100px"}
                                style={{marginRight: "10px"}}
                                size={50}
                                src={
                                    " https://api.vietqr.io/image/970415-106867126672-gQtdFNb.jpg?accountName=HOANG%20XUAN%20LOC&amount=" +
                                    total +
                                    "&addInfo=HDTN%20" +
                                    "abc"
                                }
                            />
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        <Table.Summary.Cell index={5} align='center'>
                            <b>{total.toLocaleString("vi")}</b>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )
            }}
        />
    </Card>
)

export {ContractInfo, ExpensesTable}
