import { Button, Col, Input, Row } from "antd";
import { createFloorsForHome } from "../../Service/Floor/FloorService";
import { useState } from "react";

const FormFilter = ({ searchText, home_ID, totalFloors }) => {
    const [message, setMessage] = useState("");
    const handleCreateFloors = async () => {
        if (!home_ID) {
            return setMessage("❌ Thiếu mã nhà.");
        }

        const result = await createFloorsForHome(home_ID, totalFloors);

        if (result?.data) {
            setMessage(`✅ Tạo ${result.data.length} tầng thành công.`);
        } else {
            setMessage(result.error || "❌ Không thể tạo tầng.");
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
                    <Button
                        type='primary'
                        children='Tự động thêm tầng'
                        onClick={handleCreateFloors}
                    />
                </Col>
            </Row>
        </>
    );
};

export { FormFilter };
