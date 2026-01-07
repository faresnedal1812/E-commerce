import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm p-4 md:p-6">
      <div className="md:flex md:items-center md:justify-between md:gap-6 space-y-4 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            className="rounded-lg h-20 md:h-32 object-cover "
            src={item.image}
            alt={item.name}
          />
        </div>
        <label className="sr-only">Choose quantity:</label>

        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
              className="h-5 w-5 inline-flex shrink-0 bg-gray-700 hover:bg-gray-600 border border-gray-600 items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md"
            >
              <Minus className="text-gray-300" />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
              className="h-5 w-5 inline-flex shrink-0 bg-gray-700 hover:bg-gray-600 border border-gray-600 items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md"
            >
              <Plus className="text-gray-300" />
            </button>
          </div>

          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-emerald-400">
              ${item.price}
            </p>
          </div>
        </div>

        <div className="md:order-2 md:max-w-md space-y-4 flex-1">
          <p className="text-base font-medium text-white hover:text-emerald-400 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-gray-400 text-wrap">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
