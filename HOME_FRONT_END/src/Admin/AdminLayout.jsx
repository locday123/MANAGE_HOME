import { Avatar, Dropdown, Layout, Space } from "antd";
import classname from "classnames/bind";
import {
    DownOutlined,
    UserOutlined,
    LogoutOutlined,
    LockFilled,
} from "@ant-design/icons";
import style from "../Admin/AdminLayout.module.scss";
import React from "react";
import MenuSider from "../Component/MenuSider/MenuSider";

const { Header, Content, Sider } = Layout;
const cx = classname.bind(style);
const items = [
    { label: "Tài khoản của tôi", key: "0", icon: <UserOutlined /> },
    { label: "Đổi mật khẩu", key: "1", icon: <LockFilled /> },
    { label: "Đăng xuất", key: "2", icon: <LogoutOutlined /> },
];
function AdminLayout({ children }) {
    return (
        <Layout>
            <Sider className={cx("sider")}>
                <div className={cx("sider-box")}>
                    <div className={cx("sider-user")}>
                        <Dropdown
                            menu={{ items }}
                            trigger={["click"]}
                            placement='bottomRight'
                        >
                            <Space align='center'>
                                <Avatar size={45} icon={<UserOutlined />} />
                                <div className={cx("user-info")}>
                                    <div className={cx("user-content")}>
                                        <h5 className={cx("text-decor")}>
                                            HOÀNG XUÂN LỘC
                                        </h5>
                                        <DownOutlined
                                            className={cx("dropdown-icon")}
                                        />
                                    </div>
                                    <span className={cx("text-decor")}>
                                        System Manager
                                    </span>
                                </div>
                            </Space>
                        </Dropdown>
                    </div>
                </div>
                <MenuSider />
            </Sider>
            <Layout>
                <Header style={{ height: "76px" }} className={cx("header")}>
                    <div className={cx("header-children")}>Hello</div>
                </Header>
                <Content className={cx("content")}>
                    <div className={cx("content-children")}>{children}</div>
                    <p>long content</p>
                    {
                        // indicates very long content
                        Array.from(
                            {
                                length: 100,
                            },
                            (_, index) => (
                                <React.Fragment key={index}>
                                    {index % 20 === 0 && index ? "more" : "..."}
                                    <br />
                                </React.Fragment>
                            )
                        )
                    }
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
