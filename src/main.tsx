import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import HomePage from './pages/HomePage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/home',
        element: <HomePage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/admin',
        element: <AdminPage />
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)