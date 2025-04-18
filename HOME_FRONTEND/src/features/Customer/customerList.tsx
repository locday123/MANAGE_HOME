import {Button, Card} from "antd"
import {useState, useEffect} from "react"
import {UserAddOutlined} from "@ant-design/icons"
import type {FormInstance} from "antd"

import CustomTable from "../../components/Table/CustomTable"
import {getCustomerColumns} from "./customerColumns"

import CustomerFilter from "./customerFilter"
import {
    getAllCustomer,
    updatedCustomer,
    addCustomer,
    deleteACustomer,
} from "../../service/Customer/customer.service"
import CustomModal from "../../components/Modal/CustomModal"
import CustomerForm from "./customerForm"
import Customer from "../../types/customer.type"

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [searchValue, setSearchValue] = useState("")
    const [modalOpen, setModalOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

    const filteredData = customers.filter((customer) => {
        const value = searchValue.toLowerCase()
        return (
            (customer.customer_Name || "").toLowerCase().includes(value) ||
            (customer.customer_PhoneNumber || "").toLowerCase().includes(value) ||
            (customer.customer_ID || "").toLowerCase().includes(value)
        )
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllCustomer()
                if (result?.data && Array.isArray(result.data)) {
                    setCustomers(result.data)
                } else {
                    console.error("Dữ liệu không hợp lệ:", result)
                }
            } catch (error) {
                console.error("Lỗi khi gọi API:", error)
            }
        }

        fetchData()
    }, [])

    const handleOk = async (form: FormInstance) => {
        const formData: Customer = form.getFieldsValue()
        console.log(formData)

        const uploadData = new FormData() // Khởi tạo FormData để gửi kèm ảnh

        // Thêm dữ liệu của form vào FormData
        uploadData.append("customer_ID", formData.customer_ID)
        uploadData.append("customer_Name", formData.customer_Name)
        uploadData.append("customer_Sex", formData.customer_Sex.toString()) // Chuyển boolean thành string nếu cần
        uploadData.append("customer_PhoneNumber", formData.customer_PhoneNumber)
        uploadData.append("customer_Date", formData.customer_Date)
        uploadData.append("customer_Status", formData.customer_Status.toString()) // Chuyển boolean thành string nếu cần
        console.log(formData.customer_Front)

        // Nếu có file ảnh, thêm vào FormData
        if (formData.customer_Front) {
            uploadData.append("frontImage", formData.customer_Front)
        }
        if (formData.customer_Back) {
            uploadData.append("backImage", formData.customer_Back)
        }

        try {
            if (isEdit && selectedCustomer) {
                // Cập nhật khách hàng
                await updatedCustomer(selectedCustomer.customer_ID, uploadData)
                setCustomers((prev) =>
                    prev.map((c) => (c.customer_ID === selectedCustomer.customer_ID ? formData : c))
                )
            } else {
                // Tạo khách hàng mới
                await addCustomer(formData) // Lưu ý: Gửi `uploadData` thay vì `formData`
                setCustomers((prev) => [...prev, formData])
            }
        } catch (error) {
            console.error("Lỗi khi xử lý khách hàng:", error)
        }

        // Đóng modal và reset các trạng thái
        setModalOpen(false)
        setSelectedCustomer(null)
        setIsEdit(false)
    }

    // Hàm xử lý khi nhấn Xóa
    const handleDelete = async (customer: Customer) => {
        try {
            await deleteACustomer(customer.customer_ID) // Gọi API xóa khách hàng
            setCustomers((prev) => prev.filter((c) => c.customer_ID !== customer.customer_ID))
        } catch (error) {
            console.error("Lỗi khi xóa khách hàng:", error)
        }
    }

    return (
        <>
            <Card
                title={<CustomerFilter searchValue={searchValue} onSearchChange={setSearchValue} />}
                extra={
                    <Button
                        icon={<UserAddOutlined style={{fontSize: "22px"}} />}
                        type='primary'
                        onClick={() => {
                            setIsEdit(false)
                            setSelectedCustomer(null)
                            setModalOpen(true)
                        }}
                    />
                }
            >
                <CustomTable<Customer>
                    columns={getCustomerColumns({
                        onEdit: (customer) => {
                            setSelectedCustomer(customer)
                            setIsEdit(true)
                            setModalOpen(true)
                        },
                        onDelete: handleDelete, // Truyền trực tiếp handleDelete vào
                    })}
                    dataSource={filteredData}
                    pagination={false}
                    scroll={{x: "max-content"}}
                />
            </Card>

            <CustomModal
                visible={modalOpen}
                isEdit={isEdit}
                setVisible={setModalOpen}
                handleOk={handleOk}
                entityName='KHÁCH HÀNG'
            >
                {(form) => (
                    <CustomerForm form={form} isEdit={isEdit} customerData={selectedCustomer} />
                )}
            </CustomModal>
        </>
    )
}

export default CustomerList
