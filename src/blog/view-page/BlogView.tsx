import {blogApiClient, type CommonResponse} from "../../const/apiCommon.tsx";
import type {BlogVO} from "../type/blogApiType.ts";
import {useEffect, useRef, useState} from "react";
import {message} from "antd";
import {useParams} from "react-router";
import DOMPurify from 'dompurify';

export default function BlogView() {
    const { id } = useParams();

    const [blog, setBlog] = useState<BlogVO>()
    const [saveContent, setSaveContent] = useState<string>('')
    const fetched = useRef(false)

    useEffect(() => {
        if(fetched.current) {
            return;
        }
        fetched.current = true;
        const tempFunction = async () => {
            const blogVO = await getBlogView(id)
            if(!blogVO) {
                return;
            }
            setBlog(blogVO)
            setSaveContent(DOMPurify.sanitize(blogVO.content))
        }
        tempFunction()
    })

    return <>
        <h1>{blog?.title}</h1>
        <h6>{blog?.gmtCreate}</h6>
        <div dangerouslySetInnerHTML={{__html: saveContent}}></div>
    </>
}

async function getBlogView(blogId: string | undefined) {
    if(!blogId) {
        message.error("文章不存在");
        return;
    }
    return blogApiClient.get<CommonResponse<BlogVO>>(
        `/blog/view/${blogId}`
    ).then(response => {
        if(!response.data.success) {
            message.error("系统繁忙")
            return null
        }
        return response.data.data
    }).catch(err => {
        console.error(err)
        if(err.response?.status == 404) {
            message.error("文章不存在");
        } else {
            message.error("系统繁忙")
        }
        return null;
    })
}