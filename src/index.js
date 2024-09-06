// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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

root.render(
  <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/auth/*" element={<AuthLayout />} />
        <Route path="/member/*" element={<MemberLayout />} />
        <Route path="/product/*" element={<ProductLayout />} />
        {/* cookie가 있으면 products 페이지로, 없다면 로그인 페이지로 이동 */}
        <Route path="*" 
               element={ 
                getCookie('accessToken')
                  ? <Navigate to="/product/dashboard" replace /> 
                  : <Navigate to="/auth/signin" replace />} 
        />

      </Routes>
    </RecoilRoot>
  </BrowserRouter>
);
