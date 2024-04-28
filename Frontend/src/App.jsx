import React from 'react'
import Billing from './Billing.jsx'
import Adding from './Add-Item.jsx/'
import RecentBills from './Recent-Bills.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

function App() {
    const router = createBrowserRouter([
        {
            path: '/Billing',
            element: <Billing />
        },
        {
            path: '/Add-Item',
            element: <Adding />
        },
        {
            path: '/Recent-Bills',
            element: <RecentBills />
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
