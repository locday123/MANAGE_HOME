import {ColumnsType} from "antd/es/table"
import {Dropdown, Menu, MenuProps, Popconfirm, Space, Tag} from "antd"
import {MoreOutlined, DeleteTwoTone, EditTwoTone} from "@ant-design/icons"
import Floor from "../../types/floor.type"

type GetFloorColumnsProps = {
    onEdit: (floor: Floor) => void
    onDelete: (floor: Floor) => void
    setFloor: React.Dispatch<React.SetStateAction<Floor[]>> // <-- thêm dòng này
}

export const getFloorsColumns = ({onEdit, onDelete}: GetFloorColumnsProps): ColumnsType<Floor> => [
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
        title: "Tình trạng",
        dataIndex: "floor_Status",
        key: "floor_Status",
        align: "center",
        render: (status) => {
            const color = status === "ACTIVE" ? "green" : "red"
            const label = status === "ACTIVE" ? "Đang hoạt động" : "Ngừng hoạt động"
            return <Tag color={color}>{label}</Tag>
        },
    },

    {
        dataIndex: "action",
        key: "action",
        fixed: "right",
        align: "center",
        render(_, record) {
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
                            title={`Bạn có chắc chắn muốn xóa ${record.floor_Name}?`}
                            onConfirm={() => onDelete(record)}
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
                    overlay={<Menu items={menuItems} />}
                    trigger={["click"]}
                    placement='bottomRight'
                >
                    <MoreOutlined style={{fontSize: "20px", cursor: "pointer"}} />
                </Dropdown>
            )
        },
    },
]
