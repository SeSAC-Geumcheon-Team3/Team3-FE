// src/routes.js
import React from 'react';
import Index from 'views/Index.js';
import MyPage from 'views/MyPage';
import Login from 'views/Login.js';
import Signup from 'views/Signup';
import Icons from 'views/examples/Icons.js';
import FindId from 'views/Findid';
import FindPw from 'views/Findpw';
import AccountDeletion from 'views/examples/Accountdeletion'; // 경로 수정
import PasswordChange from 'views/PasswordChange';
import ProductList from "pages/PrdouctsList";
import AddProduct from 'views/Addproduct';
import AdminDetail from 'views/Admindetail';

var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: <Index />,
    layout: '/admin',
  },
  {
    path: "/products",
    name: "생필품 목록 조회",
    icon: "ni ni-tv-2 text-primary",
    component: <ProductList />,
    layout: "/admin",
  },
  {
    path:'/password',
    name:'비밀번호 재설정',
    component:<PasswordChange/>,
    layout:'/admin'
  },
  {
    path: '/mypage',
    name: '마이 페이지',
    icon: 'ni ni-single-02 text-yellow',
    component: <MyPage />,
    layout: '/admin',
  },
  {
    path: '/signup',
    name: '회원가입',
    icon: 'ni ni-bullet-list-67 text-red',
    component: <Signup />,
    layout: '/auth',
  },
  {
    path: '/login',
    name: '로그인',
    icon: 'ni ni-key-25 text-info',
    component: <Login />,
    layout: '/auth',
  },
  {
    path: '/findid',
    name: 'ID 찾기',
    icon: 'ni ni-circle-08 text-pink',
    component: <FindId />,
    layout: '/auth',
  },
  {
    path: '/findpw',
    name: '비밀번호 찾기',
    icon: 'ni ni-circle-08 text-pink',
    component: <FindPw />,
    layout: '/auth',
  },
  {
    path: '/account-deletion',
    name: '계정 삭제',
    icon: 'ni ni-fat-remove text-red',
    component: <AccountDeletion />,
    layout: '/admin',
  },
  {
    path: '/add-product',
    name: '생필품 추가',
    icon: 'ni ni-circle-08 text-pink',
    component: <AddProduct />,
    layout: '/admin',
  },
  {
    path: '/admin-detail',
    name: 'Admin Detail',
    icon: 'ni ni-fat-remove text-red',
    component: <AdminDetail />,
    layout: '/admin',
  },
];

export default routes;
