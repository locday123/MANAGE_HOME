import {Row, Col} from "antd"
import Home from "../../types/home.type"

import CustomCard from "../../components/Card/CustomCard.components"
import CustomStatistic from "../../components/Statistic/CustomStatistic.components"
import {calculateHomeStatistics} from "./home.utils"

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

            {/* Hợp đồng sắp hết hạn, đã hết hạn, chưa có HĐ */}
            <Col span={8}>
                <CustomCard>
                    <Row gutter={16}>
                        <Col span={8}>
                            <CustomStatistic
                                title='HĐ sắp hết hạn'
                                value={stats.expiringContracts}
                            />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic title='HĐ đã hết hạn' value={stats.expiredContracts} />
                        </Col>
                        <Col span={8}>
                            <CustomStatistic title='Chưa có HĐ' value={stats.noContracts} />
                        </Col>
                    </Row>
                </CustomCard>
            </Col>
        </Row>
    )
}

export default HomeStatistics
