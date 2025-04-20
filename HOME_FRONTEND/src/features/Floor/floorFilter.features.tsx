import { Row, Col, Select, Button } from "antd";
import Home from "../../types/home.type";

type FloorFilterProps = {
    selectedHome: string;
    onHomeChange: (home_ID: string, option: any) => void;
    homes: Home[];
    currentFloorCount: number; // Số tầng hiện tại của floor
    maxFloor: number; // Thêm prop maxFloor
    onAddFloor: (home_ID: string, floorCount: number) => void; // Hàm để tự động tạo tầng
};

function FloorFilter({
    homes,
    selectedHome,
    onHomeChange,
    currentFloorCount,
    maxFloor,
    onAddFloor,
}: FloorFilterProps) {
    const floorNumber = maxFloor - currentFloorCount;
    const handleAddFloor = () => {
        if (selectedHome) {
            // Gọi hàm onAddFloor với home_ID và số tầng
            onAddFloor(selectedHome, floorNumber);
        }
    };
    return (
        <Row gutter={16}>
            <Col xxl={4}>
                <Select
                    placeholder='Chọn nhà'
                    style={{ width: "100%" }}
                    value={selectedHome}
                    onChange={onHomeChange}
                    options={homes.map((home) => ({
                        label: home.home_Address,
                        value: home.home_ID,
                        totalFloor: home.home_TotalFloors,
                    }))}
                />
            </Col>
            <Col xxl={4}>
                <Button
                    type='primary'
                    disabled={floorNumber <= 0} // Disable button nếu số tầng đã đầy
                    onClick={handleAddFloor} // Khi nhấn nút sẽ gọi hàm tạo tầng
                >
                    Tự động tạo tầng
                </Button>
            </Col>
        </Row>
    );
}

export default FloorFilter;
