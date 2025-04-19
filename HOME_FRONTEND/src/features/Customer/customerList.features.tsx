import { Button, Card } from "antd";
import { useState, useEffect } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import type { FormInstance } from "antd";

import CustomTable from "../../components/Table/CustomTable.components";
import CustomModal from "../../components/Modal/CustomModal.components";
import Customer from "../../types/customer.type";

import CustomerForm from "./customerForm.features";
import CustomerStatistics from "./customerStatistics.features";
import getCustomerColumns from "./customerColumns.features";
import CustomerFilter from "./customerFilter.features";

import { handleDeleteCustomer, handleOkCustomer } from "./customer.handlers";
import { filterCustomers } from "./customer.utils";
import { getAllCustomer } from "../../services/Customer/customer.service";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
        null
    );

    const filteredData = filterCustomers(customers, searchValue);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllCustomer();
                if (result?.data && Array.isArray(result.data)) {
                    setCustomers(result.data);
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
        await handleOkCustomer(
            form,
            isEdit,
            selectedCustomer,
            setCustomers,
            setModalOpen,
            setSelectedCustomer,
            setIsEdit
        );
    };

    const handleDelete = async (customer: Customer) => {
        await handleDeleteCustomer(customer, setCustomers);
    };

    return (
        <>
            <CustomerStatistics customers={customers} />
            <Card
                title={
                    <CustomerFilter
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                    />
                }
                extra={
                    <Button
                        icon={<UserAddOutlined style={{ fontSize: "22px" }} />}
                        type='primary'
                        onClick={() => {
                            setIsEdit(false);
                            setSelectedCustomer(null);
                            setModalOpen(true);
                        }}
                    />
                }
            >
                <CustomTable<Customer>
                    columns={getCustomerColumns({
                        onEdit: (customer) => {
                            setSelectedCustomer(customer);
                            setIsEdit(true);
                            setModalOpen(true);
                        },
                        onDelete: handleDelete, // Truyền trực tiếp handleDelete vào
                    })}
                    dataSource={filteredData}
                    pagination={false}
                    scroll={{ x: "max-content" }}
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
                    <CustomerForm
                        form={form}
                        isEdit={isEdit}
                        customerData={selectedCustomer}
                    />
                )}
            </CustomModal>
        </>
    );
}

export default CustomerList;
