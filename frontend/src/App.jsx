import React from "react";
import Header from "./components/HeaderAndFooter/Header";
import Footer from "./components/HeaderAndFooter/Footer";
import toast, { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";

import SinglePost from "./Pages/Posts/SinglePost";
import PostsByCategory from "./Pages/Posts/PostsByCategory";

import Login from "./components/UserRegister/Login";
import SignUp from "./components/UserRegister/SignUp";

import RequestOtp from "./components/UserRegister/RequestOtp";
import Home from "./Home";
import NewPassword from "./components/UserRegister/NewPassword";
import VerifyOtp from "./components/UserRegister/VerifyOtp";

// admin Component
import AdminHome from "./Admin/AdminComponents/AdminHome";
import AdminAddPosts from "./Admin/Dashboard/AdminAddPosts";
import AdminAddCategory from "./Admin/Dashboard/AdminAddCategory";
import PublicRoute from "./components/Hooks/PublicRoute";

import ProtectedRoute from "./components/Hooks/ProtectedRoute";
import AdminEditCategory from "./Admin/Dashboard/AdminEditCategory";
import AdminEditPost from "./Admin/Dashboard/AdminEditPost";
import Raw from "./assets/Raw";
import AdminUsers from "./Admin/Dashboard/AdminUsers";

const App = () => {
  let location = useLocation()
    const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {!isAdminRoute && <Header />}
        <Routes>
          <Route path="/post/:slug" element={<SinglePost />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<PostsByCategory />} />

          <Route path="/request-otp" element={<RequestOtp />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/newpassword" element={<NewPassword />} />

          {/* raw routes */}
          <Route path="/raw" element={<Raw />} />

          {/* if user is logged in then don't allow to access these routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          {/* admin panel  */}
          <Route
            path="/admin"
            element={
               
              <AdminHome />
            }
          />
          
          <Route
            path="/admin/addpost"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor"]}>
                <AdminAddPosts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/addcategory"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor"]}>
                <AdminAddCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editcategory/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor"]}>
                <AdminEditCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/editpost/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor"]}>
                <AdminEditPost />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
        {!isAdminRoute && <Footer />}
        <Toaster />
      </div>
    </>
  );
};

export default App;
