// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import Register from "views/examples/Register.js";
import FindId from "views/examples/Findid.js";
import FindPw from "views/examples/Findpw.js"; // 경로 확인

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Admin Layout Routes */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="index" element={<Index />} />
        {/* Admin 관련 페이지 여기에 추가 */}
      </Route>

      {/* Auth Layout Routes */}
      <Route path="/auth/*" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="findid" element={<FindId />} />
        <Route path="findpw" element={<FindPw />} /> {/* 추가된 라우트 */}
        {/* 인증 관련 페이지 여기에 추가 */}
      </Route>

      {/* Redirect to /admin/index if no other routes match */}
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  </BrowserRouter>
);
