import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";
// import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";
import toast from "react-hot-toast";

// const stripePromis = loadStripe(
//   "pk_test_51SfNGiBQq6NsRhjs4fHWTGzHZX09JI35IAlKLansLAx012HZOZ0GOYo05Fx08IzklpTsGiFGdDhoNL4XD1rudyzd00m1RCXbhB"
// );

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subtotal - total;
  const formattedSavings = savings.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSubtotal = subtotal.toFixed(2);
  console.log(formattedSavings);

  const handlePayment = async () => {
    try {
      // const stripe = await stripePromis;
      const res = await axios.post("/payments/create-checkout-session", {
        products: cart,
        couponCode: coupon ? coupon.code : null,
      });
      const { url: sessionURL } = res.data;
      window.location.href = sessionURL;
    } catch (error) {
      toast.error("Error in payment process");
      console.log(error.response?.data?.message || "Error in payment process");
    }
  };

  return (
    <motion.div
      className="bg-gray-800 border border-gray-700 shadow-sm space-y-4 rounded-lg p-4 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Order Summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between">
            <dt className="text-base font-normal text-gray-300">
              Original price
            </dt>
            <dd className="text-base font-medium text-emerald-400">
              ${formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">
                -${formattedSavings}
              </dd>
            </dl>
          )}

          {coupon && isCouponApplied > 0 && (
            <dl className="flex items-center justify-between">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}

          <dl className="flex items-center justify-between border-t border-gray-600 pt-2">
            <dt className="text-base font-normal text-gray-300">Total</dt>
            <dd className="text-base font-medium text-emerald-400">
              ${formattedTotal}
            </dd>
          </dl>
        </div>

        <motion.button
          onClick={handlePayment}
          className="w-full px-5 py-2.5 bg-emerald-600 font-medium hover:bg-emerald-700 transition duration-100 cursor-pointer rounded-lg focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Checkout
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            className="text-sm font-medium text-emerald-400 hover:text-emerald-300 underline hover:no-underline"
            to={"/"}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
