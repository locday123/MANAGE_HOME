import { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, MenuProps, Popconfirm, Space } from "antd";
import { MoreOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import Rooms from "../../types/room.type";

type GetRoomColumnsProps = {
    onEdit: (room: Rooms) => void;
    onDelete: (
        room: Rooms,
        setRooms: React.Dispatch<React.SetStateAction<Rooms[]>>
    ) => void;
    setRooms: React.Dispatch<React.SetStateAction<Rooms[]>>;
};

const getRoomsColumns = ({
    onEdit,
    onDelete,
    setRooms,
}: GetRoomColumnsProps): ColumnsType<Rooms> => [
    {
        title: "Mã phòng",
        dataIndex: "room_ID",
        key: "room_ID",
        fixed: "left",
        align: "center",
    },
    {
        title: "Mã tầng",
        dataIndex: "floor_ID",
        key: "floor_ID",
        align: "center",
    },
    {
        title: "Tên phòng",
        dataIndex: "room_Name",
        key: "room_Name",
        align: "left",
    },
    {
        title: "Diện tích",
        dataIndex: "room_Area",
        key: "room_Area",
        align: "center",
    },
    {
        title: "Trạng thái",
        dataIndex: "room_Status",
        key: "room_Status",
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
                            title={`Bạn có chắc chắn muốn xóa phòng ${record.room_ID}?`}
                            onConfirm={() => onDelete(record, setRooms)}
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
                    overlay={<Menu items={menuItems} />}
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

export default getRoomsColumns;
