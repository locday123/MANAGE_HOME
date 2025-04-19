import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, MenuProps, Popconfirm, Space, Tag } from "antd";
import { MoreOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import Home from "../../types/home.type";

type GetHomeColumnsProps = {
    onEdit: (home: Home) => void;
    onDelete: (home: Home) => void;
};

export const getHomesColumns = ({
    onEdit,
    onDelete,
}: GetHomeColumnsProps): ColumnsType<Home> => [
    {
        title: "Mã nhà",
        dataIndex: "home_ID",
        key: "home_ID",
        fixed: "left",
        align: "center",
    },
    {
        title: "Địa chỉ",
        dataIndex: "home_Address",
        key: "home_Address",
        align: "left",
    },
    {
        title: "Giá thuê",
        dataIndex: "home_RentalPrice",
        key: "home_RentalPrice",
        align: "center",
        render: (price: bigint | null | undefined) =>
            price
                ? `${Number(price).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                  })}`
                : 0,
    },
    {
        title: "Mã chủ nhà",
        dataIndex: "home_HostID",
        key: "home_HostID",
        align: "center",
    },
    {
        title: "Tên chủ nhà",
        dataIndex: "home_HostName",
        key: "home_HostName",
        align: "left",
    },
    {
        title: "SĐT chủ nhà",
        dataIndex: "home_HostPhoneNumber",
        key: "home_HostPhoneNumber",
        align: "center",
    },
    {
        key: "contract",
        title: "Hợp đồng đến",
        dataIndex: "contract",
        align: "center",
        width: "12rem",
        render: (_, value) =>
            new Date(value.home_ContractFrom).toLocaleDateString("vi") +
            " - " +
            new Date(value.home_ContractTo).toLocaleDateString("vi"),
    },
    {
        title: "Chữ ký",
        dataIndex: "home_HostSignature",
        key: "home_HostSignature",
        align: "center",
    },
    {
        title: "Tầng tối đa",
        dataIndex: "home_TotalFloors",
        key: "home_TotalFloors",
        align: "center",
    },
    {
        title: "Trạng thái",
        dataIndex: "home_Status",
        key: "home_Status",
        align: "center",
        render: (status: Home["home_Status"]) => (
            <Tag color={status === "ACTIVE" ? "green" : "volcano"}>
                {status === "ACTIVE" ? "Đang hoạt động" : "Ngưng hoạt động"}
            </Tag>
        ),
    },
    {
        title: "Tạo lúc",
        dataIndex: "created_at",
        key: "created_at",
        align: "center",
        render: (_, value) =>
            new Date(value.home_ContractTo).toLocaleDateString("vi-VN"),
    },
    {
        dataIndex: "action",
        key: "action",
        fixed: "right",
        align: "center",
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
                            title={`Bạn có chắc chắn muốn xóa khách hàng ${record}?`}
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
            ];
            return (
                <Dropdown
                    overlay={
                        <Menu items={menuItems} style={{ width: "100%" }} />
                    }
                    trigger={["click"]}
                    placement='bottomLeft'
                >
                    <MoreOutlined
                        style={{ fontSize: "20px", cursor: "pointer" }}
                    />
                </Dropdown>
            );
        },
    },
];
