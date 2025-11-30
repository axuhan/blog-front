import {Button, Form, Input, message} from "antd";
import QuillEditor from "./QuillEditor.tsx";
import {useState} from "react";
import {blogApiClient, type CommonResponse} from "../../const/apiCommon.tsx";
import './QuillEditorStyle.css';

export default function BlogEditor() {
    const [form] = Form.useForm();
    const [quillValue, setQuillValue] = useState('')
    return   <Form
        form={form}
        name="editor"
        onFinish={form => saveBlog(form, quillValue)}
        onFinishFailed={err => console.error(err)}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        style={{ minWidth: '100vw' }}
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
            <QuillEditor value={quillValue} onChange={setQuillValue} />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" block style={{width:200}}>
                保存
            </Button>
        </Form.Item>
    </Form>
}

async function saveBlog(form: BlogForm, quillValue:string) {
    await blogApiClient.post<CommonResponse<any>>(
        `/blog/edit/newBlog`,
        {
            "title": form.title,
            "blogText": quillValue
        }
    ).then(response => {
        if(!response.data.success) {
            message.error(response.data.message)
        }
        message.success('保存成功')
    }).catch(err => {
        message.error('保存失败')
        console.error(err)
    });
}

interface BlogForm {
    title: string,
    content: string
}