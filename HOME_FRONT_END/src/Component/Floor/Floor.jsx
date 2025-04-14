import {Tabs} from "antd"
import style from "../Floor/Floor.module.scss"
import classname from "classnames/bind"
import {getAllHome} from "../../Service/Home/HomeSerivce"
import {useEffect, useState} from "react"
import {CloseCircleTwoTone, CheckCircleTwoTone} from "@ant-design/icons"
import ListFloor from "./ListFloor"
const cx = classname.bind(style)
function Floor() {
    const [home, setHome] = useState([])
    const [activeKey, setActiveKey] = useState(null)
    const [loadedTabs, setLoadedTabs] = useState({})

    useEffect(() => {
        getAllHome().then((data) => {
            setHome(data)
            if (data.length > 0) {
                setActiveKey(data[0].home_ID) // chọn tab đầu tiên
                setLoadedTabs({[data[0].home_ID]: true}) // load nội dung đầu tiên luôn
            }
        })
    }, [])

    const handleTabChange = (key) => {
        setActiveKey(key)
        if (!loadedTabs[key]) {
            setLoadedTabs((prev) => ({...prev, [key]: true}))
        }
    }

    return (
        <Tabs
            tabPosition='left'
            className={cx("tabs-customer")}
            type='line'
            size='large'
            activeKey={activeKey}
            onChange={handleTabChange}
        >
            {home.map((tab) => (
                <Tabs.TabPane
                    key={tab.home_ID}
                    tab={tab.home_ID}
                    icon={
                        tab.home_Status === "ACTIVE" ? (
                            <CheckCircleTwoTone />
                        ) : (
                            <CloseCircleTwoTone />
                        )
                    }
                    className={cx("tabs-panel")}
                >
                    {loadedTabs[tab.home_ID] && <ListFloor home_ID={tab.home_ID} />}
                </Tabs.TabPane>
            ))}
        </Tabs>
    )
}

export default Floorv
