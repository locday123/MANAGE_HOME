import { Card } from "antd";
import { actionsCard } from "./CustomerExtend";

function CustomerGirdView({
    customer,
    setCustomerData,
    setHoveredCard,
    setVisible,
    hoveredCard,
}) {
    return (
        <Card
            hoverable
            onMouseEnter={() => setHoveredCard(customer.customer_ID)} // Lưu ID của card đang hover
            onMouseLeave={() => setHoveredCard(null)} // Reset khi rời chuột
            onClick={() => setCustomerData(customer)}
            title={customer.customer_Name}
            extra={
                hoveredCard === customer?.customer_ID && actionsCard(setVisible)
            } // Chỉ hiển thị actions cho card đang hover
        ></Card>
    );
}

export default CustomerGirdView;
