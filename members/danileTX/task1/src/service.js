const StorageService = {
    setItem(key, value) {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    },
  
    getItem(key) {
      const value = localStorage.getItem(key);
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    },
  
    removeItem(key) {
      localStorage.removeItem(key);
    },
  
    clear() {
      localStorage.clear();
    }
  };
  

  export default StorageService;
