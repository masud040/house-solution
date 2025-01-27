import { removeMongoId, removeMongoIdFromObj } from "@/app/utils";
import { BillingAddrsstModel } from "@/models/billing-address-model";
import { CartModel } from "@/models/carts-model";
import { CategoryModel } from "@/models/categories-model";

import checkPendingOrders from "@/app/utils/checkPendingOrders";
import { OrdersModel } from "@/models/orders-model";
import { ProductModel } from "@/models/products-model";
import { reviewRatingModel } from "@/models/reviews-ratings-model";
import { ShippingAddrsstModel } from "@/models/shipping-address-model";
import { UserModel } from "@/models/users-model";
import mongoose from "mongoose";
import connectMongo from "../connectMongo";

// get all products with filters
async function getAllProducts(
  category,
  min_price,
  max_price,
  search_term,
  page = 1,
  limit = 12
) {
  await connectMongo();

  const isFiltered = category || min_price || max_price || search_term;

  let allProducts;
  let totalCount;

  if (isFiltered) {
    // Query from all data (no pagination) if filters or search are applied
    allProducts = await ProductModel.find().lean();
    totalCount = allProducts.length; // Total products matching the filter
  } else {
    // Paginated query if no filters or search terms
    const skip = (page - 1) * limit;
    allProducts = await ProductModel.find().skip(skip).limit(limit).lean();
    totalCount = await ProductModel.countDocuments();
  }
  if (category) {
    const categoriesToMatch = category.toLowerCase().split("|");

    allProducts = allProducts.filter((product) =>
      categoriesToMatch.includes(product.category.toLowerCase())
    );
  }
  if (min_price && max_price) {
    allProducts = allProducts.filter(
      (product) => product.price >= min_price && product.price <= max_price
    );
  }
  if (search_term) {
    allProducts = allProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(search_term.toLowerCase()) ||
        product.details.toLowerCase().includes(search_term.toLowerCase())
    );
  }

  return {
    products: removeMongoId(allProducts),
    total: totalCount,
    page,
    pages: Math.ceil(totalCount / limit),
  };
}
// find product by id
async function getProductById({ productId, options = [] }) {
  await connectMongo();
  const product = await ProductModel.findById(productId)
    .select(options.length > 0 ? options : undefined)
    .lean();
  return product;
}

// get all categories
async function getAllCategory() {
  await connectMongo();
  const allCategory = await CategoryModel.find().lean();
  return removeMongoId(allCategory);
}

// find to new arrival products
async function getNewArrivalProducts() {
  const date = new Date();
  date.setDate(date.getDate() - 200);

  await connectMongo();
  const products = await ProductModel.find({
    createdAt: { $gte: date.getTime() },
  })
    .select(["name", "price", "thumbnail", "discount"])
    .limit(8)
    .lean();

  return removeMongoId(products);
}
// get rating for product
async function findRatingProducts(id) {
  await connectMongo();
  const ratings = await reviewRatingModel.find({});
}

// get trending products
async function getTrendingProducts() {
  try {
    await connectMongo();
    const allProducts = await ProductModel.find().lean();
    return removeMongoId(allProducts?.slice(0, 8));
  } catch (error) {
    throw new Error(error);
  }
}
// get products by category
async function getProductsCountByCategory() {
  try {
    const allCategory = await getAllCategory();
    const productsCountByCategory = await Promise.all(
      allCategory.map(async (category) => {
        const regex = new RegExp(category.value, "i");
        const products = await ProductModel.find({
          category: { $regex: regex },
        }).lean();

        return { name: category.value, products: products.length };
      })
    );
    return productsCountByCategory;
  } catch (error) {
    throw new Error(error);
  }
}

// get user by email
async function getUserByEmail(email) {
  await connectMongo();
  if (email) {
    const user = await UserModel.findOne({ email: email }).lean();
    return removeMongoIdFromObj(user);
  }
}
async function getUserByUserId(userId) {
  await connectMongo();
  if (userId) {
    const user = await UserModel.findById(userId).lean();
    return removeMongoIdFromObj(user);
  }
}

