import {create} from 'zustand';

const useCartStore = create((set) => ({
    products: [],
    quantity: 0,
    total: 0,

    addProduct: (product) => set((state) => {
        const existingProduct = state.products.find(p => p.id === product.id);

        if (existingProduct) {
            return {
                products: state.products.map(p =>
                    p.id === product.id
                        ? {...p, quantity: p.quantity + 1}
                        : p
                ),
                quantity: state.quantity + 1,
                total: state.total + product.price
            };
        }

        return {
            products: [...state.products, product],
            quantity: state.quantity + 1,
            total: state.total + product.price
        };
    }),

    deleteProduct: (productId) => set((state) => {
        const productToRemove = state.products.find(p => p.id === productId);

        if (!productToRemove) return state;

        // If quantity is more than 1, just decrease quantity
        if (productToRemove.quantity > 1) {
            return {
                products: state.products.map(p =>
                    p.id === productId
                        ? {...p, quantity: p.quantity - 1}
                        : p
                ),
                quantity: state.quantity - 1,
                total: state.total - productToRemove.price
            };
        }

        // If quantity is 1, remove the product completely
        return {
            products: state.products.filter(p => p.id !== productId),
            quantity: state.quantity - 1,
            total: state.total - productToRemove.price
        };
    }),

    removeProductCompletely: (productId) => set((state) => {
        const productToRemove = state.products.find(p => p.id === productId);

        if (!productToRemove) return state;

        return {
            products: state.products.filter(p => p.id !== productId),
            quantity: state.quantity - productToRemove.quantity,
            total: state.total - (productToRemove.price * productToRemove.quantity)
        };
    }),

    clearCart: () => set({
        products: [],
        quantity: 0,
        total: 0
    })
}));

export default useCartStore;