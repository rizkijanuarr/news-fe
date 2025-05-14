//import react
import React, { lazy, Suspense } from "react";

//import react router dom
import { Routes, Route } from "react-router-dom";

//import loader component
const Loader = lazy(() => import("../components/Loader.jsx"));

//import view Login
const Login = lazy(() => import("../views/Auth/Login.jsx"));

//import private routes
import PrivateRoutes from "./PrivateRoutes";

const UsersIndex = lazy(() => import("../views/Users/Index.jsx"));
const UserCreate = lazy(() => import("../views/Users/Create.jsx"));
const UserEdit = lazy(() => import("../views/Users/Edit.jsx"));
const CategoriesIndex = lazy(() => import("../views/Categories/Index.jsx"));
const CategoriesCreate = lazy(() => import("../views/Categories/Create.jsx"));
const CategoriesEdit = lazy(() => import("../views/Categories/Edit.jsx"));
const PostIndex = lazy(() => import("../views/Posts/Index.jsx"));
const PostCreate = lazy(() => import("../views/Posts/Create.jsx"));
const PostEdit = lazy(() => import("../views/Posts/Edit.jsx"));
const Forbidden = lazy(() => import("../views/Forbidden/Index.jsx"));

//import view dashboard
const Dashboard = lazy(() => import("../views/Dashboard/Index.jsx"));

export default function RoutesIndex() {
  return (
    <Routes>
      {/* route "/" */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />

      {/* private route "/dashboard" */}
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/users" */}
      <Route
        path="/users"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/users/create" */}
      <Route
        path="/users/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UserCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/users/edit/:id" */}
      <Route
        path="/users/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UserEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/categories" */}
      <Route
        path="/categories"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/categories/create" */}
      <Route
        path="/categories/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/categories/edit/:id" */}
      <Route
        path="/categories/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/post" */}
      <Route
        path="/posts"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PostIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/post" */}
      <Route
        path="/post/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PostCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route "/post/edit/:id" */}
      <Route
        path="/post/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PostEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      <Route
        path="/forbidden"
        element={
          <Suspense fallback={<Loader />}>
            <Forbidden />
          </Suspense>
        }
      />
    </Routes>
  );
}
