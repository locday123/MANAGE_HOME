import { Menu, Tabs } from "antd";
import classname from "classnames/bind";
import { LockFilled, InfoCircleFilled, UserOutlined } from "@ant-design/icons";
import style from "../Customer/Customer.module.scss";

const cx = classname.bind(style);
const item = [
    {
        label: "Thông tin cá nhân",
        children: "Thông tin cá nhân",
        key: "1",
        icon: <UserOutlined />,
    },
    {
        label: "Thay đổi mật khẩu",
        children: "Thay đổi mật khẩu",
        key: "2",
        icon: <LockFilled />,
    },
    {
        label: "Thông tin khác",
        children: "Thông tin khác",
        key: "3",
        icon: <InfoCircleFilled />,
    },
];

function Customer() {
    return (
        <>
            <Tabs
                tabPosition={"left"}
                className={cx("tabs-customer")}
                type='line'
                tabBarGutter={20}
                size='large'
            >
                {item.map((tab) => (
                    <Tabs.TabPane
                        key={tab.key}
                        tab={tab.label}
                        icon={tab.icon}
                        className={cx("tabs-panel")}
                    >
                        {tab.children}
                    </Tabs.TabPane>
                ))}
            </Tabs>
        </>
    );
}

export default Customer;
