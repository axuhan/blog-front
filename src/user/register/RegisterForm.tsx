import {Button, Form, Input, Layout} from "antd";
import {handleRegister} from "./registerApi.tsx";
import {useState} from "react";
import {type ValidateStatus} from "antd/es/form/FormItem";

type RegisterFormType = {
    userName: string,
    nickName: string,
    password: string,
    confirmPassword: string
}

export function RegisterForm() {
    const [form] = Form.useForm();
    const [confirmPasswordStatus, setConfirmPasswordStatus] = useState<{
        validateStatus: ValidateStatus;
        errorMsg: string | null;
    }>({
        validateStatus: 'success',
        errorMsg: null
    })
    const comparePassword = () => {
        if(form.getFieldValue("password") ==  form.getFieldValue("confirmPassword")) {
            setConfirmPasswordStatus({
                validateStatus: 'success',
                errorMsg: null
            })
        } else {
            setConfirmPasswordStatus({
                validateStatus: 'error',
                errorMsg: '两次输入密码不一致'
            })
        }
    }
    return <Layout>
        <Form name="register"
              form={form}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={handleRegister}
              autoComplete="off"
        >
            <Form.Item<RegisterFormType>
                label="用户名"
                name="userName"
                rules={[
                    { required: true, message: '用户名不能为空' },
                    { min: 6, message: '用户名不能少于6个字符'},
                    { max: 32, message: '用户名不能超过32个字符'},
                    { pattern: /^[0-9a-zA-Z_]+$/, message: '用户名只能由位数字、字母、下划线组成'}
                ]}
                >
                <Input />
            </Form.Item>
            <Form.Item<RegisterFormType>
                label="昵称"
                name="nickName"
                rules={[
                    { required: true, message: '昵称不能为空' },
                    { min: 6, message: '昵称不能少于6个字符'},
                    { max: 32, message: '昵称不能超过32个字符'},
                    { pattern: /^[0-9a-zA-Z_]+$/, message: '昵称只能由位数字、字母、下划线组成'}
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item<RegisterFormType>
                label="密码"
                name="password"
                rules={[
                    { required: true, message: '密码不能为空' },
                    { min: 10, message: '密码不能少于10个字符'},
                    { max: 32, message: '密码不能超过32个字符'},
                    { pattern: /^[0-9a-zA-Z_!@#$%^&*,./?;:]+$/, message: '密码只能由数字、字母、特殊符号组成'}
                ]}
            >
                <Input.Password onChange={comparePassword}/>
            </Form.Item>
            <Form.Item<RegisterFormType>
                label="确认密码"
                name="confirmPassword"
                rules={[{ required: true, message: '密码不能为空' }]}
                validateStatus={confirmPasswordStatus.validateStatus}
                help={confirmPasswordStatus.errorMsg}
            >
                <Input.Password onChange={comparePassword}/>
            </Form.Item>

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    注册
                </Button>
            </Form.Item>
        </Form>
    </Layout>
}