import {Avatar, Dropdown, Layout, Space, theme} from "antd"
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
import React, {useState} from "react"
import MenuSider from "../Component/MenuSider/MenuSider"

const {Header, Content, Sider} = Layout
const cx = classname.bind(style)
const items = [
    {label: "Tài khoản của tôi", key: "0", icon: <UserOutlined />},
    {label: "Đổi mật khẩu", key: "1", icon: <LockFilled />},
    {label: "Đăng xuất", key: "2", icon: <LogoutOutlined />},
]
function AdminLayout({children}) {
    const [collapsed, setCollapsed] = useState(false)
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken()
    return (
        <Layout className={cx("my-css")}>
            <Sider
                width={"17.5rem"}
                collapsedWidth='0'
                onBreakpoint={(broken) => {
                    console.log(broken)
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type)
                }}
                className={cx("sider")}
            >
                <div className={cx("sider-box")}>
                    <div className={cx("sider-user")}>
                        <Dropdown menu={{items}} trigger={["click"]} placement='bottomRight'>
                            <Space align='center'>
                                <Avatar size={45} icon={<UserOutlined />} />
                                <div className={cx("user-info")}>
                                    <div className={cx("user-content")}>
                                        <h5 className={cx("text-decor")}>HOÀNG XUÂN LỘC</h5>
                                        <DownOutlined className={cx("dropdown-icon")} />
                                    </div>
                                    <span className={cx("text-decor")}>System Manager</span>
                                </div>
                            </Space>
                        </Dropdown>
                    </div>
                </div>
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
