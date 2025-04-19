// components/Table/CustomTable.tsx

import {Table, TableProps} from "antd"
import {ColumnsType} from "antd/es/table"

type CustomTableProps<T> = {
    columns: ColumnsType<T>
    dataSource: T[]
} & Omit<TableProps<T>, "columns" | "dataSource">

function CustomTable<T extends object>({columns, dataSource, ...rest}: CustomTableProps<T>) {
    return <Table columns={columns} dataSource={dataSource} {...rest} />
}

export default CustomTable
