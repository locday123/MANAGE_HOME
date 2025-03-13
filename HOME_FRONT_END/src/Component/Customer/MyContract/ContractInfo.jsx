import { Button, Card, Col, Collapse, Row, Table, Tag } from "antd";

const ContractInfo = (info) => {
    return (
        <Row gutter={40} style={{ rowGap: "10px" }}>
            {info.map((value, key) => (
                <Col xs={24} md={12} xl={12} xxl={8} key={key}>
                    <Tag color='#108ee9' bordered style={{ fontSize: "16px" }}>
                        {value.label}
                    </Tag>
                    {value.name}
                </Col>
            ))}
        </Row>
    );
};

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
            ((value.newIndex - value.oldIndex) * value.price).toLocaleString(
                "vi"
            ),
    },
];

const ExpensesTable = (children) => {
    console.log(children.bill_Detail);
    return (
        <Table
            pagination={false}
            dataSource={children.bill_Detail}
            columns={ExpensesColumn}
            summary={(pagedata) => {
                let total = 0;
                pagedata.forEach(({ oldIndex, newIndex, price }) => {
                    total += (newIndex - oldIndex) * price;
                });

                return (
                    <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>
                            <b>TỔNG TIỀN</b>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={1}></Table.Summary.Cell>
                        <Table.Summary.Cell index={2}></Table.Summary.Cell>
                        <Table.Summary.Cell index={4}></Table.Summary.Cell>
                        <Table.Summary.Cell
                            index={5}
                            align='center'
                            colSpan={5}
                        >
                            <b>{total.toLocaleString("vi")}</b>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                );
            }}
        />
    );
};

export { ContractInfo, ExpensesTable };
