import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Blog from "./Blog";
import NavigationMenu from "../index/NavigationMenu";
import {Layout} from "antd";
import * as React from "react";
import {Sider} from "../const/layoutConst";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Layout>
            <div style={{ padding: '0 0' }}>
                <Layout style={{padding: '0 0'}}>
                    <Sider width={200}>
                        <NavigationMenu currentKey="new-blog"/>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Blog />
                    </Layout>
                </Layout>
            </div>
        </Layout>
    </StrictMode>,
)
