import {Button, Form, Input, Layout} from "antd";
import {handleLogin, isLogin} from "./loginApi.tsx";
import {useEffect, useRef} from "react";

type LoginFormType = {
    userName: string,
    password: string
}

export function LoginForm() {
    const checkedLogin = useRef(false)
    useEffect(() => {
        if(checkedLogin.current) {
            return;
        }
        checkedLogin.current = true
        const tmpFunction = async () => isLogin().then(res => console.log(res))
        tmpFunction()
    })
    return <Layout>
        <Form name="login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              autoComplete="off"
        >
            <Form.Item<LoginFormType>
                label="用户名"
                name="userName"
                rules={[
                    { required: true, message: '用户名不能为空' }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item<LoginFormType>
                label="密码"
                name="password"
                rules={[
                    { required: true, message: '密码不能为空' }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
    </Layout>
}