import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import HomePage from './pages/HomePage.tsx'
import ShopPage from './pages/ShopPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import Protected from './components/Protected.tsx'
import AuthContext from './contexts/AuthContext.tsx'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/home',
        element: <Protected verifiedRequired><HomePage /></Protected>
    },
    {
        path: '/shop',
        element: <Protected verifiedRequired><ShopPage /></Protected>
    },
    {
        path: '/admin',
        element: <Protected adminRequired><AdminPage /></Protected>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthContext>
            <RouterProvider router={router} />
        </AuthContext>
    </React.StrictMode>
)