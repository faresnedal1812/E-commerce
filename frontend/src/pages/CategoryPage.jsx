import React, { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCart from "../components/ProductCart";

const CategoryPage = () => {
  const { category } = useParams();
  const { getProductsByCategory, products } = useProductStore();

  useEffect(() => {
    getProductsByCategory(category);
  }, [getProductsByCategory, category]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1
          className="text-3xl font-bold text-emerald-400 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.8 }}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>
        <motion.div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 100 }}
          transition={{ duration: 0.8 }}
        >
          {products?.length === 0 && (
            <p className="text-2xl text-gray-300 mt-8">No product found</p>
          )}

          {products?.map((product) => (
            <ProductCart key={product._id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPage;
