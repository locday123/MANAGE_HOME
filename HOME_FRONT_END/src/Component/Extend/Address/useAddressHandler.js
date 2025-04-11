import {
    getDistricts,
    getWards,
} from "../../../Service/Location/LocationSerivce";

export const createAddressHandlers = (setLocationData) => {
    // Biến cờ để kiểm soát các request đang chờ xử lý
    let pendingDistrictRequest = null;
    let pendingWardRequest = null;

    const handleProvinceChange = async (setField, provinceId, reset = true) => {
        // Hủy bỏ request quận/huyện đang chờ nếu có
        if (pendingDistrictRequest) {
            pendingDistrictRequest.cancel();
        }

        setLocationData((prev) => {
            // Kiểm tra nếu provinceId không thay đổi thì không làm gì
            if (prev.selectedProvince === provinceId) return prev;

            return {
                ...prev,
                selectedProvince: provinceId,
                selectedDistrict: reset ? null : prev.selectedDistrict,
                selectedWard: reset ? null : prev.selectedWard,
                districts: reset ? [] : prev.districts,
                wards: reset ? [] : prev.wards,
                loadingDistricts: true,
                loadingWards: false,
            };
        });

        setField("Province", provinceId);
        if (reset) {
            setField("District", null);
            setField("Ward", null);
        }

        try {
            pendingDistrictRequest = getDistricts(provinceId);
            const res = await pendingDistrictRequest;

            setLocationData((prev) => ({
                ...prev,
                districts: res.data,
                loadingDistricts: false,
            }));
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error("Lỗi khi lấy quận/huyện:", err);
                setLocationData((prev) => ({
                    ...prev,
                    loadingDistricts: false,
                }));
            }
        } finally {
            pendingDistrictRequest = null;
        }
    };

    const handleDistrictChange = async (
        setField,
        districtId,
        autoSelectWard = true
    ) => {
        // Hủy bỏ request phường/xã đang chờ nếu có
        if (pendingWardRequest) {
            pendingWardRequest.cancel();
        }

        setLocationData((prev) => {
            // Kiểm tra nếu districtId không thay đổi thì không làm gì
            if (prev.selectedDistrict === districtId) return prev;

            return {
                ...prev,
                selectedDistrict: districtId,
                selectedWard: null,
                wards: [],
                loadingWards: true,
            };
        });

        setField("District", districtId);
        setField("Ward", null);

        try {
            pendingWardRequest = getWards(districtId);
            const { data } = await pendingWardRequest;

            setLocationData((prev) => ({
                ...prev,
                wards: data,
                loadingWards: false,
            }));

            if (autoSelectWard && data.length > 0) {
                setField("Ward", data[0].id);
                setLocationData((prev) => ({
                    ...prev,
                    selectedWard: data[0].id,
                }));
            }
        } catch (err) {
            if (err.name !== "CanceledError") {
                console.error("Lỗi khi lấy phường/xã:", err);
                setLocationData((prev) => ({
                    ...prev,
                    loadingWards: false,
                }));
            }
        } finally {
            pendingWardRequest = null;
        }
    };

    return { handleProvinceChange, handleDistrictChange };
};