// add to cart if it already exists update it quantity
async function setItemInCart(cartData) {
  try {
    await connectMongo();
    if (cartData) {
      const found = await CartModel.findOne({
        productId: cartData.productId,
        userId: cartData.userId,
      });

      if (!found) {
        await CartModel.create(cartData);
        return {
          status: 200,
          message: "Item added successfully",
        };
      } else {
        return {
          status: 200,
          message: "This item has already been added",
        };
      }
    } else {
      return { status: 400, message: "Invalid cart data" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
// add to wishlist if already added delet from wishlist
async function updateWishlist(productId, userId) {
  try {
    const product = await ProductModel.findById(productId);

    if (product) {
      const foundUser = product.wishlist?.find(
        (id) => id.toString() === userId
      );
      if (foundUser) {
        product.wishlist.pull(new mongoose.Types.ObjectId(userId));
      } else {
        product.wishlist.push(new mongoose.Types.ObjectId(userId));
      }
    }
    product.save();
    return {
      status: 200,
      message: "Update wishlist",
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all cart items
async function getCartData(userEmail) {
  try {
    await connectMongo();
    if (userEmail) {
      const user = await getUserByEmail(userEmail);
      const response = await CartModel.find({
        userId: user.id,
      }).lean();
      return removeMongoId(response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

// get all cart items by id
async function getAllCartItemsById(userEmail, selected) {
  try {
    if (userEmail) {
      let allCartItems;
      const cartData = await getCartData(userEmail);
      allCartItems = await Promise.all(
        cartData.map(async (item) => {
          const product = await getProductById({
            productId: item.productId,
            options: ["name", "thumbnail", "stock", "price", "discount"],
          });
          product["quantity"] = item.quantity;
          product["userId"] = item.userId;
          return product;
        })
      );
      const selectedArr = selected?.split(",");
      if (selectedArr?.length > 0) {
        allCartItems.forEach((item) => {
          if (selectedArr.includes(item._id.toString())) {
            item["selected"] = true;
          }
        });
      }
      return removeMongoId(allCartItems);
    }
  } catch (error) {
    throw new Error(error);
  }
}

// get all wishlist items by id
async function getAllWishlistByEmail(userEmail) {
  try {
    await connectMongo();
    if (userEmail) {
      const user = await getUserByEmail(userEmail);
      const response = await ProductModel.find({
        wishlist: new mongoose.Types.ObjectId(user.id),
      }).lean();

      return removeMongoId(response);
    }
  } catch (error) {
    console.log(error);
  }
}

// get how many wishlist items
async function getWishlistCount(userEmail) {
  try {
    const user = await getUserByEmail(userEmail);

    const response = await ProductModel.find({
      wishlist: new mongoose.Types.ObjectId(user.id),
    }).countDocuments();
    return response;
  } catch (error) {
    console.log(error);
  }
}

// update product quantity on cart
async function updateQuantity(productId, userId, type) {
  try {
    const product = await CartModel.findOne({
      productId: productId,
      userId: userId,
    });

    if (type === "increase") {
      product.quantity += 1;
    } else {
      product.quantity -= 1;
    }
    product.save();
    return {
      status: 200,
      message: "Quantity updated successfully.",
    };
  } catch (error) {
    console.log(error);
  }
}

// delete items from cart or wishlist
async function deleteItems(productId, userId, from) {
  try {
    if (from === "cart") {
      const response = await deleteCartItem(productId, userId);
      return response;
    }
    if (from === "wishlist") {
      const response = await updateWishlist(productId, userId);
      return response;
    }
    if (from === "all") {
      const response = await deleteAllCartItems(userId);
      return response;
    }
  } catch (error) {
    console.log(error);
    throw new Error({ status: 500, message: "Failed to delete item." });
  }
}

// delete all items from cart
async function deleteAllCartItems(userId) {
  try {
    await CartModel.deleteMany({
      userId: userId,
    });
    return {
      status: 200,
      message: "All cart items deleted successfully.",
    };
  } catch (error) {
    console.log(error);
    throw new Error({ status: 500, message: "Failed to delete item." });
  }
}

// delete single item from cart
async function deleteCartItem(productId, userId) {
  try {
    await CartModel.deleteOne({
      productId: productId,
      userId: userId,
    });
    return {
      status: 200,
      message: "Item deleted successfully from cart.",
    };
  } catch (error) {
    throw new Error(error);
  }
}

// move item from wishlist to cart
async function moveToCart(productId, userId) {
  try {
    const product = await ProductModel.findById(productId);

    product.wishlist.pull(new mongoose.Types.ObjectId(userId));
    product.save();
    const foundItem = await CartModel.findOne({
      productId: productId,
      userId: userId,
    });
    if (!foundItem) {
      await CartModel.create({
        userId,
        productId: productId,
        quantity: 1,
      });
      return {
        status: 200,
        message: "Moved to cart successfully.",
      };
    } else {
      return {
        status: 200,
        message: "This Item is already added to cart.",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
}

//for get billing and shipping address
async function getBillingAddressByUserId(userId) {
  try {
    await connectMongo();
    const res = await BillingAddrsstModel.findOne({ userId: userId });
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
async function getShippingAddressByUserId(userId) {
  try {
    await connectMongo();
    const shippingAddress = await ShippingAddrsstModel.findOne({ userId });
    const billingAddress = await BillingAddrsstModel.findOne({
      userId,
    });
    if (shippingAddress || billingAddress) {
      if (shippingAddress) {
        return shippingAddress;
      } else {
        if (billingAddress.isUseShipping) {
          return billingAddress;
        }
      }
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

//get selected cart product
async function getSelectedCartProductByProductIds(productIds, userId) {
  try {
    if (productIds && userId) {
      let selectedCartItems;
      selectedCartItems = await Promise.all(
        productIds.map(async (productId) => {
          const item = await CartModel.findOne({ productId }).lean();
          const product = await getProductById({
            productId,
            options: ["name", "thumbnail", "price", "discount"],
          });

          product["quantity"] = item?.quantity;
          product["order_product_id"] = product?._id.toString();
          return product;
        })
      );

      return removeMongoId(selectedCartItems);
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}
async function getSingleShippingCost() {
  return 5;
}

// after order delete data from cart
async function deleteFromCartAndAddOrderSuccess({
  order_items_id,
  customer_id,
  order_id,
}) {
  if (
    !customer_id ||
    !Array.isArray(order_items_id) ||
    order_items_id.length === 0
  ) {
    throw new Error(
      "Invalid parameters. 'userId' must be a string, and 'order_items_id' must be a non-empty array."
    );
  }
  try {
    await connectMongo();
    const products = await CartModel.find({
      userId: customer_id,
      productId: {
        $in: order_items_id,
      },
    }).lean();
    const formatProducts = products.map((product) => {
      return {
        productId: product.productId,
        quantity: product.quantity,
      };
    });
    const newData = {
      userId: customer_id,
      orderId: order_id,
      products: formatProducts,
    };

    const addedRes = await addProductInOrders(newData);
    if (addedRes._id) {
      const deleteRes = await CartModel.deleteMany({
        userId: customer_id,
        productId: {
          $in: order_items_id,
        },
      });
      return {
        success: true,
        deletedCount: deleteRes.deletedCount,
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// add product in orders collection
async function addProductInOrders(data) {
  try {
    await connectMongo();
    const response = await OrdersModel.create(data);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// get ordered items

async function getOrderItems({ userId, ongoing_status }) {
  if (userId && ongoing_status) {
    try {
      await connectMongo();
      const query = { userId };
      if (ongoing_status !== "all") {
        query.ongoing_status = ongoing_status;
      }
      const orders = await OrdersModel.find(query).lean();
      await Promise.all(
        orders.map(async (orderItem) => {
          orderItem.products = await Promise.all(
            orderItem.products.map(async (item) => {
              const product = await getProductById({
                productId: item.productId,
                options: ["name", "thumbnail", "price", "discount"],
              });

              product.quantity = item.quantity;
              return product;
            })
          );
        })
      );
      orders.sort(
        (item1, item2) => item2.createdAt.getTime() - item1.createdAt.getTime()
      );
      return removeMongoId(orders);
    } catch (error) {
      throw new Error(error);
    }
  }
}

// get success ordered products
async function getSuccessOrderedProducts({ userId, orderId }) {
  try {
    if (userId && orderId) {
      await connectMongo();
      const res = await OrdersModel.findOne({
        userId,
        orderId,
        ongoing_status: "to-ship",
      }).lean();
      if (res?.products.length > 0) {
        const allProducts = await Promise.all(
          res.products.map(async (item) => {
            const product = await getProductById({
              productId: item.productId,
              options: ["name", "thumbnail", "price", "discount"],
            });

            product.quantity = item.quantity;
            return product;
          })
        );

        return allProducts;
      }
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(error);
  }
}

setInterval(() => {
  checkPendingOrders();
}, 10 * 60 * 1000);

export {
  deleteFromCartAndAddOrderSuccess,
  deleteItems,
  getAllCartItemsById,
  getAllCategory,
  getAllProducts,
  getAllWishlistByEmail,
  getBillingAddressByUserId,
  getCartData,
  getNewArrivalProducts,
  getOrderItems,
  getProductById,
  getProductsCountByCategory,
  getSelectedCartProductByProductIds,
  getShippingAddressByUserId,
  getSingleShippingCost,
  getSuccessOrderedProducts,
  getTrendingProducts,
  getUserByEmail,
  getUserByUserId,
  getWishlistCount,
  moveToCart,
  setItemInCart,
  updateQuantity,
  updateWishlist,
};
