import { Layout } from "antd";
import classNames from "classnames/bind";
import style from "./Header.module.scss"

const cx = classNames.bind(style)
const { Header: AntHeader } = Layout;
function Header() {
    return <AntHeader className={cx('custom-header')}>cdadasd</AntHeader>;
}

export default Header;
