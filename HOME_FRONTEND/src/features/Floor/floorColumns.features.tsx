import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, MenuProps, Popconfirm, Space } from "antd";
import { MoreOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import Floor from "../../types/floor.type";

type GetFloorColumnsProps = {
    onEdit: (floor: Floor) => void;
    onDelete: (
        floor: Floor,
        setFloor: React.Dispatch<React.SetStateAction<Floor[]>>
    ) => void;
};

export const getFloorsColumns = ({
    onEdit,
    onDelete,
}: GetFloorColumnsProps): ColumnsType<Floor> => [
    {
        title: "Mã tầng",
        dataIndex: "floor_ID",
        key: "floor_ID",
        fixed: "left",
        align: "center",
    },
    {
        title: "Mã nhà",
        dataIndex: "home_ID",
        key: "home_ID",
        align: "center",
    },
    {
        title: "Tên tầng",
        dataIndex: "floor_Name",
        key: "floor_Name",
        align: "left",
    },
    {
        title: "Tổng số phòng",
        dataIndex: "floor_TotalRooms",
        key: "floor_TotalRooms",
        align: "center",
    },

    {
        title: "Ngày tạo",
        dataIndex: "created_at",
        key: "created_at",
        align: "center",
        render: (_, value) =>
            new Date(value.created_at).toLocaleDateString("vi-VN"),
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
                            title={`Bạn có chắc chắn muốn xóa tầng ${record.floor_ID}?`}
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
