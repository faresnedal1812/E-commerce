import Product from "./../models/product.model.js";
import { redis } from "./../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getAllProducts controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  // in redis => you must to store any value as a JSON String
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.status(200).json(JSON.parse(featuredProducts));
    }
    // if not in redis => fetch from mongoDB
    // .lean() => return a plain javascript object instead of mongoDB document
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.log("Error in getFeaturedProducts controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, price, image, category } = req.body;
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    const newProduct = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse.secure_url,
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.log("Error in createProduct controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    try {
      const public_id = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`products/${public_id}`);
      console.log("Deleted image from cloudinary");
    } catch (error) {
      console.log("Error in deleting image from cloudinary:", error.message);
    }

    await Product.findByIdAndDelete(productId);
  } catch (error) {
    console.log("Error in deleteProduct controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getRecommendedProducts controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getProductsByCategory controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFeaturedProducts = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductCashe();
      res.status(200).json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Error in toggleFeaturedProducts controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function updateFeaturedProductCashe() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("Error in updateFeaturedProductCashe function");
  }
}
