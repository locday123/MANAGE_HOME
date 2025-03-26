import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./Routes/Routes";
import AdminLayout from "./Admin/AdminLayout";
import { notification } from "antd";
const Context = React.createContext({ name: "Default" });

function App() {
    const [api, contextHolder] = notification.useNotification();

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Router>
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Comopent = route.component;
                        return (
                            <Route
                                key={index}
                                path={
                                    Array.isArray(route.path)
                                        ? route.path[0]
                                        : route.path
                                }
                                element={
                                    <AdminLayout>{<Comopent />}</AdminLayout>
                                }
                            />
                        );
                    })}
                </Routes>
            </Router>
        </Context.Provider>
    );
}

export default App;
