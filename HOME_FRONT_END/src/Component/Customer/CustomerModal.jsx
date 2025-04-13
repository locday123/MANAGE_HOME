import {DatePicker, Form, Input, Select} from "antd"

import dayjs from "dayjs"
import AddressForm from "../Extend/Address/AddressForm"
import {createAddressHandlers} from "../Extend/Address/useAddressHandler"
import {useEffect, useState} from "react"
import {getDistricts, getProvinces, getWards} from "../../Service/Location/LocationSerivce"

function CustomerModal({isEdit, customerData, setCustomerData}) {
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
    })
    const handleChange = (key, value) => {
        setCustomerData((prev) => ({...prev, [key]: value}))
    }
    const {handleProvinceChange, handleDistrictChange} = createAddressHandlers(
        setLocationData,
        handleChange
    )

    useEffect(() => {
        getProvinces()
            .then((res) => {
                setLocationData((prev) => ({
                    ...prev,
                    provinces: res.data,
                    loadingProvinces: false,
                }))
            })
            .catch(() => setLocationData((prev) => ({...prev, loadingProvinces: false})))
    }, [])

    useEffect(() => {
        const init = async () => {
            // Bước 1: Load tỉnh
            if (customerData?.customer_Province) {
                setLocationData((prev) => ({
                    ...prev,
                    selectedProvince: customerData.customer_Province,
                    loadingDistricts: true,
                    loadingWards: true,
                    districts: [],
                    wards: [],
                }))
                handleChange("customer_Province", customerData.customer_Province)

                const resDistricts = await getDistricts(customerData.customer_Province)

                setLocationData((prev) => ({
                    ...prev,
                    districts: resDistricts.data,
                    loadingDistricts: false,
                }))
            }

            // Bước 2: Load quận
            if (customerData?.customer_District) {
                setLocationData((prev) => ({
                    ...prev,
                    selectedDistrict: customerData.customer_District,
                    loadingWards: true,
                    wards: [],
                }))
                handleChange("customer_District", customerData.customer_District)

                const resWards = await getWards(customerData.customer_District)

                setLocationData((prev) => ({
                    ...prev,
                    wards: resWards.data,
                    loadingWards: false,
                }))
            }

            // Bước 3: Gán lại ward nếu có
            if (customerData?.customer_Ward) {
                handleChange("customer_Ward", customerData.customer_Ward)
                setLocationData((prev) => ({
                    ...prev,
                    selectedWard: customerData.customer_Ward,
                }))
            }
        }

        init()
    }, [
        customerData?.customer_Province,
        customerData?.customer_District,
        customerData?.customer_Ward,
    ])

    return (
        <Form layout='vertical'>
            <Form.Item
                label='Căn cước công dân'
                rules={[{required: true, message: "Vui lòng nhập CCCD"}]}
            >
                <Input.OTP
                    size='large'
                    length={12}
                    value={customerData?.customer_ID || ""}
                    onChange={(value) => handleChange("customer_ID", value)}
                    disabled={isEdit}
                    // Khi thêm mới, chỉ cho nhập, không khóa
                />
            </Form.Item>
            <Form.Item label='Họ tên' rules={[{required: true, message: "Vui lòng nhập họ tên"}]}>
                <Input
                    size='large'
                    value={customerData?.customer_Name || ""}
                    onChange={(e) => handleChange("customer_Name", e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label='Giới tính'
                rules={[{required: true, message: "Vui lòng chọn giới tính"}]}
            >
                <Select
                    size='large'
                    value={customerData?.customer_Sex}
                    onChange={(value) => handleChange("customer_Sex", value)}
                    placeholder='Chọn giới tính'
                >
                    <Select.Option value={true}>Nam</Select.Option>
                    <Select.Option value={false}>Nữ</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item
                label='Số điện thoại'
                rules={[{required: true, message: "Vui lòng nhập số điện thoại"}]}
            >
                <Input.OTP
                    size='large'
                    length={10}
                    value={customerData?.customer_PhoneNumber || ""}
                    onChange={(value) => handleChange("customer_PhoneNumber", value)}
                />
            </Form.Item>

            <Form.Item label='Địa chỉ'>
                <AddressForm
                    locationData={locationData}
                    data={customerData}
                    handleProvinceChange={handleProvinceChange}
                    handleDistrictChange={handleDistrictChange}
                    handleChange={handleChange}
                    prefix='customer_'
                />
            </Form.Item>

            <Form.Item
                label='Ngày sinh'
                rules={[{required: true, message: "Vui lòng nhập ngày sinh"}]}
            >
                <DatePicker
                    size='large'
                    format='DD/MM/YYYY'
                    style={{width: "100%"}}
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
                    size='large'
                    value={customerData?.customer_Status || "ACTIVE"}
                    onChange={(value) => handleChange("customer_Status", value)}
                >
                    <Option value='ACTIVE'>Active</Option>
                    <Option value='INACTIVE'>Inactive</Option>
                </Select>
            </Form.Item>
        </Form>
    )
}

export default CustomerModal
