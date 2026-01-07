import React, { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
  { href: "/bags", name: "Bags", imageURL: "/bags.jpg" },
  { href: "/glasses", name: "Glasses", imageURL: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageURL: "/jackets.jpg" },
  { href: "/jeans", name: "Jeans", imageURL: "/jeans.jpg" },
  { href: "/shoes", name: "Shoes", imageURL: "/shoes.jpg" },
  { href: "/suits", name: "Suits", imageURL: "/suits.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageURL: "/tshirts.jpg" },
];

function HomePage() {
  const { fetchFeaturedProducts, products, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="min-h-screen overflow-hidden text-white">
      <div className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto w-full">
        <h1 className="text-5xl sm:text-6xl text-center text-emerald-400 font-bold mb-4">
          Explore Our Categories
        </h1>
        <p className="text-gray-300 text-xl text-center mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>

      {!loading && products.length > 0 && (
        <FeaturedProducts featuredProducts={products} />
      )}
    </div>
  );
}

export default HomePage;
