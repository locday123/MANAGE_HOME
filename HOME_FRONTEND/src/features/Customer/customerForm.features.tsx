import {
    Form,
    Input,
    Select,
    DatePicker,
    Upload,
    Button,
    Row,
    Col,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { FormInstance } from "antd/es/form";
import type Customer from "../../types/customer.type";
import { UploadOutlined } from "@ant-design/icons";

const apiUrl = import.meta.env.VITE_REACT_URL;
const { Option } = Select;

type Props = {
    form: FormInstance;
    isEdit?: boolean;
    customerData?: Customer | null;
};

export default function CustomerForm({
    form,
    isEdit = false,
    customerData,
}: Props) {
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [backImage, setBackImage] = useState<string | null>(null);

    useEffect(() => {
        if (customerData) {
            form.setFieldsValue({
                ...customerData,
                customer_Date: customerData.customer_Date
                    ? dayjs(customerData.customer_Date, "YYYY-MM-DD")
                    : null,
            });
            setFrontImage(customerData.customer_Front); // Giả sử customer_Front chứa URL ảnh mặt trước
            setBackImage(customerData.customer_Back); // Giả sử customer_Back chứa URL ảnh mặt sau
        }
    }, [customerData, form]);

    const handleUploadChange = (info: any, type: "front" | "back") => {
        const file = info.file.originFileObj || info.file;

        const reader = new FileReader();
        reader.onload = () => {
            const imageUrl = reader.result as string;
            if (type === "front") {
                setFrontImage(imageUrl);
                form.setFieldValue("customer_Front", file); // GÁN file thật
            } else {
                setBackImage(imageUrl);
                form.setFieldValue("customer_Back", file); // GÁN file thật
            }
        };

        if (file) reader.readAsDataURL(file);
    };

    const handlePreviewFile = (file: Blob | File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <Form
            layout='vertical'
            form={form}
            initialValues={{ customer_Status: "ACTIVE" }}
        >
            <Form.Item
                label='Căn cước công dân'
                name='customer_ID'
                rules={[{ required: true, message: "Vui lòng nhập CCCD" }]}
            >
                <Input.OTP length={12} size='large' disabled={isEdit} />
            </Form.Item>

            <Form.Item label='Hình ảnh CCCD'>
                <Row gutter={16} justify='center'>
                    <Col span={12} style={{ textAlign: "center" }}>
                        <Form.Item
                            label='Ảnh mặt trước'
                            name='customer_Front'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng tải lên ảnh mặt trước",
                                },
                            ]}
                        >
                            <Upload
                                name='customer_Front'
                                listType='picture-card'
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    // Lưu tệp vào form
                                    form.setFieldValue("customer_Front", file);
                                    return false; // Ngăn việc tải lên tự động
                                }}
                                onChange={(info) =>
                                    handleUploadChange(info, "front")
                                }
                                previewFile={handlePreviewFile}
                            >
                                {frontImage ? (
                                    <img
                                        src={
                                            typeof frontImage === "string" &&
                                            frontImage.startsWith("data:")
                                                ? frontImage
                                                : `${apiUrl}${frontImage}`
                                        }
                                        alt='Ảnh mặt trước'
                                        width={100}
                                    />
                                ) : (
                                    <Button icon={<UploadOutlined />}>
                                        Tải lên ảnh mặt trước
                                    </Button>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ textAlign: "center" }}>
                        <Form.Item
                            label='Ảnh mặt sau'
                            name='customer_Back'
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng tải lên ảnh mặt sau",
                                },
                            ]}
                        >
                            <Upload
                                name='customer_Back'
                                listType='picture-card'
                                showUploadList={false}
                                beforeUpload={(file) => {
                                    // Lưu tệp vào form
                                    form.setFieldValue("customer_Back", file);
                                    return false; // Ngăn việc tải lên tự động
                                }}
                                onChange={(info) =>
                                    handleUploadChange(info, "back")
                                }
                                previewFile={handlePreviewFile}
                            >
                                {backImage ? (
                                    <img
                                        src={
                                            typeof backImage === "string" &&
                                            backImage.startsWith("data:")
                                                ? backImage
                                                : `${apiUrl}${backImage}`
                                        }
                                        alt='Ảnh mặt sau'
                                        width={100}
                                    />
                                ) : (
                                    <Button icon={<UploadOutlined />}>
                                        Tải lên ảnh mặt sau
                                    </Button>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form.Item>

            <Form.Item
                label='Họ tên'
                name='customer_Name'
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
                <Input size='large' />
            </Form.Item>

            <Form.Item
                label='Giới tính'
                name='customer_Sex'
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
                <Select size='large' placeholder='Chọn giới tính'>
                    <Option value={true}>Nam</Option>
                    <Option value={false}>Nữ</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label='Số điện thoại'
                name='customer_PhoneNumber'
                rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
            >
                <Input.OTP length={10} size='large' />
            </Form.Item>

            <Form.Item
                label='Ngày sinh'
                name='customer_Date'
                rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
                <DatePicker
                    size='large'
                    format='DD/MM/YYYY'
                    style={{ width: "100%" }}
                />
            </Form.Item>

            <Form.Item label='Tình trạng' name='customer_Status'>
                <Select size='large'>
                    <Option value='ACTIVE'>Đang hoạt động</Option>
                    <Option value='INACTIVE'>Ngừng hoạt động</Option>
                </Select>
            </Form.Item>
        </Form>
    );
}
