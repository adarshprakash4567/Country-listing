import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Home = lazy(() => import('../pages/Home'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
