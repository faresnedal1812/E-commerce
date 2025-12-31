import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden group">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-40 z-10" />
          <img
            src={category.imageURL}
            alt={category.name}
            loading="lazy"
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        </div>

        <div className="absolute z-20 left-0 bottom-0 p-4">
          <h3 className="text-white text-2xl font-bold mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-gray-200">Explore {category.name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
