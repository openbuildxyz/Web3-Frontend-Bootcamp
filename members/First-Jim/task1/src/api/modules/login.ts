import http from '@/api';

// * 获取菜单列表
export const getMenuList = () => {
	return http.get('api' + `/menu/list`);
};
