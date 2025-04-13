import {Modal, Button, Space} from "antd"
import {HomeTwoTone, PlusOutlined, SaveOutlined} from "@ant-design/icons"
import classNames from "classnames/bind"
import styles from "./CustomModal.module.scss"

const cx = classNames.bind(styles)

const CustomModal = ({
    visible,
    setVisible,
    setData,
    handleOk,
    children,
    entityName = "DỮ LIỆU", // 👈 mặc định nếu không truyền
    titleText = null,
    titleIcon = null,
    isEdit,
}) => {
    const titleContent = titleText ?? (isEdit ? `CẬP NHẬT ${entityName}` : `TẠO MỚI ${entityName}`)

    const iconComponent = titleIcon ?? (
        <HomeTwoTone twoToneColor='#1890ff' style={{fontSize: "24px"}} />
    )

    const defaultTitle = (
        <div className={cx("modalTitle")}>
            {iconComponent}
            <span>{titleContent}</span>
        </div>
    )

    return (
        <Modal
            style={{top: "1.3rem"}}
            classNames={{
                header: cx("modalHeader"),
                body: cx("modalBody"),
            }}
            width={{
                xs: "90%",
                sm: "80%",
                md: "70%",
                lg: "60%",
                xl: "50%",
                xxl: "40%",
            }}
            title={defaultTitle}
            open={visible}
            onCancel={() => {
                setVisible(false)
                setData({})
            }}
            closable={false}
            footer={
                <div className={cx("modalFooter")}>
                    <div></div>
                    <Space size='middle'>
                        <Button
                            key='cancel'
                            size='large'
                            className={cx("cancelButton")}
                            onClick={() => {
                                setVisible(false)
                                setData({})
                            }}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            key='submit'
                            type='primary'
                            size='large'
                            className={cx("submitButton")}
                            onClick={handleOk}
                        >
                            {isEdit ? (
                                <Space>
                                    <SaveOutlined />
                                    Lưu thay đổi
                                </Space>
                            ) : (
                                <Space>
                                    <PlusOutlined />
                                    Tạo mới
                                </Space>
                            )}
                        </Button>
                    </Space>
                </div>
            }
        >
            {children}
        </Modal>
    )
}

export default CustomModal
