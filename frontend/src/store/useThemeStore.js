import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("lingoverse-theme") || "forest",
    setTheme: (theme) => {
        localStorage.setItem("lingoverse-theme", theme);
        set({ theme });
    }
}))