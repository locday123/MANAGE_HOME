import {
    Card,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
} from "antd";
const { RangePicker } = DatePicker;
import classnames from "classnames/bind";
import style from "../../assets/ComponentCSS/Home/HomeModal.module.scss";
import AddressForm from "../Extend/Address/AddressForm";
import { useEffect, useState } from "react";
import { createAddressHandlers } from "../Extend/Address/useAddressHandler";
import {
    getDistricts,
    getProvinces,
    getWards,
} from "../../Service/Location/LocationSerivce";
import dayjs from "dayjs";
const cx = classnames.bind(style);
function HomeModal({ homeData, setHomeData }) {
    const [locationData, setLocationData] = useState({
        provinces: [],
        districts: [],
        wards: [],
        selectedProvince: homeData?.home_Province || null,
        selectedDistrict: homeData?.home_District || null,
        selectedWard: homeData?.home_Ward || null,
        loadingProvinces: true,
        loadingDistricts: false,
        loadingWards: false,
    });
    const handleChange = (key, value) => {
        setHomeData((prev) => ({ ...prev, [key]: value }));
    };
    const { handleProvinceChange, handleDistrictChange } =
        createAddressHandlers(setLocationData, handleChange);

    useEffect(() => {
        getProvinces()
            .then((res) => {
                setLocationData((prev) => ({
                    ...prev,
                    provinces: res.data,
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
        const init = async () => {
            // Bước 1: Load tỉnh
            if (homeData?.home_Province) {
                setLocationData((prev) => ({
                    ...prev,
                    selectedProvince: homeData.home_Province,
                    loadingDistricts: true,
                    loadingWards: true,
                    districts: [],
                    wards: [],
                }));
                handleChange("home_Province", homeData.home_Province);

                const resDistricts = await getDistricts(homeData.home_Province);

                setLocationData((prev) => ({
                    ...prev,
                    districts: resDistricts.data,
                    loadingDistricts: false,
                }));
            }

            // Bước 2: Load quận
            if (homeData?.home_District) {
                setLocationData((prev) => ({
                    ...prev,
                    selectedDistrict: homeData.home_District,
                    loadingWards: true,
                    wards: [],
                }));
                handleChange("home_District", homeData.home_District);

                const resWards = await getWards(homeData.home_District);

                setLocationData((prev) => ({
                    ...prev,
                    wards: resWards.data,
                    loadingWards: false,
                }));
            }

            // Bước 3: Gán lại ward nếu có
            if (homeData?.home_Ward) {
                handleChange("home_Ward", homeData.home_Ward);
                setLocationData((prev) => ({
                    ...prev,
                    selectedWard: homeData.home_Ward,
                }));
            }
        };

        init();
    }, [homeData?.home_Province, homeData?.home_District, homeData?.home_Ward]);
    return (
        <Form layout='vertical'>
            <Space direction='vertical'>
                <Card title='Thông tin chủ nhà'>
                    <Form.Item
                        label='Họ và tên'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập họ và tên",
                            },
                        ]}
                    >
                        <Input
                            size='large'
                            value={homeData?.home_HostName || ""}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Căn cước công dân'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập CCCD",
                            },
                        ]}
                    >
                        <Input.OTP
                            size='large'
                            length={12}
                            value={homeData?.home_HostID || ""}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Số điện thoại'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại",
                                pattern: "^(0[3|5|7|8|9])[0-9]{8}$",
                            },
                        ]}
                    >
                        <Input.OTP
                            size='large'
                            length={10}
                            value={homeData?.home_HostPhoneNumber || ""}
                        />
                    </Form.Item>
                </Card>
                <Card title='Thông tin nhà thuê'>
                    <Form.Item label='Địa chỉ'>
                        <AddressForm
                            locationData={locationData}
                            data={homeData}
                            handleProvinceChange={handleProvinceChange}
                            handleDistrictChange={handleDistrictChange}
                            handleChange={handleChange}
                            prefix='home_'
                        />
                    </Form.Item>
                    <Form.Item label='Thời gian hợp đồng'>
                        <RangePicker
                            size='large'
                            style={{ width: "100%" }}
                            format='DD/MM/YYYY'
                            allowClear
                            value={[
                                dayjs(homeData.home_ContractFrom),
                                dayjs(homeData.home_ContractTo),
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Giá thuê'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng thêm giá thuê",
                            },
                        ]}
                    >
                        <InputNumber
                            value={homeData?.home_RentalPrice || ""}
                            min={0}
                            placeholder='Giá thuê'
                            size='large'
                            style={{ width: "100%" }}
                            formatter={(value) =>
                                ` ${value}`.replace(
                                    /\B(?=(\d{3})+(?!\d))/g,
                                    ","
                                )
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label='Số tầng'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng thêm tầng",
                            },
                        ]}
                    >
                        <InputNumber
                            value={homeData?.home_TotalFloors || ""}
                            placeholder='Số tầng'
                            min={0}
                            size='large'
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item label='Tình trạng'>
                        <Select
                            size='large'
                            value={homeData?.home_Status || ""}
                        >
                            <Option value='ACTIVE'>ACTIVE</Option>
                            <Option value='INACTIVE'>INACTIVE</Option>
                        </Select>
                    </Form.Item>
                </Card>
            </Space>
        </Form>
    );
}

export default HomeModal;
