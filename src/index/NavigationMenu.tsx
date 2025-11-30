import {Menu, type MenuProps} from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export default function NavigationMenu({currentKey=''}) {
    const items: MenuItem[] = [
        {
            key: 'my-blog',
            label: (
                <a href="/blog/my-blog" target="_self" rel="noopener noreferrer">
                    博客
                </a>
            )
        },
        {
            key: 'tic-tac-toe',
            label: (
                <a href="/index" target="_self" rel="noopener noreferrer">
                    井字棋
                </a>
            )
        }
    ]

    return <Menu
        selectedKeys={[currentKey]}
        style={{ height: '100%', borderInlineEnd: 0}}
        theme="dark"
        mode="inline"
        items={items}
    />;
};