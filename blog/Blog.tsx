import {Button, Form, Input, message} from "antd";
import axios from "axios";
import QuillEditor from "./QuillEditor";
import {useState} from "react";

export default function Blog() {
    const [form] = Form.useForm();
    const [quillValue, setQuillValue] = useState('')
    return   <Form
        form={form}
        name="login"
        onFinish={form => saveBlog(form, quillValue)}
        onFinishFailed={err => console.error(err)}
        autoComplete="off"
        layout="vertical"
    >
        <Form.Item<BlogForm>
            label="标题"
            name="title"
        >
            <Input />
        </Form.Item>
        <Form.Item<BlogForm>
            name="content"
            getValueFromEvent={(value) => value}
        >
            <QuillEditor value={quillValue} onChange={setQuillValue}/>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" block>保存</Button>
        </Form.Item>
    </Form>
}

async function saveBlog(form: BlogForm, quillValue:string) {
    const response = await axios.post<CommonResponse<any>>(
        "http://localhost:8080/blog/edit/newBlog",
        {
            "title": form.title,
            "blogText": quillValue
        }
    )
    if(!response.data.success) {
        throw Error(response.data.message)
    }
    message.success('保存成功')
}

interface BlogForm {
    title: string,
    content: string
}

interface CommonResponse<T> {
    success: boolean,
    message: string,
    data: T
}