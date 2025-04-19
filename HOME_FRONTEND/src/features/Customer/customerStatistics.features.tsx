import { Row, Col } from "antd";
import CustomCard from "../../components/Card/CustomCard.components";
import Customer from "../../types/customer.type";
import dayjs from "dayjs";
import CustomStatistic from "../../components/Statistic/CustomStatistic.components";

// Function tính toán thống kê từ dữ liệu khách hàng
const calculateStatistics = (customers: Customer[]) => {
    const totalCustomers = customers.length;

    const activeCustomers = customers.filter(
        (c) => c.customer_Status === "ACTIVE"
    ).length;

    const inactiveCustomers = customers.filter(
        (c) => c.customer_Status === "INACTIVE"
    ).length;

    const maleCustomers = customers.filter(
        (c) => c.customer_Sex === true
    ).length;
    const femaleCustomers = customers.filter(
        (c) => c.customer_Sex === false
    ).length;

    const thisMonth = dayjs().format("YYYY-MM");
    const newCustomersThisMonth = customers.filter(
        (c) => dayjs(c.created_at).format("YYYY-MM") === thisMonth
    ).length;

    const customersWithBothCCCD = customers.filter(
        (c) => !!c.customer_Front && !!c.customer_Back
    ).length;

    return {
        totalCustomers,
        activeCustomers,
        inactiveCustomers,
        maleCustomers,
        femaleCustomers,
        newCustomersThisMonth,
        customersWithBothCCCD,
    };
};

// Component thống kê khách hàng
function CustomerStatistics({ customers }: { customers: Customer[] }) {
    const statistics = calculateStatistics(customers);

    return (
        <Row gutter={16}>
            {/* CustomCard 1: Tổng số khách hàng, ACTIVE, INACTIVE */}
            <Col span={8}>
                <CustomCard>
                    <Row gutter={16}>
                        <Col span={8}>
                            <CustomStatistic
                                title='Tổng số'
                                value={statistics.totalCustomers}
                            />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic
                                title='ACTIVE'
                                value={statistics.activeCustomers}
                            />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic
                                title='INACTIVE'
                                value={statistics.inactiveCustomers}
                            />
                        </Col>
                    </Row>
                </CustomCard>
            </Col>

            {/* CustomCard 2: Nam, Nữ, đầy đủ CCCD */}
            <Col span={8}>
                <CustomCard>
                    <Row gutter={16}>
                        <Col span={8}>
                            <CustomStatistic
                                title='Nam'
                                value={statistics.maleCustomers}
                            />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic
                                title='Nữ'
                                value={statistics.femaleCustomers}
                            />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic
                                title='Đủ CCCD'
                                value={statistics.customersWithBothCCCD}
                            />
                        </Col>
                    </Row>
                </CustomCard>
            </Col>

            {/* CustomCard 3: Khách hàng mới trong tháng */}
            <Col span={8}>
                <CustomCard>
                    <Row gutter={16}>
                        <Col span={24}>
                            <CustomStatistic
                                title='Khách hàng mới trong tháng'
                                value={statistics.newCustomersThisMonth}
                            />
                        </Col>
                    </Row>
                </CustomCard>
            </Col>
        </Row>
    );
}

export default CustomerStatistics;
