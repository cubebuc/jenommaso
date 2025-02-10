import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage.tsx'
import RegisterPage from './pages/RegisterPage.tsx'
import HomePage from './pages/HomePage.tsx'
import ShopPage from './pages/ShopPage.tsx'
import ProductPage from './pages/ProductPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import CartPage from './pages/CartPage.tsx'
import OrderPage from './pages/OrderPage.tsx'
import AdminPage from './pages/AdminPage.tsx'
import Protected from './components/Protected.tsx'
import GlobalContext from './contexts/GlobalContext.tsx'
import './index.css'

const WIP = true

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
        path: '/product/:id',
        element: <Protected verifiedRequired><ProductPage /></Protected>
    },
    {
        path: '/profile',
        element: <Protected verifiedRequired><ProfilePage /></Protected>
    },
    {
        path: '/cart',
        element: <Protected verifiedRequired><CartPage /></Protected>
    },
    {
        path: '/order',
        element: <Protected verifiedRequired><OrderPage /></Protected>
    },
    {
        path: '/admin',
        element: <Protected adminRequired><AdminPage /></Protected>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        {
            WIP
                ?
                <div className='flex flex-col items-center justify-center h-screen gap-4 text-4xl'>
                    <h1>🚧 Stránka je dočasně nedostupná 🚧</h1>
                </div>
                :
                <GlobalContext>
                    <RouterProvider router={router} />
                </GlobalContext>
        }
    </React.StrictMode>
)