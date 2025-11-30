import {useEffect, useRef, useState} from "react";
import {Pagination} from "antd";
import type {CommonPage} from "../../const/type/CommonPage.tsx";
import type {BlogVO} from "../type/blogApiType.ts";
import {queryMyBLogs} from "../blogApi.ts";

export function BlogList() {
    const firstFetch = useRef(false);
    const [page, setPage] = useState<CommonPage<BlogVO>>({
        "pageNo": 1,
        "pageSize": 10,
        "list": [],
        "total": 0,
        "totalPage": 1,
    });
    const [blogItems, setBlogItems] = useState(Array(0));

    const refreshPage = async (pageNo: number, pageSize: number)=>  {
        const newPage = await queryMyBLogs(pageNo, pageSize);
        if(!newPage) {
            return;
        }
        setPage(newPage)
        setBlogItems(BlogItems(newPage.list))
    }

    useEffect(() => {
        if(firstFetch.current) {
            return;
        }
        firstFetch.current = true
        const tempFunction = async () => await refreshPage(1, 10)
        tempFunction()
    }, [])

    return <>
        <a href="/blog/newBlog" target="_self" >写博客</a>
        <div>
            <ul>
                {blogItems}
            </ul>
        </div>
        <Pagination
            showSizeChanger
            onShowSizeChange={refreshPage}
            defaultCurrent={page.pageNo}
            total={page.total}
        />
    </>
}

function BlogItems(blogList: Array<BlogVO>) {
    return blogList.map(blog => <li key={blog.id}>
        <div>
            <a href={`/blog/view/${blog.id}`} target="_blank">
                {blog.title}
            </a>
        </div>
        <div>
            {blog.gmtCreate}
        </div>
    </li>)
}

