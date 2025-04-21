//import Thư viện
import { useEffect, useState } from "react";
import { Button, FormInstance } from "antd";
//import Components
import CustomCard from "../../components/Card/CustomCard.components";
import CustomTable from "../../components/Table/CustomTable.components";
import CustomModal from "../../components/Modal/CustomModal.components";
//import Giao diện
import { getHomesColumns } from "./homeColumns.features";
import HomeForm from "./homeForm.features";
import HomeFilter from "./homeFilter.features";
import HomeStatistics from "./homeStatistics.features";
//import Chức năng
import { handleOkHome, handleDeleteHome } from "./home.handlers";
import { filterHomes } from "./home.utils";
import Home from "../../types/home.type";

import { getAllHome } from "../../services/Home/homes.service";

function HomeList() {
    const [homes, setHomes] = useState<Home[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedHome, setSelectedHome] = useState<Home | null>(null);
    const [selectCheck, setSelectCheck] = useState<string[]>([]);

    const filteredData = filterHomes(homes, searchValue, selectCheck);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllHome();
                if (result?.data && Array.isArray(result.data)) {
                    setHomes(result.data);
                } else {
                    console.error("Dữ liệu không hợp lệ:", result);
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchData();
    }, []);

    const handleOk = async (form: FormInstance) => {
        await handleOkHome(
            form,
            isEdit,
            selectedHome,
            setHomes,
            setModalOpen,
            setSelectedHome,
            setIsEdit
        );
    };

    return (
        <>
            <HomeStatistics homes={homes} />
            <CustomCard
                title={
                    <HomeFilter
                        homes={homes}
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        onCheckbox={setSelectCheck}
                    />
                }
                extra={
                    <Button
                        children='THêm nhà'
                        type='primary'
                        onClick={() => {
                            setIsEdit(false);
                            setSelectedHome(null);
                            setModalOpen(true);
                        }}
                    />
                }
            >
                <CustomTable<Home>
                    columns={getHomesColumns({
                        onEdit: (home) => {
                            setSelectedHome(home);
                            setIsEdit(true);
                            setModalOpen(true);
                        },
                        onDelete: (home: Home) =>
                            handleDeleteHome(home, setHomes), // Gọi handleDeleteHome khi onDelete được gọi
                    })}
                    dataSource={filteredData}
                    pagination={false}
                    scroll={{ x: "max-content" }}
                />
            </CustomCard>
            <CustomModal
                visible={modalOpen}
                isEdit={isEdit}
                setVisible={setModalOpen}
                handleOk={handleOk}
                entityName='NHÀ CHO THUÊ'
            >
                {(form) => (
                    <HomeForm
                        form={form}
                        isEdit={isEdit}
                        homeData={selectedHome}
                    />
                )}
            </CustomModal>
        </>
    );
}

export default HomeList;
