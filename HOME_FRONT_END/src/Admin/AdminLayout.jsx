import {Avatar, Dropdown, Layout, Space, theme, Grid} from "antd"
import classname from "classnames/bind"
import {
    DownOutlined,
    UserOutlined,
    LogoutOutlined,
    LockFilled,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons"
import style from "../Admin/AdminLayout.module.scss"
import React, {useEffect, useState} from "react"
import MenuSider from "../Component/MenuSider/MenuSider"

const {useBreakpoint} = Grid
const {Header, Content, Sider} = Layout
const cx = classname.bind(style)

const items = [
    {label: "Tài khoản của tôi", key: "0", icon: <UserOutlined />},
    {label: "Đổi mật khẩu", key: "1", icon: <LockFilled />},
    {label: "Đăng xuất", key: "2", icon: <LogoutOutlined />},
]

function AdminLayout({children}) {
    const [collapsed, setCollapsed] = useState(false)
    const [reponseve, setReponseve] = useState([])
    const screens = useBreakpoint()
    const breakpoint = {
        size: screens.xxl
            ? {breakpoint: "xxl", width: "17.5rem"}
            : screens.xl
            ? {breakpoint: "xl", width: "16rem"}
            : screens.lg
            ? {breakpoint: "xl", collapsedWidth: "4rem", width: "17.5rem"}
            : screens.md || screens.sm || screens.xs
            ? {breakpoint: "lg", collapsedWidth: "0", width: "17.5rem"}
            : {},
    }
    return (
        <Layout className={cx("my-css")}>
            <Sider {...breakpoint.size} className={cx("sider")}>
                <MenuSider />
            </Sider>
            <Layout>
                <Header style={{height: "76px"}} className={cx("header")}>
                    <div className={cx("header-children")}></div>
                </Header>
                <Content className={cx("content")}>
                    <div className={cx("content-children")}>{children}</div>
                    <p>long content</p>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
