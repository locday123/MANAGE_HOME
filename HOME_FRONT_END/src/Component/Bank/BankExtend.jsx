import {Button, Col, Form, Image, Input, Row, Tag} from "antd"

const columnsTable = [
    {
        key: "bank_Code",
        title: "Mã ngân hàng",
        dataIndex: "bank_Code",
        align: "center",
    },
    {
        key: "bank_shortName",
        title: "Tên mã ngân hàng",
        dataIndex: "bank_shortName",
        render: (_, value) => (
            <>
                <Image
                    width={"100px"}
                    preview={false}
                    style={{marginRight: "10px"}}
                    size={50}
                    src={value.bank_Logo}
                />
                <Tag color='blue-inverse' style={{fontSize: "13px"}}>
                    {value.bank_shortName}
                </Tag>
            </>
        ),
    },
    {
        key: "bankName",
        title: "Tên ngân hàng",
        dataIndex: "bankName",
    },
]

const FormAddBank = () => (
    <Row gutter={(0, 20)}>
        <Col xl={9} md={24}>
            <Form.Item
                name='bankAbbreviated'
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên viết tắt!",
                    },
                ]}
            >
                <Input size='large' placeholder='Mã ngân hàng' name='bankAbbreviated' />
            </Form.Item>
        </Col>
        <Col xl={9} md={24}>
            <Form.Item
                name='bankName'
                rules={[
                    {
                        required: true,
                        message: "Vui lòng nhập tên ngân hàng!",
                    },
                ]}
            >
                <Input
                    placeholder='Tên ngân hàng'
                    size='large'
                    style={{width: "100%"}}
                    name='bankName'
                />
            </Form.Item>
        </Col>
        <Col xl={6} md={24}>
            <Button style={{width: "100%"}} type='primary' size='large' children='THÊM' />
        </Col>
    </Row>
)

export {columnsTable, FormAddBank}
