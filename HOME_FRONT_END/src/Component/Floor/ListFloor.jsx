import React, {useEffect, useState} from "react"
import {List, Card, Spin, Empty, message} from "antd"
import {getFloorsByHome} from "../../Service/Floor/FloorService" // bạn sửa lại đường dẫn nếu cần

const ListFloor = ({home_ID}) => {
    const [listFloor, setListFloor] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!home_ID) return

        setLoading(true)
        setError(null)

        getFloorsByHome(home_ID)
            .then((data) => {
                setListFloor(data || [])
            })
            .catch((err) => {
                console.error("Lỗi khi load floor:", err)
                setError("Không thể tải danh sách tầng.")
                message.error("Tải tầng thất bại.")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [home_ID])

    if (loading) return <Spin tip='Đang tải danh sách tầng...' />
    if (error) return <div>{error}</div>
    if (!listFloor.length) return <Empty description='Không có tầng nào.' />

    return (
        <List
            grid={{gutter: 16, column: 2}}
            dataSource={listFloor}
            renderItem={(floor) => (
                <List.Item>
                    <Card title={`Tầng ${floor.floor_Number}`}>
                        {/* Thêm nội dung chi tiết của tầng tại đây */}
                        {floor.description || "Không có mô tả."}
                    </Card>
                </List.Item>
            )}
        />
    )
}

export default ListFloor
