// ================== Import thư viện hỗ trợ ==================
// classNames/bind giúp liên kết class CSS Modules thuận tiện hơn
import classNames from "classnames/bind"
import {Avatar, Dropdown} from "antd"
import {UserOutlined, DownOutlined} from "@ant-design/icons" // Icon avatar

// ================== Import style riêng của component ==================
import style from "./userInfo.module.scss"

// ================== Cấu hình bind className ==================
// Cho phép gọi class bằng cx("className") thay vì style.className
const cx = classNames.bind(style)

function UserInfo() {
    return (
        <div className={cx("user-info")}>
            <Dropdown trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()} className={cx("user-inner")}>
                    <Avatar size='large' icon={<UserOutlined />} className={cx("user-avatar")} />
                    <span className={cx("user-content")}>
                        <span className={cx("username-info")}>
                            <h3 className={cx("username", "text-truncate")}>Xuân Lộc</h3>
                            <DownOutlined className={cx("user-arrow")} />
                        </span>
                        <span className={cx("user-designation", "text-truncate")}>Quản lý</span>
                    </span>
                </a>
            </Dropdown>
        </div>
    )
}
export default UserInfo
