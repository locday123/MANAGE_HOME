import { FormInstance } from "antd";
import Floor from "../../types/floor.type"; // Cập nhật kiểu dữ liệu từ Home thành Floor
import {
    addFloor,
    deleteFloor,
    updateFloor,
} from "../../services/Floor/floor.service"; // Cập nhật các API service cho floor

export const handleOkFloor = async (
    form: FormInstance,
    isEdit: boolean,
    selectedFloor: Floor | null,
    setFloors: React.Dispatch<React.SetStateAction<Floor[]>>,
    setModalOpen: (val: boolean) => void,
    setSelectedFloor: (val: Floor | null) => void,
    setIsEdit: (val: boolean) => void
) => {
    const { floor_Name, floor_TotalRooms, ...rest } = form.getFieldsValue();

    const formData: Floor = {
        ...rest,
        floor_Name: floor_Name || "",
        floor_TotalRooms: floor_TotalRooms || 0,
    };

    try {
        if (isEdit && selectedFloor) {
            await updateFloor(selectedFloor.floor_ID, formData);
            setFloors((prev) =>
                prev.map((f) =>
                    f.floor_ID === selectedFloor.floor_ID
                        ? { ...f, ...formData }
                        : f
                )
            );
        } else {
            const newFloor = await addFloor(formData);
            if (newFloor !== undefined) {
                setFloors((prev) => [...prev, newFloor]);
            }
        }
    } catch (error) {
        console.error("Lỗi khi xử lý tầng:", error);
    }

    setModalOpen(false);
    setSelectedFloor(null);
    setIsEdit(false);
};

export const handleDeleteFloor = async (
    floor: Floor,
    setFloor: React.Dispatch<React.SetStateAction<Floor[]>>
) => {
    try {
        await deleteFloor(floor.floor_ID); // Xóa tầng
        setFloor((prev) => prev.filter((f) => f.floor_ID !== floor.floor_ID));
    } catch (error) {
        console.error("Lỗi khi xóa tầng:", error);
    }
};
