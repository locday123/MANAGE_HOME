import { Avatar, Dropdown, Layout, Grid, Flex, Tag, Button } from "antd";
import classname from "classnames/bind";
import { AdminLayout_Data } from "./AdminLayoutExtend";
import {
    DownOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from "@ant-design/icons";
import style from "../Admin/AdminLayout.module.scss";
import React, { useEffect, useState } from "react";
import MenuSider from "../Component/MenuSider/MenuSider";

const { useBreakpoint } = Grid;
const { Header, Content, Sider } = Layout;
const cx = classname.bind(style);

function AdminLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [siderElement, setSiderElement] = useState(false);
    const screens = useBreakpoint();

    const breakPoint = (screen) => {
        if (screen.xxl && screen.xl && screen.lg && screen.md & screen.sm) {
            setCollapsed(true);
            setSiderElement({
                element: { width: "17.5rem" },
                trigger: false,
                css: AdminLayout_Data.cssNameInfo.cssShow,
            });
        } else if (
            screen.xxl == false &&
            screen.xl &&
            screen.lg &&
            screen.md & screen.sm
        ) {
            setCollapsed(true);
            setSiderElement({
                element: { width: "15.5rem" },
                trigger: false,
                css: AdminLayout_Data.cssNameInfo.cssShow,
            });
        } else if (
            screen.xxl == false &&
            screen.xl == false &&
            screen.lg &&
            screen.md & screen.sm
        ) {
            setSiderElement({
                element: {
                    breakpoint: "xl",
                    collapsedWidth: "4rem",
                    width: "17.5rem",
                },
                trigger: true,
                css: AdminLayout_Data.cssNameInfo.cssHidden,
            });
            setCollapsed(false);
        } else if (screen.md || screens.sm || screen.xs) {
            setCollapsed(false);
            setSiderElement({
                element: {
                    breakpoint: "lg",
                    collapsedWidth: "0rem",
                    width: "17.5rem",
                },
                trigger: true,
                css: AdminLayout_Data.cssNameInfo.cssHidden,
            });
        }
    };
    useEffect(() => {
        breakPoint(screens);
    }, [screens]);
    return (
        <Layout className={cx("my-css")}>
            <Sider
                className={cx("sider")}
                trigger={null}
                collapsed={!collapsed}
                {...siderElement.element}
            >
                <Dropdown
                    menu={AdminLayout_Data.DropdownMenu}
                    trigger={["click"]}
                >
                    <a
                        onClick={(e) => e.preventDefault()}
                        style={{ color: "black" }}
                    >
                        <div className={cx("user-info")}>
                            <Avatar size='large' icon={<UserOutlined />} />
                            <div style={{ ...siderElement.css }}>
                                <Flex
                                    justify='space-between'
                                    style={{ lineHeight: "0" }}
                                >
                                    <h3 style={{ fontSize: "16px" }}>
                                        Hoàng Xuân Lộc
                                    </h3>
                                    <DownOutlined type='link' />
                                </Flex>
                                <Tag className={cx("text-chucvu")}>Quản lý</Tag>
                            </div>
                        </div>
                    </a>
                </Dropdown>

                <MenuSider />
            </Sider>
            <Layout>
                <Header style={{ height: "76px" }} className={cx("header")}>
                    <div className={cx("header-children")}>
                        {siderElement.trigger ? (
                            <Button
                                type='text'
                                icon={
                                    collapsed ? (
                                        <MenuUnfoldOutlined />
                                    ) : (
                                        <MenuFoldOutlined />
                                    )
                                }
                                onClick={() => {
                                    setSiderElement({
                                        ...siderElement,
                                        css: !collapsed
                                            ? AdminLayout_Data.cssNameInfo
                                                  .cssShow
                                            : AdminLayout_Data.cssNameInfo
                                                  .cssHidden,
                                    });
                                    setCollapsed(!collapsed);
                                    console.log(siderElement);
                                }}
                                style={{
                                    marginRight: "10px",
                                    fontSize: "20px",
                                    width: 50,
                                    height: 50,
                                }}
                            />
                        ) : null}

                        <div className={cx("header-logo")}>
                            <img
                                src='https://ant-cra.cremawork.com/assets/images/logo-with-name.png'
                                alt='crema-logo'
                            />
                        </div>
                    </div>
                </Header>
                <Content className={cx("content")}>
                    <div className={cx("content-children")}>{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
