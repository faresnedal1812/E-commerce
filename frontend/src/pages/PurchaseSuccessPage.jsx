import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import { useCartStore } from "../stores/useCartStore";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";

const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();

  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.log(
          error.response?.data?.message || "Error in handleCheckoutSuccess"
        );
      } finally {
        setIsProcessing(false);
      }
    };
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
    }
  }, [clearCart]);

  if (isProcessing) return <LoadingSpinner />;

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      />
      <motion.div
        className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-emerald-400" />
          </div>
          <h1 className="mb-2 text-emerald-400 text-center text-2xl sm:text-3xl font-bold">
            Purchase Successful1
          </h1>
          <p className="text-gray-300 text-center mb-2">
            Thank you for your order. {"We're"} processing it now.
          </p>
          <p className="text-emerald-400 text-center text-sm mb-6">
            Check your email for order details and updates.
          </p>
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Order number</span>
              <span className="text-sm font-semibold text-emerald-400">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Estimated delivery</span>
              <span className="text-sm font-semibold text-emerald-400">
                3-5 business days
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200 font-semibold text-white py-2 px-4 rounded-lg flex items-center justify-center">
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link to={"/"}>
              <button className="cursor-pointer w-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200 font-semibold text-white py-2 px-4 rounded-lg flex items-center justify-center">
                <ArrowRight className="mr-2" size={18} />
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessPage;
