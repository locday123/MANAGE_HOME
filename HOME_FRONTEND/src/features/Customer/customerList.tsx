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

        if (isEdit && selectedCustomer) {
            try {
                await updatedCustomer(selectedCustomer.customer_ID, formData)
                setCustomers((prev) =>
                    prev.map((c) => (c.customer_ID === selectedCustomer.customer_ID ? formData : c))
                )
            } catch (error) {
                console.error("Lỗi khi cập nhật khách hàng:", error)
            }
        } else {
            try {
                await addCustomer(formData)
                setCustomers((prev) => [...prev, formData])
            } catch (error) {
                console.error("Lỗi khi tạo khách hàng:", error)
            }
        }

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
