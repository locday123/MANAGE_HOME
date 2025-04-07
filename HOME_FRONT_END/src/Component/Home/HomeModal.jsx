import {
    Card,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
} from "antd";
const { RangePicker } = DatePicker;
import classnames from "classnames/bind";
import style from "../../assets/ComponentCSS/Home/HomeModal.module.scss";
const cx = classnames.bind(style);
function HomeModal() {
    return (
        <Form layout='vertical'>
            <Space direction='vertical'>
                <Card title='Thông tin chủ nhà'>
                    <Form.Item
                        label='Căn cước công dân'
                        rules={[
                            {
                                required: true,
                                message: "Please enter customer ID",
                            },
                        ]}
                    >
                        <Input.OTP size='large' length={12} />
                    </Form.Item>
                    <Form.Item
                        label='Họ và tên'
                        rules={[
                            {
                                required: true,
                                message: "Please enter customer ID",
                            },
                        ]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item
                        label='Số điện thoại'
                        rules={[
                            {
                                required: true,
                                message: "Please enter customer ID",
                            },
                        ]}
                    >
                        <Input.OTP size='large' length={10} />
                    </Form.Item>
                </Card>
                <Card title='Thông tin nhà thuê'>
                    <Form.Item label='Giá thuê nhà'>
                        <InputNumber
                            size='large'
                            style={{ width: "100%" }}
                            defaultValue={1000}
                            formatter={(value) =>
                                ` ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item label='Địa chỉ'>
                        <Space direction='vertical' style={{ width: "100%" }}>
                            <Select
                                size='large'
                                placeholder='Tỉnh - Thành phố'
                            />
                            <Select size='large' placeholder='Quận - Huyện' />
                            <Select size='large' placeholder='Phường - Xã' />
                            <Input
                                size='large'
                                placeholder='Số nhà - Tên đường'
                            />
                        </Space>
                    </Form.Item>
                    <Form.Item label='Thời gian hợp đồng'>
                        <RangePicker
                            size='large'
                            style={{ width: "100%" }}
                            format='DD/MM/YYYY'
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item label='Tình trạng'>
                        <Select size='large'>
                            <Option value='ACTIVE'>Active</Option>
                            <Option value='INACTIVE'>Inactive</Option>
                        </Select>
                    </Form.Item>
                </Card>
            </Space>
        </Form>
    );
}

export default HomeModal;
