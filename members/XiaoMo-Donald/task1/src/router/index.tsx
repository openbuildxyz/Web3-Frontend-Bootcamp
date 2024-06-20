import type {RouteObject} from 'react-router-dom'
import {createBrowserRouter, Navigate} from 'react-router-dom'
import {lazy, Suspense} from "react";
import DefaultLayout from '@/layouts/DefaultLayout';

const Home = lazy(() => import('@/pages/Home'))
const Todo = lazy(() => import('@/pages/Todo'))
const Blockchain = lazy(() => import('@/pages/Blockchain'))

export const routes: RouteObject[] = [
    {
        path: '/',
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace/>,
            },
            {
                path: 'home',
                element: <DefaultLayout><Suspense fallback={'加载中'}> <Home/></Suspense></DefaultLayout>,
            },
            {
                path: 'todolist',
                element: <DefaultLayout><Suspense fallback={'加载中'}> <Todo/></Suspense></DefaultLayout>,
            },
            {
                path: 'blockchain-basic',
                element: <DefaultLayout><Suspense fallback={'加载中'}> <Blockchain/></Suspense></DefaultLayout>,
            },
        ],
    },
]

const router = createBrowserRouter(routes)

export default router
