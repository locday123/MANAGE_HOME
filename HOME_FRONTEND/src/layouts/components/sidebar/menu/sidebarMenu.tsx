import {Menu, MenuProps} from "antd"
type RouteItem = {
    key: string
    path?: string
    label: string
    parent?: string
    component?: React.FC
    icon?: React.ReactNode
}
import {publicRoutes} from "../../../../router/router"
import {Link} from "react-router-dom"

function SidebarMenu() {
    const generateMenuItems = (routes: RouteItem[]): MenuProps["items"] => {
        const parentItems = routes
            .filter((route) => !route.parent)
            .map((parent) => ({
                key: parent.key,
                icon: parent.icon,
                label: parent.label, // Không dùng Link ở đây
                children: routes
                    .filter((child) => child.parent === parent.key)
                    .map((child) => ({
                        key: child.key,
                        icon: child.icon,
                        label: <Link to={child.path || "#"}>{child.label}</Link>,
                    })),
            }))

        return parentItems
    }

    const menuItems = generateMenuItems(publicRoutes)

    return <Menu defaultSelectedKeys={["1"]} mode='inline' items={menuItems} />
}

export default SidebarMenu
