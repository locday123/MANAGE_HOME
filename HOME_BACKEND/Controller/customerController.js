import Customer from "../Model/CustomerModel.js";
import { nanoid } from "nanoid"; // Thêm nanoid để tạo mã ngẫu nhiên

// Lấy tất cả khách hàng
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json({
            status: 200,
            data: customers,
        }); // Trả về tấssa1`t cả khách hàng
    } catch (error) {
        console.error("❌ Lỗi khi lấy tất cả khách hàng:", error);
        res.status(500).json({ message: "Có lỗi xảy ra" });
    }
};

const createCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(201).json(customer);
    } catch (error) {
        console.error("❌ Lỗi tạo khách hàng:", error);
        res.status(500).json({ message: "Lỗi tạo khách hàng", error });
    }
};

const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Customer.destroy({
            where: { customer_ID: id },
        });

        if (deleted) {
            res.json({ message: "✅ Khách hàng đã được xóa" });
        } else {
            res.status(404).json({ message: "❌ Không tìm thấy khách hàng" });
        }
    } catch (error) {
        console.error("❌ Lỗi khi xóa khách hàng:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const [updated] = await Customer.update(data, {
            where: { customer_ID: id },
        });

        if (updated) {
            const updatedCustomer = await Customer.findByPk(id);
            res.json(updatedCustomer);
        } else {
            res.status(404).json({
                message: "❌ Không tìm thấy khách hàng để cập nhật",
            });
        }
    } catch (error) {
        console.error("❌ Lỗi cập nhật khách hàng:", error);
        res.status(500).json({ message: "Lỗi máy chủ", error });
    }
};

export { getAllCustomers, createCustomer, deleteCustomer, updateCustomer };
