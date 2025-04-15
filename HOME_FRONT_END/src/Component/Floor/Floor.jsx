import {Button, Card, Tabs} from "antd"
import style from "../Floor/Floor.module.scss"
import classname from "classnames/bind"
import {getAllHome} from "../../Service/Home/HomeSerivce"
import {useEffect, useState} from "react"
import {CloseCircleTwoTone, CheckCircleTwoTone, AppstoreAddOutlined} from "@ant-design/icons"
import CustomCard from "../Extend/Card/CustomCard"
import ListFloor from "./ListFloor"
import {FormFilter} from "../Floor/FloorExtend"
const cx = classname.bind(style)
function Floor() {
    const [home, setHome] = useState([])
    const [valueCreate, setValueCreate] = useState([])
    useEffect(() => {
        getAllHome().then((data) => {
            setHome(data)
        })
    }, [])

    return (
        <CustomCard
            title={
                <FormFilter data={home} valueCreate={valueCreate} setValueCreate={setValueCreate} />
            }
            extra={
                <Button icon={<AppstoreAddOutlined style={{fontSize: "22px"}} />} type='primary' />
            }
        >
            {valueCreate && valueCreate.home_ID}
        </CustomCard>
    )
}

export default Floor
