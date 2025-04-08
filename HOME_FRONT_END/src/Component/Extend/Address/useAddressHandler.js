import {getDistricts, getWards} from "../../../Service/Location/LocationSerivce"

export const createAddressHandlers = (setLocationData, handleChange) => {
    const handleProvinceChange = (provinceId, reset = true) => {
        setLocationData((prev) => ({
            ...prev,
            selectedProvince: provinceId,
            selectedDistrict: reset ? null : prev.selectedDistrict,
            selectedWard: reset ? null : prev.selectedWard,
            districts: reset ? [] : prev.districts,
            wards: reset ? [] : prev.wards,
            loadingDistricts: true,
        }))

        handleChange("customer_Province", provinceId)
        if (reset) {
            handleChange("customer_District", null)
            handleChange("customer_Ward", null)
        }

        getDistricts(provinceId)
            .then((res) => {
                setLocationData((prev) => ({
                    ...prev,
                    districts: res.data,
                    loadingDistricts: false,
                }))
            })
            .catch(() =>
                setLocationData((prev) => ({
                    ...prev,
                    loadingDistricts: false,
                }))
            )
    }

    const handleDistrictChange = async (districtId, autoSelectWard = true) => {
        setLocationData((prev) => ({
            ...prev,
            selectedDistrict: districtId,
            selectedWard: null,
            wards: [],
            loadingWards: true,
        }))

        handleChange("customer_District", districtId)
        handleChange("customer_Ward", null)

        try {
            const {data} = await getWards(districtId)
            setLocationData((prev) => ({
                ...prev,
                wards: data,
                loadingWards: false,
            }))

            if (autoSelectWard && data.length > 0) {
                handleChange("customer_Ward", data[0].id)
            }
        } catch (err) {
            console.error("Lỗi lấy phường/xã:", err)
            setLocationData((prev) => ({...prev, loadingWards: false}))
        }
    }

    return {handleProvinceChange, handleDistrictChange}
}
