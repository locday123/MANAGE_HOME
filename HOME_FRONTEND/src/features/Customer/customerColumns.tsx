import {ColumnsType} from "antd/es/table"
import {Dropdown, Menu, MenuProps, Popconfirm, Space, Tag} from "antd"
import {MoreOutlined, DeleteTwoTone, EditTwoTone} from "@ant-design/icons"
import Customer from "../../types/customer.type"

type GetCustomerColumnsProps = {
    onEdit: (customer: Customer) => void
    onDelete: (customer: Customer) => void
}

export const getCustomerColumns = ({
    onEdit,
    onDelete,
}: GetCustomerColumnsProps): ColumnsType<Customer> => [
    {
        title: "Mã khách hàng",
        dataIndex: "customer_ID",
        key: "customer_ID",
        fixed: "left",
    },
    {
        title: "Tên khách hàng",
        dataIndex: "customer_Name",
        key: "customer_Name",
    },
    {
        title: "Giới tính",
        dataIndex: "customer_Sex",
        key: "customer_Sex",
        render: (sex: boolean) =>
            sex ? <Tag color='blue'>Nam</Tag> : <Tag color='magenta'>Nữ</Tag>,
    },
    {
        title: "Số điện thoại",
        dataIndex: "customer_PhoneNumber",
        key: "customer_PhoneNumber",
    },
    {
        title: "Địa chỉ",
        dataIndex: "customer_Address",
        key: "customer_Address",
    },
    {
        title: "Ngày sinh",
        dataIndex: "customer_Date",
        key: "customer_Date",
        render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
        title: "Ảnh mặt trước",
        dataIndex: "customer_Front",
        key: "customer_Front",
    },
    {
        title: "Ảnh mặt sau",
        dataIndex: "customer_Back",
        key: "customer_Back",
    },
    {
        title: "Trạng thái",
        dataIndex: "customer_Status",
        key: "customer_Status",
        render: (status: Customer["customer_Status"]) => (
            <Tag color={status === "ACTIVE" ? "green" : "red"}>
                {status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"}
            </Tag>
        ),
    },
    {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
        render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
        dataIndex: "action",
        key: "action",
        fixed: "right",
        render: (_, record) => {
            const menuItems: MenuProps["items"] = [
                {
                    key: "edit",
                    label: (
                        <Space>
                            <EditTwoTone />
                            Chỉnh sửa
                        </Space>
                    ),
                    onClick: () => onEdit(record),
                },
                {
                    key: "delete",
                    label: (
                        <Popconfirm
                            title={`Bạn có chắc chắn muốn xóa khách hàng ${record.customer_Name}?`}
                            onConfirm={() => onDelete(record)} // Xử lý khi nhấn "Có"
                            onCancel={() => console.log("Xóa bị hủy")}
                            okText='Có'
                            cancelText='Không'
                        >
                            <Space>
                                <DeleteTwoTone />
                                Xóa
                            </Space>
                        </Popconfirm>
                    ),
                },
            ]
            return (
                <Dropdown
                    overlay={<Menu items={menuItems} style={{width: "100%"}} />}
                    trigger={["click"]}
                    placement='bottomLeft'
                >
                    <MoreOutlined style={{fontSize: "20px", cursor: "pointer"}} />
                </Dropdown>
            )
        },
    },
]
