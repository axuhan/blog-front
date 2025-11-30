import {Layout, theme} from "antd";
import {Sider} from "../const/layoutConst.tsx";
import NavigationMenu from "./NavigationMenu.tsx";
import {Content, Header} from "antd/es/layout/layout";

export function MainLayout({currentKey, children}: any) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <div className="demo-logo-vertical" />
                <Sider width={200} style={{background: colorBgContainer}}>
                    <NavigationMenu currentKey={currentKey}/>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />
                    <Content
                        style={{
                            margin: '16px 16px',
                            padding: '16px 16px',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
    </Layout>
}