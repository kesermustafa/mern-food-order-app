import {create} from 'zustand';

const useFavoritesStore = create((set) => ({
    favorites: [],

    addFavorite: (product) =>
        set((state) => {
            const exists = state.favorites.some((p) => p.id === product.id);
            if (exists) return state;
            return {
                favorites: [...state.favorites, product],
            };
        }),

    removeFavorite: (productId) =>
        set((state) => ({
            favorites: state.favorites.filter((p) => p.id !== productId),
        })),

    isFavorite: (productId) =>
        get().favorites.some((p) => p.id === productId),

    resetFavorites: () => set({favorites: []}),
}));

export default useFavoritesStore;
