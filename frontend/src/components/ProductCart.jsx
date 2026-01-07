import { ShoppingCart } from "lucide-react";
import { useUserStore } from "./../stores/useUserStore";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";

const ProductCart = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please login to add products to cart", { id: "login" });
      return;
    }
    addToCart(product);
  };
  return (
    <div className="flex flex-col gap-3 overflow-hidden border border-gray-700 shadow-lg rounded-lg group">
      <div className="relative h-60 mx-3 mt-3 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full "
        />
        <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity duration-200" />
      </div>
      <div className="mx-5 mt-4 mb-5 flex flex-col gap-4">
        <p className="text-2xl font-bold text-white tracking-tight">
          {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
        </p>
        <span className="font-bold text-emerald-400 text-2xl">
          ${product.price}
        </span>
        <button
          onClick={handleAddToCart}
          className="mt-2 flex items-center justify-center gap-2 w-full bg-emerald-600 py-2.5 px-5 rounded-lg font-medium cursor-pointer hover:bg-emerald-700 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400"
        >
          <ShoppingCart size={22} />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
