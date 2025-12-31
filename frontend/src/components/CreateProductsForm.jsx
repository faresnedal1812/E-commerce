import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Loader, PlusCircle, Upload } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "jeans",
  "t-shirts",
  "shoes",
  "glasses",
  "jackets",
  "suits",
  "bags",
];

const CreateProductsForm = () => {
  const { createProduct, loading } = useProductStore();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(productData);
      setProductData({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
    } catch (error) {
      console.log("Error creating a product:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProductData({ ...productData, image: reader.result });
    };

    reader.readAsDataURL(file); // convert the file to Base64 text format
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-xl mx-auto p-8 mb-8 shadow-lg overflow-hidden bg-gray-800"
    >
      <h1 className="text-center text-2xl mb-6 text-emerald-300 font-bold">
        Create New Product
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-gray-300 font-medium text-sm"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            required
            placeholder="Name of Product..."
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
            className="bg-gray-700 mt-1 w-full px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-gray-300 font-medium text-sm"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={productData.description}
            required
            placeholder="Description of Product..."
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            className="bg-gray-700 mt-1 w-full px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-gray-300 font-medium text-sm"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            step={0.01}
            value={productData.price}
            required
            placeholder="Price..."
            onChange={(e) =>
              setProductData({ ...productData, price: e.target.value })
            }
            className="bg-gray-700 mt-1 w-full px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-gray-300 font-medium text-sm"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            required
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            className="bg-gray-700 mt-1 w-full px-3 py-2 rounded-lg border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={""}>Select a Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImageChange}
            id="image"
            required
          />
          <label
            htmlFor="image"
            className="text-sm font-medium text-emerald-400 flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 transition-colors duration-300 rounded-lg border border-gray-600 cursor-pointer"
          >
            <Upload className="w-5 h-5" aria-hidden="true" />
            Upload image
          </label>
          {productData.image && (
            <span className="text-gray-300 flex items-center gap-1 font-medium">
              Image Uploaded
              <CheckCircle className="w-5 h-5 text-green-400 font-bold" />
            </span>
          )}
        </div>

        <button
          className="flex justify-center items-center text-white font-medium bg-emerald-400 w-full px-4 py-2 rounded-lg cursor-pointer hover:bg-emerald-500 transition-colors duration-300 shadow-sm border border-transparent disabled:opacity-50 mt-8"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin mr-1" />
              Loading...
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5 mr-1" />
              Create Product
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default CreateProductsForm;
