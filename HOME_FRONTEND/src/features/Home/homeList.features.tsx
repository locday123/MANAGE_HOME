import { useEffect, useState } from "react";
import CustomCard from "../../components/Card/CustomCard.components";
import CustomTable from "../../components/Table/CustomTable.components";
import Home from "../../types/home.type";
import { getHomesColumns } from "./homeColumns.features";
import { deleteHome, getAllHome } from "../../services/Home/homes.service";

function HomeList() {
    const [homes, setHomes] = useState<Home[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedHome, setSelectedHome] = useState<Home | null>(null);

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

    const handleDelete = async (home: Home) => {
        try {
            await deleteHome(home.home_ID); // Gọi API xóa khách hàng
            setHomes((prev) => prev.filter((c) => c.home_ID !== home.home_ID));
        } catch (error) {
            console.error("Lỗi khi xóa khách hàng:", error);
        }
    };

    return (
        <CustomCard>
            <CustomTable<Home>
                columns={getHomesColumns({
                    onEdit: (homes) => {
                        setSelectedHome(homes);
                        setIsEdit(true);
                        setModalOpen(true);
                    },
                    onDelete: handleDelete, // Truyền trực tiếp handleDelete vào
                })}
                dataSource={homes}
                pagination={false}
                scroll={{ x: "max-content" }}
            />
        </CustomCard>
    );
}

export default HomeList;
