import {Avatar, Dropdown, Layout, Space} from "antd"
import classname from "classnames/bind"
import {DownOutlined, UserOutlined, LogoutOutlined, LockFilled} from "@ant-design/icons"
import style from "../Admin/AdminLayout.module.scss"
import React from "react"
import MenuSider from "../Component/MenuSider/MenuSider"

const {Header, Content, Sider} = Layout
const cx = classname.bind(style)
const items = [
    {label: "Tài khoản của tôi", key: "0", icon: <UserOutlined />},
    {label: "Đổi mật khẩu", key: "1", icon: <LockFilled />},
    {label: "Đăng xuất", key: "2", icon: <LogoutOutlined />},
]
function AdminLayout({children}) {
    return (
        <Layout hasSider>
            <Sider width={"15%"} className={cx("sider")}>
                <div className={cx("sider-box")}>
                    <div className={cx("sider-user")}>
                        <Dropdown menu={{items}} trigger={["click"]} placement='bottomRight'>
                            <Space align='center'>
                                <Avatar size={45} icon={<UserOutlined />} />
                                <div className={cx("user-info")}>
                                    <div className={cx("user-content")}>
                                        <h4 style={{fontSize: "16px"}} className={cx("text-decor")}>
                                            HOÀNG XUÂN LỘC
                                        </h4>
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
                <Content className={cx("content")}>
                    <div className={cx("content-children")}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
