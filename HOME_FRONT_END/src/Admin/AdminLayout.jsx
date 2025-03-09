import {Avatar, Dropdown, Layout, Space, theme, Grid, Flex, Button} from "antd"
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

const cssNameinfo = {
    cssHidden: {
        opacity: 0,
        visibility: "hidden",
        width: "0px",
        paddingLeft: "0px",
        paddingRight: "0px",
        marginLeft: "0px",
    },
    cssShow: {width: "calc(100% - 62px)", marginLeft: "16px", transition: "0.2s"},
}

const items = [
    {label: "Tài khoản của tôi", key: "0", icon: <UserOutlined />},
    {label: "Đổi mật khẩu", key: "1", icon: <LockFilled />},
    {label: "Đăng xuất", key: "2", icon: <LogoutOutlined />},
]

function AdminLayout({children}) {
    const [collapsed, setCollapsed] = useState(false)
    const [siderElement, setSiderElement] = useState(false)
    const screens = useBreakpoint()

    const breakPoint = (screen) => {
        if (screen.xxl && screen.xl && screen.lg && screen.md & screen.sm) {
            setCollapsed(true)
            setSiderElement({
                element: {width: "17.5rem"},
                trigger: false,
                css: cssNameinfo.cssShow,
            })
        } else if (screen.xxl == false && screen.xl && screen.lg && screen.md & screen.sm) {
            console.log()
            setCollapsed(true)
            setSiderElement({
                element: {width: "15.5rem"},
                trigger: false,
                css: cssNameinfo.cssShow,
            })
        } else if (
            screen.xxl == false &&
            screen.xl == false &&
            screen.lg &&
            screen.md & screen.sm
        ) {
            setSiderElement({
                element: {breakpoint: "xl", collapsedWidth: "4rem", width: "17.5rem"},
                trigger: true,
                css: cssNameinfo.cssHidden,
            })
            setCollapsed(false)
        } else if (screen.md || screens.sm || screen.xs) {
            setCollapsed(false)
            setSiderElement({
                element: {breakpoint: "lg", collapsedWidth: "0rem", width: "17.5rem"},
                trigger: true,
                css: cssNameinfo.cssHidden,
            })
        }
    }
    useEffect(() => {
        breakPoint(screens)
    }, [screens])
    return (
        <Layout className={cx("my-css")}>
            <Sider
                className={cx("sider")}
                trigger={null}
                collapsed={!collapsed}
                {...siderElement.element}
            >
                <Dropdown menu={{items}} trigger={["click"]} ty>
                    <a onClick={(e) => e.preventDefault()} style={{color: "black"}}>
                        <div className={cx("user-info")}>
                            <Avatar size='large' icon={<UserOutlined />} />
                            <div style={{...siderElement.css}}>
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
                    <div className={cx("header-children")}>
                        {siderElement.trigger ? (
                            <Button
                                type='text'
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => {
                                    setSiderElement({
                                        ...siderElement,
                                        css: !collapsed
                                            ? cssNameinfo.cssShow
                                            : cssNameinfo.cssHidden,
                                    })
                                    setCollapsed(!collapsed)
                                    console.log(siderElement)
                                }}
                                style={{
                                    fontSize: "20px",
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        ) : null}
                    </div>
                </Header>
                <Content className={cx("content")}>
                    <div className={cx("content-children")}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
