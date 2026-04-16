const isAvailable = typeof localStorage !== "undefined";

export const storage = {
  get: (key: string): string | null => {
    if (!isAvailable) return null;
    return localStorage.getItem(key);
  },

  set: (key: string, value: string): void => {
    if (!isAvailable) return;
    localStorage.setItem(key, value);
  },

  remove: (key: string): void => {
    if (!isAvailable) return;
    localStorage.removeItem(key);
  },
};
