import classNames from "classnames/bind"
import styles from "../MenuSider/MenuSider.module.scss"

import {publicRoutes} from "../../Routes/Routes"

import {Menu} from "antd"
const cx = classNames.bind(styles)
function MenuSider() {
    return (
        <Menu
            className={cx("menu-sider")}
            defaultSelectedKeys={["1"]}
            mode='inline'
            items={publicRoutes}
        />
    )
}

export default MenuSider
