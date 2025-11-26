import {Layout} from "antd";
import {Sider} from "../const/layoutConst.tsx";
import NavigationMenu from "./NavigationMenu.tsx";

export function MainLayout({currentKey, children}: any) {
    return <Layout style={{height: '100%'}}>
        <div style={{ padding: '0 0'}}>
            <Layout style={{padding: '0 0'}}>
                <Sider width={200}>
                    <NavigationMenu currentKey={currentKey}/>
                </Sider>
                <Layout style={{ padding: '24px 24px' }}>
                    {children}
                </Layout>
            </Layout>
        </div>
    </Layout>
}