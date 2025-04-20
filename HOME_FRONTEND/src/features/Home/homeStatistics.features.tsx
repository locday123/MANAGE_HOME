import {Row, Col} from "antd"
import Home from "../../types/home.type"
import dayjs from "dayjs"
import CustomCard from "../../components/Card/CustomCard.components"
import CustomStatistic from "../../components/Statistic/CustomStatistic.components"

const calculateHomeStatistics = (homes: Home[]) => {
    const totalHomes = homes.length
    const activeHomes = homes.filter((h) => h.home_Status === "ACTIVE").length
    const inactiveHomes = homes.filter((h) => h.home_Status === "INACTIVE").length

    const today = dayjs()
    const expiringContracts = homes.filter(
        (h) =>
            dayjs(h.home_ContractTo).isBefore(today.add(30, "day")) &&
            dayjs(h.home_ContractTo).isAfter(today)
    ).length

    return {
        totalHomes,
        activeHomes,
        inactiveHomes,
        expiringContracts,
    }
}

function HomeStatistics({homes}: {homes: Home[]}) {
    const stats = calculateHomeStatistics(homes)

    return (
        <Row gutter={16}>
            {/* Tổng số nhà, ACTIVE, INACTIVE */}
            <Col span={8}>
                <CustomCard>
                    <Row gutter={16}>
                        <Col span={8}>
                            <CustomStatistic title='Tổng số nhà' value={stats.totalHomes} />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic title='ACTIVE' value={stats.activeHomes} />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic title='INACTIVE' value={stats.inactiveHomes} />
                        </Col>
                    </Row>
                </CustomCard>
            </Col>

            {/* Hợp đồng sắp hết hạn */}
            <Col span={8}>
                <CustomCard>
                    <Row>
                        <Col span={24}>
                            <CustomStatistic
                                title='HĐ sắp hết hạn (≤30 ngày)'
                                value={stats.expiringContracts}
                            />
                        </Col>
                    </Row>
                </CustomCard>
            </Col>
        </Row>
    )
}

export default HomeStatistics
