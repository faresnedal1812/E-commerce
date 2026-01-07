import React from "react";
import { motion } from "framer-motion";

const AnalyticsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <motion.div
      className={`bg-gray-800 rounded-lg shadow-lg p-6 overflow-hidden relative  ${color}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="z-10">
        <p className="text-emerald-200 text-lg mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
      <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
        <Icon className="w-32 h-32" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 to-emerald-900 opacity-30 hover:opacity-10 transition-opacity duration-150" />
    </motion.div>
  );
};

export default AnalyticsCard;
