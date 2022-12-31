import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="users/*" element={<Users />} />
            </Routes>
        </>
    )
}