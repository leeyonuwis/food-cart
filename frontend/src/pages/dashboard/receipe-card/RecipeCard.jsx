import { Loader2 } from "lucide-react";

export default function RecipeCard({ item, inCart, onAddToCart, loadingId }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative overflow-hidden group">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-3 left-3 bg-yellow-200 text-black text-xs font-semibold px-2 py-1 rounded-full shadow">
          ⭐ {item.rating || "4.5"}
        </span>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <span className="text-sm font-bold text-green-600">₹{item.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        <button
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-70 transition"
          onClick={() => onAddToCart(item)}
          disabled={loadingId === item._id || inCart}
        >
          {loadingId === item._id ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : inCart ? (
            "Added"
          ) : (
            "Add to Cart"
          )}
        </button>
      </div>
    </div>
  );
}
