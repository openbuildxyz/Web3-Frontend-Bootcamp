
// 创建 sessionStorage 工具
const SessionStorageUtil = {
    // 设置数据到 sessionStorage
    set<T>(key: string, value: T): void {
        const data = JSON.stringify(value);
        sessionStorage.setItem(key, data);
    },

    // 从 sessionStorage 获取数据
    get<T>(key: string): T | null {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    // 从 sessionStorage 删除数据
    remove(key: string): void {
        sessionStorage.removeItem(key);
    },

    // 清除 sessionStorage 中的所有数据
    clear(): void {
        sessionStorage.clear();
    }
}

export default SessionStorageUtil;
