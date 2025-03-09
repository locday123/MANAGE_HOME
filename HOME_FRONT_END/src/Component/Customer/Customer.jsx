import {Menu, Tabs} from "antd"

function Customer() {
    return (
        <>
            <Tabs
                tabPosition={"left"}
                items={Array.from({length: 3}).map((_, i) => {
                    const id = String(i + 1)
                    return {
                        label: `Tab ${id}`,
                        key: id,
                        children: `Content of Tab ${id}`,
                    }
                })}
                renderTabBar={(props) => <Menu {...props} style={{color: "red"}} />}
            />
        </>
    )
}

export default Customer
