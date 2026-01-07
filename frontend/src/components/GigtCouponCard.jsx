import { motion } from "framer-motion";
import { useCartStore } from "./../stores/useCartStore";
import { useEffect, useState } from "react";

const GigtCouponCard = () => {
  const [userInputCouponCode, setUserInputCouponCode] = useState("");
  const { coupon, isCouponApplied, getCoupon, applyCoupon, removeCoupon } =
    useCartStore();

  useEffect(() => {
    getCoupon();
  }, [getCoupon]);

  useEffect(() => {
    if (coupon) setUserInputCouponCode(coupon.code);
  }, [coupon]);

  const handleApplyCoupon = async () => {
    if (!userInputCouponCode) return;
    applyCoupon(userInputCouponCode);
  };

  const handleRemoveCoupon = async () => {
    removeCoupon();
    setUserInputCouponCode("");
  };

  return (
    <motion.div
      className="space-y-4 bg-gray-800 border border-gray-700 shadow-sm p-4 sm:p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Do you have a voucher or gift card?
          </label>
          <input
            type="text"
            id="voucher"
            required
            value={userInputCouponCode}
            onChange={(e) => setUserInputCouponCode(e.target.value)}
            placeholder="Enter code here"
            className="block w-full rounded-lg bg-gray-700 border border-gray-600 p-2.5 text-sm text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-emerald-500 focus:ring-2"
          />
        </div>

        <motion.button
          type="button"
          onClick={handleApplyCoupon}
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Apply Code
        </motion.button>
      </div>

      {isCouponApplied && coupon && (
        <div>
          <h3 className="text-lg font-medium text-gray-300">Applied Coupon</h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            onClick={handleRemoveCoupon}
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}

      {coupon && (
        <div>
          <h3 className="text-lg font-medium text-gray-300">
            Your Available Coupon:
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default GigtCouponCard;
