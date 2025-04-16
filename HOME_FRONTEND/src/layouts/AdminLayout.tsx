import { Layout } from "antd";
const { Content: AntContent } = Layout;

import SideBar from "./components/Sidebar";
import Header from "./components/Header";

function AdminLayout() {
    return (
        <Layout>
            <SideBar />
            <Layout>
                <Header />
                <AntContent children='aaa' />
            </Layout>
        </Layout>
    );
}

export default AdminLayout;
