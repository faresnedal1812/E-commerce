import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "./../lib/axios";

export const useProductStore = create((set, get) => ({
  loading: false,
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });

    try {
      const res = await axios.post("/products", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));

      toast.success("Product created successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  fetchAllProducts: async () => {
    set({ loading: true });

    try {
      const res = await axios.get("/products");
      set({ loading: false, products: res.data });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Failed to fetch products");
    }
  },

  deleteProduct: async (productId) => {
    set({ loading: true });

    try {
      await axios.delete(`/products/${productId}`);
      set((prevState) => ({
        loading: false,
        products: prevState.products.filter(
          (product) => product._id !== productId
        ),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error in delete product");
    }
  },

  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });

    try {
      const res = await axios.patch(
        `/products/toggleFeaturedProduct/${productId}`
      );
      set((prevState) => ({
        products: prevState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "Failed to toggle featured product"
      );
    }
  },
}));
