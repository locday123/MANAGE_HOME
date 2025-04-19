import { FormInstance } from "antd";
import moment from "moment";
import Customer from "../../types/customer.type";
import {
    updatedCustomer,
    addCustomer,
    deleteCustomer,
} from "../../services/Customer/customer.service";

export const handleOkCustomer = async (
    form: FormInstance,
    isEdit: boolean,
    selectedCustomer: Customer | null,
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
    setModalOpen: (val: boolean) => void,
    setSelectedCustomer: (val: Customer | null) => void,
    setIsEdit: (val: boolean) => void
) => {
    const formData: Customer = form.getFieldsValue();

    const uploadData = new FormData();
    uploadData.append("customer_ID", formData.customer_ID);
    uploadData.append("customer_Name", formData.customer_Name);
    uploadData.append("customer_Sex", formData.customer_Sex.toString());
    uploadData.append("customer_PhoneNumber", formData.customer_PhoneNumber);
    uploadData.append(
        "customer_Date",
        moment(formData.customer_Date).format("YYYY-MM-DD")
    );
    uploadData.append("customer_Status", formData.customer_Status.toString());

    if (formData.customer_Front) {
        uploadData.append("frontImage", formData.customer_Front);
    }
    if (formData.customer_Back) {
        uploadData.append("backImage", formData.customer_Back);
    }

    try {
        if (isEdit && selectedCustomer) {
            await updatedCustomer(selectedCustomer.customer_ID, uploadData);
            setCustomers((prev) =>
                prev.map((c) =>
                    c.customer_ID === selectedCustomer.customer_ID
                        ? formData
                        : c
                )
            );
        } else {
            await addCustomer(uploadData);
            setCustomers((prev) => [...prev, formData]);
        }
    } catch (error) {
        console.error("Lỗi khi xử lý khách hàng:", error);
    }

    setModalOpen(false);
    setSelectedCustomer(null);
    setIsEdit(false);
};

export const handleDeleteCustomer = async (
    customer: Customer,
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
) => {
    try {
        await deleteCustomer(customer.customer_ID);
        setCustomers((prev) =>
            prev.filter((c) => c.customer_ID !== customer.customer_ID)
        );
    } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error);
    }
};
