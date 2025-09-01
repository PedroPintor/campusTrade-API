import { Routes, Route } from "react-router-dom";
import CampusPage from "../pages/CampusPage";
import Home from "../pages/Home"

export default function HomeRouter() {
    return (
        <Routes>
            <Route path="/" element={<CampusPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
    )
}