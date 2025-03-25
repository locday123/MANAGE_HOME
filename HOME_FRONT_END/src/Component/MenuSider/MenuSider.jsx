import classNames from "classnames/bind"
import styles from "../MenuSider/MenuSider.module.scss"

import {publicRoutes} from "../../Routes/Routes"

import {Menu} from "antd"
import {Link} from "react-router-dom"
const cx = classNames.bind(styles)
function MenuSider() {
    const generateMenuItems = (routes) => {
        const parentItems = routes
            .filter((route) => !route.parent)
            .map((parent) => ({
                key: parent.key,
                icon: parent.icon,
                label: parent.label, // Loại bỏ Link khỏi parent
                children: routes
                    .filter((child) => child.parent === parent.key)
                    .map((child) => ({
                        icon: child.icon,
                        key: child.key,
                        label: <Link to={child.path}>{child.label}</Link>,
                    })),
            }))
        return parentItems
    }

    const menuItems = generateMenuItems(publicRoutes)

    return (
        <Menu
            className={cx("menu-sider")}
            defaultSelectedKeys={["1"]}
            mode='inline'
            items={menuItems}
        />
    )
}

export default MenuSider
