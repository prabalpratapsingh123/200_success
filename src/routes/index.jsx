import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/dashboard/Home"));
const AppLayout = lazy(() => import("../layout"));
const Profile = lazy(() => import("../pages/profile/Profile"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/app/home" replace />} />
        <Route path="app" element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          {/* Add more nested routes here */}
        </Route>
      </Routes>
    </Suspense>
  );
}