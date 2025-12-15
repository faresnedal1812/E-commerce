import Product from "./../models/product.model.js";

export const getCartProducts = async (req, res) => {
  // item.id is alias to item._id.toString() in Mongoose
  try {
    const productIdsFromUserCart = req.user.cartItems.map(
      (item) => item.product
    );

    // find() => return the first value that apply the conditions
    // add quantity for each product
    const products = await Product.find({
      _id: { $in: productIdsFromUserCart },
    }).lean();

    const cartItems = products.map((product) => {
      const item = req.user.cartItems.find(
        (item) => item.product.toString() === product.id
      );

      return { ...product, quantity: item.quantity };
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in getCartProducts controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    const existingItem = req.user.cartItems.find(
      (item) => item.product.equals(productId) // same as item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in addToCart controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// clear all products or only one product from the cart user
export const removeAllFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.body;

    if (!productId) {
      // clear all products in the cart user
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await user.save();
    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in removeAllFromCart controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity } = req.body;

    if (typeof quantity !== "number" || quantity < 0) {
      return res
        .status(400)
        .json({ message: "quantity must be a non-negative number" });
    }

    const user = req.user;

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(
          (item) => item.product.toString() !== productId
        );
        await user.save();
        return res.status(200).json(user.cartItems);
      }

      existingItem.quantity = quantity;
      await user.save();
      res.status(200).json(user.cartItems);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log("Error in updateQuantity controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
