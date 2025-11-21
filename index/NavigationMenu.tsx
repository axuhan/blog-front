import {Layout, Menu, MenuProps, theme} from "antd";
import {useState} from "react";

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
                <a href="/blog/main" target="_blank" rel="noopener noreferrer">
                    写博客
                </a>
            )
        }
    ]
    const [current, setCurrent] = useState(currentKey);

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu
        onClick={onClick}
        selectedKeys={[current]}
        style={{ height: '100%', borderInlineEnd: 0}}
        mode="inline"
        items={items}
    />;
};