import { FormInstance } from "antd"
import Home from "../../types/home.type"
import {
    addHome,
    deleteHome,
    updateHome,
} from "../../services/Home/homes.service"

export const handleOkHome = async (
    form: FormInstance,
    isEdit: boolean,
    selectedHome: Home | null,
    setHomes: React.Dispatch<React.SetStateAction<Home[]>>,
    setModalOpen: (val: boolean) => void,
    setSelectedHome: (val: Home | null) => void,
    setIsEdit: (val: boolean) => void
) => {
    const { home_ContractRange, ...rest } = form.getFieldsValue();
    
    const formData: Home = {
        ...rest,
        home_ContractFrom: home_ContractRange?.[0]?.format("YYYY-MM-DD") || null,
        home_ContractTo: home_ContractRange?.[1]?.format("YYYY-MM-DD") || null,
    };

    try {
        if (isEdit && selectedHome) {
            await updateHome(selectedHome.home_ID, formData);
            setHomes((prev) =>
                prev.map((h) =>
                    h.home_ID === selectedHome.home_ID ? { ...h, ...formData } : h
                )
            );
        } else {
            const newHome = await addHome(formData);
            if (newHome !== undefined) {
                setHomes((prev) => [...prev, newHome]);
            }
        }
    } catch (error) {
        console.error("Lỗi khi xử lý nhà:", error);
    }

    setModalOpen(false);
    setSelectedHome(null);
    setIsEdit(false);
};


export const handleDeleteHome = async (
    home: Home,
    setHomes: React.Dispatch<React.SetStateAction<Home[]>>
) => {
    try {
        await deleteHome(home.home_ID)
        setHomes((prev) => prev.filter((h) => h.home_ID !== home.home_ID))
    } catch (error) {
        console.error("Lỗi khi xóa nhà:", error)
    }
}
