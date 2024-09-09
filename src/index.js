// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import MemberLayout from "layouts/Member";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";
import ProductLayout from "layouts/Product"
import { RecoilRoot } from "recoil";
import { getCookie } from "utils/cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));

// ProtectedRoute 컴포넌트: 접근 제어 처리
const ProtectedRoute = ({ element }) => {
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const findPwAuth = getCookie('pwResetAuth')
  
  // accessToken이 없으면 로그인 페이지로 리다이렉트, 기존 위치를 상태로 저장
  if (!accessToken && !findPwAuth) {
    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  // accessToken이 있으면 원래의 경로로 이동
  return element;
};

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={<AdminLayout />} />}
        />
        <Route
          path="/member/*"
          element={<ProtectedRoute element={<MemberLayout />} />}
        />
        <Route
          path="/product/*"
          element={<ProtectedRoute element={<ProductLayout />} />}
        />
        <Route
          path="*"
          element={
            <Navigate to="/auth/signin" replace />
          }
        />
      </Routes>

    </RecoilRoot>
  </BrowserRouter>
);
