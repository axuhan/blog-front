import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import {Layout} from "antd";
import NavigationMenu from "./NavigationMenu";
import Game from "./App";
import * as React from "react";
import {Sider} from "../const/layoutConst";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Layout>
          <div style={{ padding: '0 0' }}>
              <Layout style={{padding: '0 0'}}>
                  <Sider width={200}>
                      <NavigationMenu currentKey="tic-tac-toe"/>
                  </Sider>
                  <Layout style={{ padding: '0 24px 24px' }}>
                      <Game />
                  </Layout>
              </Layout>
          </div>
      </Layout>
  </StrictMode>,
)


