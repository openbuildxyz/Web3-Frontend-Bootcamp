const setLocalStorage = (name, value) => {
  try {
    localStorage.setItem(name, JSON.stringify(value));
  } catch (error) {
    console.log("保存数据失败");
  }
};
const getLocalStorage = (name) => {
  try {
    return JSON.parse(localStorage.getItem(name) || "[]");
  } catch (error) {
    console.log("获取数据失败", error);
    return [];
  }
};

export { getLocalStorage, setLocalStorage };
