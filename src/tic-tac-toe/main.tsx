import './style.css'
import {Layout} from "antd";
import TicTacToeGame from "./TicTacToeGame.tsx";
import {Sider} from "../const/layoutConst";
import NavigationMenu from "../index/NavigationMenu";

export function TicTacToePage() {
    return <Layout>
        <div style={{ padding: '0 0' }}>
            <Layout style={{padding: '0 0'}}>
                <Sider width={200}>
                    <NavigationMenu currentKey="tic-tac-toe"/>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <TicTacToeGame />
                </Layout>
            </Layout>
        </div>
    </Layout>
}


