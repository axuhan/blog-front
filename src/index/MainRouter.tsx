import {BrowserRouter, Route, Routes} from "react-router";
import {MainLayout} from "./MainLayout.tsx";
import BlogEditor from "../blog/BlogEditor.tsx";
import TicTacToeGame from "../tic-tac-toe/TicTacToeGame.tsx";

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout currentKey="tic-tac-toe"><TicTacToeGame /></MainLayout>} />
                <Route path="/blog/newBlog" element={<MainLayout currentKey="new-blog"><BlogEditor /></MainLayout>} />
            </Routes>
        </BrowserRouter>
    )
}