import {blogApiClient, type CommonResponse} from "../const/apiCommon.tsx";
import {message} from "antd";
import type {CommonPage} from "../const/type/CommonPage.tsx";
import type {BlogVO} from "./type/blogApiType.ts";

export async function queryMyBLogs(pageNo: number, pageSize: number) {
    return blogApiClient.post<CommonResponse<CommonPage<BlogVO>>>(
        `/blog/search/my-blog`,
        {
            "pageNo": pageNo,
            "pageSize": pageSize
        }
    ).then(response => {
        if(!response.data.success) {
            message.error(response.data.message)
            return null;
        }
        return response.data.data;
    }).catch(err => {
        message.error('系统繁忙')
        console.error(err)
        return null;
    });
}