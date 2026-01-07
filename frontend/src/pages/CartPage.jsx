import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import PeopleAlsoBought from "../components/PeopleAlsoBought";
import GigtCouponCard from "../components/GigtCouponCard";
import OrderSummary from "../components/OrderSummary";
const CartPage = () => {
  const { cart } = useCartStore();

  if (cart.length === 0)
    return (
      <motion.div
        className="h-screen flex items-center justify-center shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <EmptyCartUI />
      </motion.div>
    );

  return (
    <div className="py-8 md:py-16">
      <div className="max-w-7xl w-full mx-auto px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-6 xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {cart.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
              <PeopleAlsoBought />
            </div>
          </motion.div>
          {cart.length > 0 && (
            <motion.div
              className="mt-6 lg:mt-0 space-y-6 max-w-4xl lg:w-full flex-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <OrderSummary />
              <GigtCouponCard />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center gap-4 bg-gray-800 px-4 pt-8 pb-4 rounded-lg max-w-md w-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <ShoppingCart className="w-24 h-24 text-gray-300" />
    <h3 className="text-2xl font-semibold">Your cart is empty</h3>
    <p className="text-gray-400">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      to={"/"}
      className="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200 text-white font-medium rounded-md mt-4 w-full flex items-center justify-center py-2.5 px-0"
    >
      Start Shopping
    </Link>
  </motion.div>
);
