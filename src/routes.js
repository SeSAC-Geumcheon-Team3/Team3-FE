// src/routes.js
import React from 'react';
import Index from 'views/Index.js';
import MyPage from 'views/MyPage';
import Register from 'views/Post';
import Login from 'views/Login.js';
import Signup from 'views/Signup';
import Icons from 'views/examples/Icons.js';
import FindId from 'views/Findid';
import FindPw from 'views/Findpw';
import AccountDeletion from 'views/examples/Accountdeletion'; // 경로 수정
import PasswordChange from 'views/PasswordChange';
import ProductList from "pages/PrdouctsList";
import AddProduct from 'views/Addproduct';

var routes = [
  {
    path: "/products",
    name: "생필품 목록 조회",
    icon: "ni ni-tv-2 text-primary",
    component: <ProductList />,
    layout: "/admin",
  },
  {
    path:'/password',
    name:'Password Change',
    component:<PasswordChange/>,
    layout:'/admin'
  },
  {
    path: '/index',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: <Index />,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'ni ni-planet text-blue',
    component: <Icons />,
    layout: '/admin',
  },
  {
    path: '/mypage',
    name: 'User mypage',
    icon: 'ni ni-single-02 text-yellow',
    component: <MyPage />,
    layout: '/admin',
  },
  {
    path: '/signup',
    name: 'Signup',
    icon: 'ni ni-bullet-list-67 text-red',
    component: <Signup />,
    layout: '/auth',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: <Login />,
    layout: '/auth',
  },
  {
    path: '/post',
    name: 'Post',
    icon: 'ni ni-chat-round',
    component: <post />,
    layout: '/auth',
  },
  {
    path: '/findid',
    name: 'FindId',
    icon: 'ni ni-circle-08 text-pink',
    component: <FindId />,
    layout: '/auth',
  },
  {
    path: '/findpw',
    name: 'FindPw',
    icon: 'ni ni-circle-08 text-pink',
    component: <FindPw />,
    layout: '/auth',
  },
  {
    path: '/account-deletion',
    name: 'Account Deletion',
    icon: 'ni ni-fat-remove text-red',
    component: <AccountDeletion />,
    layout: '/admin',
  },
  {
    path: '/add-product',
    name: 'Add Product',
    icon: 'ni ni-circle-08 text-pink',
    component: <AddProduct />,
    layout: '/admin',
  },
];

export default routes;
