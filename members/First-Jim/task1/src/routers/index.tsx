import { Navigate, useRoutes } from 'react-router-dom';
import { RouteObject } from '@/routers/interface';
import Login from '@/pages/Login';

// * 导入所有router
const metaRouters = import.meta.glob('./modules/*.tsx', { eager: true });

// * 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach((item) => {
	// @ts-ignore
	Object.keys(metaRouters[item]).forEach((key: any) => {
		// @ts-ignore
		routerArray.push(...metaRouters[item][key]);
	});
});

export const rootRouter: RouteObject[] = [
	{
		path: '/',
		// element: <Navigate to="/login" />,
	},
	{
		path: '/login',
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: '登录页',
			key: 'login',
		},
	},
	...routerArray,
	{
		path: '*',
		element: <Navigate to="/404" />,
	},
];

const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
