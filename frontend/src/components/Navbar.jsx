import React from "react";
import { Link } from "react-router-dom";
import { Lock, LogIn, LogOut, ShoppingCart, UserPlus } from "lucide-react";

const Navbar = () => {
  const user = false;
  const isAdmin = true;
  return (
    <div className="fixed top-0 left-0 bg-gray-900 z-40 bg-opacity-90 backdrop-blur-md transition-all shadow-lg border-b border-emerald-800 w-full duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between flex-wrap">
          <Link to={"/"} className="text-2xl font-bold text-emerald-400">
            E-commerce
          </Link>

          <nav className="flex items-center gap-4 flex-wrap">
            <Link
              to={"/"}
              className="text-gray-300 font-medium hover:text-emerald-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to={"/cart"}
                className="relative font-medium text-gray-300 group hover:text-emerald-400 transition duration-300 ease-in-out"
              >
                <ShoppingCart className="inline-block mr-1" size={20} />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -left-2 text-xs bg-emerald-500 group-hover:bg-emerald-400 px-2 py-0.5 rounded-full text-white font-semibold transition duration-300 ease-in-out">
                  3
                </span>
              </Link>
            )}

            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white transition duration-300 ease-in-out flex items-center px-3 py-1 rounded-lg font-medium"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button className="text-white bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1 font-medium transition duration-300 ease-in-out flex items-center">
                <LogOut className="inline-block mr-2" size={18} />
                <span>Log out</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={"/signup"}
                  className="text-white bg-emerald-700 hover:bg-emerald-600 rounded-lg px-3 py-1 font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <UserPlus className="inline-block mr-2" size={18} />
                  <span>Sign Up</span>
                </Link>
                <Link
                  to={"/login"}
                  className="text-white bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-1 font-medium transition duration-300 ease-in-out flex items-center"
                >
                  <LogIn className="inline-block mr-2" size={18} />
                  <span>Log in</span>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
