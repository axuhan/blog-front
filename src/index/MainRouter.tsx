import {BrowserRouter, Route, Routes} from "react-router";
import {MainLayout} from "./MainLayout.tsx";
import BlogEditor from "../blog/edit-page/BlogEditor.tsx";
import TicTacToeGame from "../tic-tac-toe/TicTacToeGame.tsx";
import {RegisterForm} from "../user/register/RegisterForm.tsx";
import {LoginForm} from "../user/login/LoginForm.tsx";
import {BlogList} from "../blog/list-page/BlogList.tsx";
import BlogView from "../blog/view-page/BlogView.tsx";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/blog/my-blog" element={<MainLayout currentKey="my-blog"><BlogList /></MainLayout>} />
                <Route path="/blog/view/:id" element={<BlogView />} />
                <Route path="/blog/newBlog" element={<MainLayout currentKey="new-blog"><BlogEditor /></MainLayout>} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<MainLayout currentKey="tic-tac-toe"><TicTacToeGame /></MainLayout>} />
            </Routes>
        </BrowserRouter>
    )
}