import {
    Avatar,
    Button,
    Flex,
    Form,
    Col,
    Input,
    Space,
    Upload,
    Row,
    DatePicker,
} from "antd";
import { UserOutlined, UploadOutlined, LockOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const dateFormatList = ["DD/MM/YYYY"];

function CustomerInfo() {
    return (
        <div className='infoUpload'>
            <Form>
                <Form.Item>
                    <Flex align='center'>
                        <Avatar
                            size={60}
                            icon={<UserOutlined />}
                            style={{ marginRight: "16px" }}
                        />
                        <div
                            style={{
                                flex: "1 1 0%",
                                fontSize: "12px",
                                color: "rgb(107, 114, 128)",
                            }}
                        >
                            <Space>
                                <Upload>
                                    <Button type='primary'>Upload</Button>
                                </Upload>
                                <Button htmlType='reset'>Reset</Button>
                            </Space>
                            <p
                                style={{
                                    marginBottom: "0px",
                                    marginTop: "5px",
                                }}
                            >
                                Allowed JPG, GIF or PNG. Max size of 800kB
                            </p>
                        </div>
                    </Flex>
                </Form.Item>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name='fullname'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập họ và tên!",
                                },
                            ]}
                        >
                            <Input size='large' placeholder='Họ và tên' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name='phone-number'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập số điện thoại!",
                                },
                            ]}
                        >
                            <Input
                                size='large'
                                type='phone'
                                placeholder='Số điện thoại'
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập Email!",
                                },
                            ]}
                        >
                            <Input
                                type='email'
                                size='large'
                                placeholder='Email'
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name='dia-chi'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập địa chỉ!",
                                },
                            ]}
                        >
                            <Input
                                size='large'
                                type='text'
                                placeholder='Địa chỉ'
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item
                            name='date'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng chọn ngày sinh!",
                                },
                            ]}
                        >
                            <DatePicker
                                size='large'
                                defaultValue={dayjs(
                                    "01/01/2015",
                                    dateFormatList[0]
                                )}
                                format={dateFormatList}
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default CustomerInfo;
