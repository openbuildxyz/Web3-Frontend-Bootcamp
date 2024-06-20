const getSafeStorage = (type: 'local' | 'session', key: string) => {
  try {
    switch (type) {
      case 'local':
        return localStorage.getItem(key);
      case 'session':
        return sessionStorage.getItem(key);
    }
  } catch (error) {
    return null;
  }
};

export { getSafeStorage};
