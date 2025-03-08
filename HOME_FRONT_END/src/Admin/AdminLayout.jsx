import {Avatar, Dropdown, Layout, Space, theme, Grid, Flex} from "antd"
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
            ? {
                  width: "17.5rem",
                  collapsed: false,
                  css: {
                      width: "calc(100% - 62px)",
                      marginLeft: "16px",
                      transition: "0.2s",
                  },
              }
            : screens.xl
            ? {
                  width: "16rem",
                  collapsed: false,
                  css: {
                      width: "calc(100% - 62px)",
                      marginLeft: "16px",
                      transition: "0.2s",
                  },
              }
            : screens.lg
            ? {
                  breakpoint: "xl",
                  collapsedWidth: "4rem",
                  width: "17.5rem",
                  trigger: true,
                  css: {
                      opacity: 0,
                      visibility: "hidden",
                      width: "0px",
                      paddingLeft: "0px",
                      paddingRight: "0px",
                      marginLeft: "0px",
                  },
              }
            : screens.md || screens.sm || screens.xs
            ? {
                  breakpoint: "lg",
                  collapsedWidth: "0rem",
                  width: "17.5rem",

                  css: {
                      width: "calc(100% - 62px)",
                      marginLeft: "16px",
                      transition: "0.2s",
                  },
              }
            : {},
    }
    return (
        <Layout className={cx("my-css")}>
            <Sider {...breakpoint.size} className={cx("sider")}>
                <Dropdown menu={{items}} trigger={["click"]} ty>
                    <a onClick={(e) => e.preventDefault()}>
                        <div className={cx("user-info")}>
                            <Avatar size='large' icon={<UserOutlined />} />
                            <div style={{...breakpoint.size.css}}>
                                <Flex justify='space-between' style={{lineHeight: "0"}}>
                                    <h3 style={{fontSize: "16px"}}>Hoàng Xuân Lộc</h3>
                                    <DownOutlined type='link' />
                                </Flex>
                                <span className={cx("text-chucvu")}>Quản lý</span>
                            </div>
                        </div>
                    </a>
                </Dropdown>

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
