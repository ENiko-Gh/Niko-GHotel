export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
    try {
        const storedValue = localStorage.getItem(key);
        if (!storedValue) return defaultValue; // Si es null, devolver defaultValue

        return JSON.parse(storedValue) as T;
    } catch (error) {
        console.error(`Error al obtener '${key}' desde localStorage:`, error);
        return defaultValue;
    }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error(`Error al guardar '${key}' en localStorage:`, error);
    }
}
