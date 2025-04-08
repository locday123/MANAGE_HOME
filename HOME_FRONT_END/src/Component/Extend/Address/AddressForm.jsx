import {Input, Select, Space} from "antd"

function AddressForm({
    locationData,
    data,
    handleProvinceChange,
    handleDistrictChange,
    handleChange,
    prefix = "", // ví dụ: 'customer_', 'shipping_', v.v.
}) {
    const getField = (field) => data?.[`${prefix}${field}`] ?? ""
    const setField = (field, value) => handleChange(`${prefix}${field}`, value)

    return (
        <Space direction='vertical' style={{width: "100%"}}>
            <Select
                size='large'
                placeholder='Tỉnh - Thành phố'
                value={locationData.selectedProvince}
                loading={locationData.loadingProvinces}
                onChange={(value) => handleProvinceChange(value)}
                options={locationData.provinces.map(({id, full_name}) => ({
                    key: id,
                    value: id,
                    label: full_name,
                }))}
            />
            <Select
                size='large'
                placeholder='Quận - Huyện'
                value={locationData.selectedDistrict}
                loading={locationData.loadingDistricts}
                onChange={(value) => handleDistrictChange(value)}
                options={locationData.districts.map(({id, full_name}) => ({
                    key: id,
                    value: id,
                    label: full_name,
                }))}
            />
            <Select
                size='large'
                placeholder='Phường - Xã'
                value={getField("Ward").toString() || null}
                loading={locationData.loadingWards}
                onChange={(value) => setField("Ward", value)}
                options={locationData.wards.map(({id, full_name}) => ({
                    key: id,
                    value: id,
                    label: full_name,
                }))}
            />
            <Input
                size='large'
                placeholder='Số nhà - Tên đường'
                value={getField("Address")}
                onChange={(e) => setField("Address", e.target.value)}
            />
        </Space>
    )
}

export default AddressForm
