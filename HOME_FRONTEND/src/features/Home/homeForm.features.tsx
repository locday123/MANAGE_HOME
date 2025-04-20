import {Input, Space, Form, DatePicker, InputNumber, Select, Card, FormInstance} from "antd"
import dayjs from "dayjs"
import Home from "../../types/home.type"

import {useEffect} from "react"

const {RangePicker} = DatePicker
const {Option} = Select
type Props = {
    form: FormInstance
    isEdit?: boolean
    homeData?: Home | null
}

function HomeForm({form, isEdit = false, homeData}: Props) {
    useEffect(() => {
        if (homeData) {
            form.setFieldsValue({
                ...homeData,
                home_ContractRange: [
                    homeData.home_ContractFrom ? dayjs(homeData.home_ContractFrom) : null,
                    homeData.home_ContractTo ? dayjs(homeData.home_ContractTo) : null,
                ],
            })
        }
    }, [homeData, form])

    return (
        <Form layout='vertical' form={form} initialValues={{home_Status: "ACTIVE"}}>
            <Space direction='vertical' style={{width: "100%"}}>
                <Card title='Thông tin chủ nhà'>
                    <Form.Item
                        label='Họ và tên'
                        name='home_HostName'
                        rules={[{required: true, message: "Vui lòng nhập họ và tên"}]}
                    >
                        <Input size='large' />
                    </Form.Item>

                    <Form.Item
                        label='Căn cước công dân'
                        name='home_HostID'
                        rules={[{required: true, message: "Vui lòng nhập CCCD"}]}
                    >
                        <Input.OTP size='large' length={12} />
                    </Form.Item>

                    <Form.Item
                        label='Số điện thoại'
                        name='home_HostPhoneNumber'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại",
                                pattern: new RegExp("^(0[3|5|7|8|9])[0-9]{8}$"),
                            },
                        ]}
                    >
                        <Input.OTP size='large' length={10} />
                    </Form.Item>
                </Card>

                <Card title='Thông tin nhà thuê'>
                    <Form.Item label='Thời gian hợp đồng' name='home_ContractRange'>
                        <RangePicker
                            size='large'
                            style={{width: "100%"}}
                            format='DD/MM/YYYY'
                            allowClear
                            onChange={(dates) => {
                                form.setFieldValue("home_ContractFrom", dates?.[0] || null)
                                form.setFieldValue("home_ContractTo", dates?.[1] || null)
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Giá thuê'
                        name='home_RentalPrice'
                        rules={[{required: true, message: "Vui lòng thêm giá thuê"}]}
                    >
                        <InputNumber
                            min={0}
                            placeholder='Giá thuê'
                            size='large'
                            style={{width: "100%"}}
                            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Số tầng'
                        name='home_TotalFloors'
                        rules={[{required: true, message: "Vui lòng thêm tầng"}]}
                    >
                        <InputNumber
                            min={0}
                            placeholder='Số tầng'
                            size='large'
                            style={{width: "100%"}}
                        />
                    </Form.Item>

                    <Form.Item label='Tình trạng' name='home_Status'>
                        <Select size='large'>
                            <Option value='ACTIVE'>ACTIVE</Option>
                            <Option value='INACTIVE'>INACTIVE</Option>
                        </Select>
                    </Form.Item>
                </Card>
            </Space>
        </Form>
    )
}
export default HomeForm
