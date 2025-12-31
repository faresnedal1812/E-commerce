import { PlusCircle, ShoppingBasket, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CreateProductsForm from "../components/CreateProductsForm";
import ProductsList from "../components/ProductsList";
import AnalyticsTab from "../components/AnalyticsTab";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <motion.h1
          className="text-3xl text-emerald-400 font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Admin Dashboard
        </motion.h1>

        <div className="flex justify-center items-center gap-4 mb-16">
          {tabs.map((tab) => (
            <button
              onClick={() => setActiveTab(tab.id)}
              key={tab.id}
              className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 font-medium ${
                tab.id === activeTab
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              <tab.icon className="w-5 h-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "create" && <CreateProductsForm />}
        {activeTab === "products" && <ProductsList />}
        {activeTab === "analytics" && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default AdminPage;
