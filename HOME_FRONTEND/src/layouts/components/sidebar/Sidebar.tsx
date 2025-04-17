// ================== Import thư viện và dependency ==================
import {Layout} from "antd"
import classNames from "classnames/bind"

// ================== Import style và component nội bộ ==================
import style from "./Sidebar.module.scss"
import UserInfo from "./userInfo/userInfo"
import SidebarMenu from "./menu/sidebarMenu"

// ================== Cấu hình class binding ==================
const cx = classNames.bind(style)

// ================== Alias cho Ant Design Sider ==================
const {Sider: AntSidebar} = Layout

function SideBar() {
    return (
        <AntSidebar breakpoint='xl' className={cx("custom-sidebar")}>
            <UserInfo />
            <SidebarMenu />
        </AntSidebar>
    )
}

export default SideBar
