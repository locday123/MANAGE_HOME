import { Button, Col, Input, Row, Select, Tag } from "antd";
import {
    createFloorsForHome,
    getFloorsByHome,
} from "../../Service/Floor/FloorService";
import { useState } from "react";

const columnsTable = [
    {
        key: "floor_ID",
        title: "ID",
        dataIndex: "floor_ID",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "home_ID",
        title: "Home",
        dataIndex: "home_ID",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "floor_Name",
        title: "Tầng",
        dataIndex: "floor_Name",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "floor_TotalRooms",
        title: "Tầng",
        dataIndex: "floor_TotalRooms",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
    {
        key: "created_at",
        title: "Tầng",
        dataIndex: "created_at",
        align: "center",
        width: "5rem",

        render: (value) => <Tag>{value}</Tag>,
    },
];
const FormFilter = ({
    searchText,
    data = [],
    valueCreate,
    setValueCreate,
    setFloors,
}) => {
    const [message, setMessage] = useState("");

    const handleCreateFloors = async (valueCreate) => {
        const result = await createFloorsForHome(
            valueCreate.home_ID,
            valueCreate.home_TotalFloors
        );

        if (result?.data) {
            setMessage(`✅ Tạo ${result.data.length} tầng thành công.`);
        } else {
            setMessage(result.error || "❌ Không thể tạo tầng.");
        }
    };
    const handleChangeHome = async (home_ID) => {
        try {
            const result = await getFloorsByHome(home_ID);
            setFloors(result || []); // nếu API trả về { data: [...] }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tầng:", error);
        }
    };
    return (
        <>
            <Row gutter={[24, 24]} style={{ rowGap: "10px" }}>
                <Col xxl={4} xl={6} lg={8}>
                    <Input
                        allowClear
                        value={searchText}
                        style={{
                            width: "100%",
                        }}
                        placeholder='Tìm kiếm: ID | Địa chỉ'
                    />
                </Col>
                <Col>
                    <Select
                        placeholder='Quận - Huyện'
                        onChange={(value, option) => {
                            handleChangeHome(value);
                            setValueCreate({
                                home_ID: value,
                                home_TotalFloors: option.totalFloors,
                            });
                        }}
                        options={data.map((home) => ({
                            key: home.home_ID,
                            value: home.home_ID,
                            label: home.home_ID,
                            totalFloors: home.home_TotalFloors,
                        }))}
                    />
                </Col>
                <Col>
                    <Button
                        type='primary'
                        children='Tự động tạo tầng'
                        onClick={() => handleCreateFloors(valueCreate)}
                    />
                </Col>
            </Row>
        </>
    );
};

export { FormFilter, columnsTable };
