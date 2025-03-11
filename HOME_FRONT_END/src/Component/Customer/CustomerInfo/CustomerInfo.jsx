import {Avatar, Button, Flex, Form, Col, Input, Space, Upload, Row, DatePicker} from "antd"
import {UserOutlined, UploadOutlined, LockOutlined} from "@ant-design/icons"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import {CustomerInfo_Data} from "../../../assets/ExtendedData"
dayjs.extend(customParseFormat)

const dateFormatList = ["DD/MM/YYYY"]

function CustomerInfo() {
    return (
        <div className='infoUpload'>
            <Form>
                <Form.Item>
                    <Flex align='center'>
                        <Avatar size={60} icon={<UserOutlined />} style={{marginRight: "16px"}} />
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
                <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
                    {CustomerInfo_Data.map((value) => (
                        <Col xs={24} md={12}>
                            <Form.Item
                                name={value.nameInput}
                                rules={[
                                    {
                                        required: value.required,
                                        message: value.message,
                                    },
                                ]}
                            >
                                <Input
                                    size='large'
                                    name={value.nameInput}
                                    placeholder={value.placehoder}
                                />
                            </Form.Item>
                        </Col>
                    ))}
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
                                showToday={true}
                                format={dateFormatList}
                                style={{
                                    width: "100%",
                                }}
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
            </Form>
        </div>
    )
}

export default CustomerInfo
