import { Star, Trash } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { motion } from "framer-motion";

const ProductsList = () => {
  const { products, deleteProduct, toggleFeaturedProduct } = useProductStore();

  return (
    <motion.div
      className="max-w-4xl w-full mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <table className="w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th
              scope="col"
              className="text-xs px-6 py-3 text-gray-300 font-medium uppercase text-left tracking-wider"
            >
              Product
            </th>
            <th
              scope="col"
              className="text-xs px-6 py-3 text-gray-300 font-medium uppercase text-left tracking-wider"
            >
              Price
            </th>
            <th
              scope="col"
              className="text-xs px-6 py-3 text-gray-300 font-medium uppercase text-left tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="text-xs px-6 py-3 text-gray-300 font-medium uppercase text-left tracking-wider"
            >
              Featured
            </th>
            <th
              scope="col"
              className="text-xs px-6 py-3 text-gray-300 font-medium uppercase text-left tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          {products?.map((product) => (
            <tr
              key={product._id}
              className="hover:bg-gray-700 transition-colors duration-200"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </div>
                  <p className="ml-4 text-sm font-medium text-white">
                    {product.name}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-300">
                  {product.price.toFixed(2)} $
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-300">
                  {product.category}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full cursor-pointer ${
                    product.isFeatured
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-600 text-gray-300"
                  } hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className="w-5 h-5" />
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-400 hover:text-red-300 cursor-pointer"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ProductsList;
