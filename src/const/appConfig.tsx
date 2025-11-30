interface AppConfig {
    blogApi: string,
    userApi: string
}

const CONFIG: AppConfig = {
    blogApi: import.meta.env.VITE_BLOG_API,
    userApi: import.meta.env.VITE_USER_API
};

export default CONFIG;