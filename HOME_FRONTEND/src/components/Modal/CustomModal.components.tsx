// CustomModal.tsx
import {Modal, Button, Form, Space} from "antd"
import type {FormInstance} from "antd/es/form"
import {ReactNode, ReactElement} from "react"
import {HomeTwoTone, PlusOutlined, SaveOutlined} from "@ant-design/icons"
import classNames from "classnames/bind"
import styles from "./CustomModal.module.scss"

const cx = classNames.bind(styles)

type Props = {
    children: (form: FormInstance) => ReactNode
    titleText?: string
    titleIcon?: ReactNode
    entityName?: string
    visible: boolean
    setVisible: (open: boolean) => void
    setData?: (data: any) => void
    handleOk: (form: FormInstance) => void
    isEdit?: boolean
}

function CustomModal({
    children,
    titleText,
    titleIcon,
    entityName = "DỮ LIỆU",
    visible,
    setVisible,
    setData = () => {},
    handleOk,
    isEdit = false,
}: Props): ReactElement {
    const [form] = Form.useForm()

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

    const onSubmit = () => {
        handleOk(form)
    }

    const onCancel = () => {
        setVisible(false)
        setData({})
        form.resetFields()
    }

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
            onCancel={onCancel}
            closable={false}
            destroyOnClose
            footer={
                <div className={cx("modalFooter")}>
                    <div></div>
                    <Space size='middle'>
                        <Button
                            key='cancel'
                            size='large'
                            className={cx("cancelButton")}
                            onClick={onCancel}
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            key='submit'
                            type='primary'
                            size='large'
                            className={cx("submitButton")}
                            onClick={onSubmit}
                        >
                            <Space>
                                {isEdit ? <SaveOutlined /> : <PlusOutlined />}
                                {isEdit ? "Lưu thay đổi" : "Tạo mới"}
                            </Space>
                        </Button>
                    </Space>
                </div>
            }
        >
            {children(form)}
        </Modal>
    )
}

export default CustomModal
