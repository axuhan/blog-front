interface AppConfig {
    blogApi: string
}

const CONFIG: AppConfig = {
    blogApi: import.meta.env.VITE_BLOG_API
};

export default CONFIG;