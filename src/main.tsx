import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getWip } from './utils/remoteConfig.ts'
import './index.css'

const LandingPage = React.lazy(() => import('./pages/LandingPage.tsx'))
const RegisterPage = React.lazy(() => import('./pages/RegisterPage.tsx'))
const HomePage = React.lazy(() => import('./pages/HomePage.tsx'))
const ShopPage = React.lazy(() => import('./pages/ShopPage.tsx'))
const ProductPage = React.lazy(() => import('./pages/ProductPage.tsx'))
const ProfilePage = React.lazy(() => import('./pages/ProfilePage.tsx'))
const CartPage = React.lazy(() => import('./pages/CartPage.tsx'))
const OrderPage = React.lazy(() => import('./pages/OrderPage.tsx'))
const AdminPage = React.lazy(() => import('./pages/AdminPage.tsx'))
const Protected = React.lazy(() => import('./components/Protected.tsx'))
const GlobalContext = React.lazy(() => import('./contexts/GlobalContext.tsx'))

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

getWip().then((WIP) =>
{
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
                        <Suspense fallback={<div className='flex flex-col items-center justify-center h-screen gap-4 text-4xl'>Načítání...</div>}>
                            <RouterProvider router={router} />
                        </Suspense>
                    </GlobalContext>
            }
        </React.StrictMode>
    )
})