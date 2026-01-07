import React, { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import ProductCart from "./ProductCart";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(recommendations);

  useEffect(() => {
    const fetchRecommendationsProducts = async () => {
      try {
        const res = await axiosInstance.get("/products/recommendations");
        setRecommendations(res.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "An errro occurred while fetch recommended products"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendationsProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="mt-8">
      <h2 className="text-3xl text-emerald-400 font-semibold text-center">
        People Also Bought
      </h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((product) => (
          <ProductCart key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PeopleAlsoBought;
