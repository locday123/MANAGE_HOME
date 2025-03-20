import {Button, Col, Form, Input, Row, Space} from "antd"
import {EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons"

function ChangPassword() {
    return (
        <div>
            <h3
                style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    marginBottom: "16px",
                    marginTop: "0px",
                }}
            >
                THAY ĐỔI MẬT KHẨU
            </h3>

            <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                <Col xs={24} md={12}>
                    <Form.Item>
                        <Input.Password
                            size='large'
                            placeholder='Nhập mật khẩu cũ'
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item>
                        <Input.Password
                            size='large'
                            placeholder='Nhập mật khẩu mới'
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item>
                        <Input.Password
                            size='large'
                            placeholder='Nhập lại mật khẩu mới'
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name='button-submit'>
                        <Space>
                            <Button type='primary' size='large' htmlType='submit'>
                                Submit
                            </Button>
                            <Button size='large'>Reset</Button>
                        </Space>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default ChangPassword
