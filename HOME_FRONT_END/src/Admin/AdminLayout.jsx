import { Layout, Menu } from "antd";
import classname from "classnames/bind";
import {
    AppstoreOutlined,
    BarChartOutlined,
    CloudOutlined,
    ShopOutlined,
    TeamOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";

import style from "../Admin/AdminLayout.module.scss";
import React from "react";

const { Header, Content, Sider } = Layout;
const cx = classname.bind(style);

function AdminLayout(children) {
    return (
        <Layout hasSider>
            <Sider className={cx("sider")}>Sider</Sider>
            <Layout>
                <Header className={cx("header")}>
                    <div className={cx("header-children")}>Header</div>
                </Header>
                <Content className={cx("content")}>
                    <div className={cx("content-children")}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
