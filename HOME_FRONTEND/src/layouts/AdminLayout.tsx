import {Layout} from "antd"
const {Content: AntContent} = Layout
import classNames from "classnames/bind"
import SimpleBar from "simplebar-react"
import "simplebar-react/dist/simplebar.min.css"

import style from "./AdminLayout.module.scss"
import SideBar from "./components/sidebar/Sidebar"
import Header from "./components/header/Header"

const cx = classNames.bind(style)

type Children = {
    children: React.ReactNode
}
function AdminLayout({children}: Children) {
    return (
        <Layout className={cx("app-layout")}>
            <SideBar />
            <Layout>
                <Header />
                <SimpleBar className={cx("app-scroll-bar")}>
                    <AntContent className={cx("custom-content")}>{children}</AntContent>
                </SimpleBar>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
