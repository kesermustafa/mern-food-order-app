import useFavoritesStore from "@/src/app/redux/store/useFavoritesStore";

const ProductCard = ({product}) => {
    const {favorites, addFavorite, removeFavorite} = useFavoritesStore();

    const isFavorite = favorites.some((p) => p.id === product.id);

    const toggleFavorite = () => {
        isFavorite ? removeFavorite(product.id) : addFavorite(product);
    };

    return (
        <div className="border p-4">
            <h3>{product.name}</h3>
            <button onClick={toggleFavorite}>
                {isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
            </button>
        </div>
    );
};
