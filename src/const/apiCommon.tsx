import axios from "axios";
import CONFIG from "./appConfig.tsx";

export interface CommonResponse<T> {
    success: boolean,
    message: string,
    data: T
}

export const blogApiClient = axios.create({
    baseURL: CONFIG.blogApi,
    timeout: 3000
})

blogApiClient.interceptors.request.use(
    (config) => {
        return {
            ...config,
            withCredentials: true
        }
    }
)

blogApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isNeedLoginResponse(error.response)) {
            //访问要求登录的接口跳转到登录页
            window.location.href = '/login?from=' + encodeURIComponent(window.location.href)
        }
        return Promise.reject(error);
    }
)

function isNeedLoginResponse(response: any) {
    return response?.status === 401 && response?.headers?.['need-login'] === 'true';
}