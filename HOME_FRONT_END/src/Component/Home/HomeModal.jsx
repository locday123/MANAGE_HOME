import {Card, DatePicker, Form, Input, InputNumber, Select, Space} from "antd"
const {RangePicker} = DatePicker
import classnames from "classnames/bind"
import style from "../../assets/ComponentCSS/Home/HomeModal.module.scss"
import AddressForm from "../Extend/Address/AddressForm"
import {useEffect, useState} from "react"
import {createAddressHandlers} from "../Extend/Address/useAddressHandler"
import {getProvinces} from "../../Service/Location/LocationSerivce"
const cx = classnames.bind(style)
function HomeModal({homeData, setHomeData}) {
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
    })
    const handleChange = (key, value) => {
        setHomeData((prev) => ({...prev, [key]: value}))
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
    return (
        <Form layout='vertical'>
            <Space direction='vertical'>
                <Card title='Thông tin chủ nhà'>
                    <Form.Item
                        label='Căn cước công dân'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập CCCD",
                            },
                        ]}
                    >
                        <Input.OTP size='large' length={12} />
                    </Form.Item>
                    <Form.Item
                        label='Họ và tên'
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập họ và tên",
                            },
                        ]}
                    >
                        <Input size='large' />
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
                        <Input.OTP size='large' length={10} />
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
                            style={{width: "100%"}}
                            format='DD/MM/YYYY'
                            allowClear
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
                            min={0}
                            placeholder='Giá thuê'
                            size='large'
                            style={{width: "100%"}}
                            formatter={(value) => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
                            placeholder='Số tầng'
                            min={0}
                            size='large'
                            style={{width: "100%"}}
                        />
                    </Form.Item>
                    <Form.Item label='Tình trạng'>
                        <Select size='large'>
                            <Option value='ACTIVE'>Active</Option>
                            <Option value='INACTIVE'>Inactive</Option>
                        </Select>
                    </Form.Item>
                </Card>
            </Space>
        </Form>
    )
}

export default HomeModal
