import { DatePicker, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import {
    getDistricts,
    getProvinces,
    getWards,
} from "../../Service/Location/LocationSerivce";
import dayjs from "dayjs";

function HomeModal({ customerData, setCustomerData }) {
    const [locationData, setLocationData] = useState({
        provinces: [],
        districts: [],
        wards: [],
        selectedProvince: customerData?.customer_Province || null,
        selectedDistrict: customerData?.customer_District || null,
        selectedWard: customerData?.customer_Ward || null,
        loadingProvinces: true,
        loadingDistricts: false,
        loadingWards: false,
    });

    useEffect(() => {
        getProvinces()
            .then((value) => {
                setLocationData((prev) => ({
                    ...prev,
                    provinces: value.data,
                    loadingProvinces: false,
                }));
            })
            .catch(() =>
                setLocationData((prev) => ({
                    ...prev,
                    loadingProvinces: false,
                }))
            );
    }, []);

    useEffect(() => {
        if (customerData?.customer_Province) {
            handleProvinceChange(customerData.customer_Province, false);
        }
    }, [customerData?.customer_Province]);

    useEffect(() => {
        if (customerData?.customer_District) {
            handleDistrictChange(customerData.customer_District, false);
        }
    }, [customerData?.customer_District]);

    const handleChange = (key, value) => {
        setCustomerData((prev) => ({ ...prev, [key]: value }));
    };

    const handleProvinceChange = (provinceId, reset = true) => {
        setLocationData((prev) => ({
            ...prev,
            selectedProvince: provinceId,
            selectedDistrict: reset ? null : prev.selectedDistrict,
            selectedWard: reset ? null : prev.selectedWard,
            districts: reset ? [] : prev.districts,
            wards: reset ? [] : prev.wards,
            loadingDistricts: true,
        }));
        handleChange("customer_Province", provinceId);
        if (reset) {
            handleChange("customer_District", null);
            handleChange("customer_Ward", null);
        }

        getDistricts(provinceId)
            .then((value) =>
                setLocationData((prev) => ({
                    ...prev,
                    districts: value.data,
                    loadingDistricts: false,
                }))
            )
            .catch(() =>
                setLocationData((prev) => ({
                    ...prev,
                    loadingDistricts: false,
                }))
            );
    };

    const handleDistrictChange = async (districtId) => {
        setLocationData((prev) => ({
            ...prev,
            selectedDistrict: districtId,
            selectedWard: null,
            wards: [],
            loadingWards: true,
        }));

        handleChange("customer_District", districtId);
        handleChange("customer_Ward", null);

        try {
            const { data } = await getWards(districtId);
            setLocationData((prev) => ({
                ...prev,
                wards: data,
                loadingWards: false,
            }));

            if (data.length > 0) {
                handleChange("customer_Ward", data[0].id);
            }
        } catch (error) {
            console.error("Lỗi khi lấy phường/xã:", error);
            setLocationData((prev) => ({ ...prev, loadingWards: false }));
        }
    };

    return (
        <Form layout='vertical'>
            {!customerData?.customer_ID && (
                <Form.Item
                    label='Căn cước công dân'
                    rules={[
                        { required: true, message: "Please enter customer ID" },
                    ]}
                >
                    <Input.OTP
                        length={12}
                        value={customerData?.customer_ID || ""}
                        onChange={(value) => handleChange("customer_ID", value)}
                    />
                </Form.Item>
            )}
            <Form.Item
                label='Họ tên'
                rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
                <Input
                    value={customerData?.customer_Name || ""}
                    onChange={(e) =>
                        handleChange("customer_Name", e.target.value)
                    }
                />
            </Form.Item>
            <Form.Item
                label='Số điện thoại'
                rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                ]}
            >
                <Input.OTP
                    length={10}
                    value={customerData?.customer_PhoneNumber || ""}
                    onChange={(value) =>
                        handleChange("customer_PhoneNumber", value)
                    }
                />
            </Form.Item>

            <Form.Item label='Địa chỉ'>
                <Space direction='vertical' style={{ width: "100%" }}>
                    <Select
                        placeholder='Tỉnh - Thành phố'
                        value={locationData.selectedProvince}
                        loading={locationData.loadingProvinces}
                        onChange={(value) => handleProvinceChange(value)}
                        options={locationData.provinces.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Select
                        placeholder='Quận - Huyện'
                        value={locationData.selectedDistrict}
                        loading={locationData.loadingDistricts}
                        onChange={(value) => handleDistrictChange(value)}
                        options={locationData.districts.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Select
                        placeholder='Phường - Xã'
                        value={
                            locationData.wards.some(
                                (w) => w.id === customerData?.customer_Ward
                            )
                                ? customerData.customer_Ward
                                : null
                        }
                        loading={locationData.loadingWards}
                        onChange={(value) =>
                            handleChange("customer_Ward", value)
                        }
                        options={locationData.wards.map(
                            ({ id, full_name }) => ({
                                key: id,
                                value: id,
                                label: full_name,
                            })
                        )}
                    />
                    <Input
                        placeholder='Số nhà - Tên đường'
                        value={customerData?.customer_Address || ""}
                        onChange={(e) =>
                            handleChange("customer_Address", e.target.value)
                        }
                    />
                </Space>
            </Form.Item>

            <Form.Item
                label='Ngày sinh'
                rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
                <DatePicker
                    format='DD/MM/YYYY'
                    style={{ width: "100%" }}
                    value={
                        customerData?.customer_Date
                            ? dayjs(customerData.customer_Date, "YYYY-MM-DD")
                            : null
                    }
                    onChange={(date) => handleChange("customer_Date", date)}
                />
            </Form.Item>

            <Form.Item label='Tình trạng'>
                <Select
                    value={customerData?.customer_Status || "ACTIVE"}
                    onChange={(value) => handleChange("customer_Status", value)}
                >
                    <Option value='ACTIVE'>Active</Option>
                    <Option value='INACTIVE'>Inactive</Option>
                </Select>
            </Form.Item>
        </Form>
    );
}

export default HomeModal;
