import { Tabs } from "antd";
import classname from "classnames/bind";
import style from "../Customer/Customer.module.scss";
import { ExtendedData } from "../../assets/ExtendedData";

const cx = classname.bind(style);
function Customer() {
    return (
        <>
            <Tabs
                tabPosition={"left"}
                className={cx("tabs-customer")}
                type='line'
                size='large'
            >
                {ExtendedData.Customer.TabsItem.map((tab) => (
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
