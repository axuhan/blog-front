import {Menu, type MenuProps} from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export default function NavigationMenu({currentKey=''}) {
    const items: MenuItem[] = [
        {
            key: 'tic-tac-toe',
            label: (
                <a href="/index" target="_blank" rel="noopener noreferrer">
                    井字棋
                </a>
            )
        },
        {
            key: 'new-blog',
            label: (
                <a href="/blog/newBlog" target="_blank" rel="noopener noreferrer">
                    写博客
                </a>
            )
        }
    ]

    return <Menu
        selectedKeys={[currentKey]}
        style={{ height: '100%', borderInlineEnd: 0}}
        mode="inline"
        items={items}
    />;
};