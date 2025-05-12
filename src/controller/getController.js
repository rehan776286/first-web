import orderplace from "../model/orderModel.js";
import ProductUploder from "../model/productModel.js";
import productUploader from "./productUploaderController.js";
export const getAllOrder = async (req, res) => {
  try {
    const allOrder = await orderplace.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "orderby",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      { $unwind: "$allOrder" },
      {
        $lookup: {
          from: "productitems",
          localField: "allOrder.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 0,
          orderId: "$_id",
          userName: "$userDetails.name",
          userEmail: "$userDetails.email",
          DeliveryStatus: "$DeliveryStatus",
          orderDate: "$createdAt",
          productName: "$productDetails.productTitle", // or name
          productPrice: "$allOrder.price",
          quantity: "$allOrder.quantity",
          paymentStatus: "$allOrder.PeymentMetod",
          DeliveryStatus: "$allOrder.DeliveryStatus",
          totalItemPrice: {
            $multiply: ["$allOrder.Price", "$allOrder.quantity"],
          },
          productImage: {
            $cond: {
              if: { $isArray: "$productDetails.productImages" },
              then: { $arrayElemAt: ["$productDetails.productImages", 0] },
              else: "$productDetails.productImages", // fallback if only a single image field
            },
          },
        },
      },
    ]);

    return res.json({
      success: true,
      message: "get allOrder Successfull",
      products: allOrder,
    });
  } catch (error) {
    return res.json({
      success: false,
      mesaage: `something error in getAllOrder ${error}`,
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const allProduct = await ProductUploder.find({});
    return res.json({ success: true, allProduct: allProduct });
  } catch (error) {
    console.log(`getallproduct faield ${error}`);
  }
};

export const singleProduct = async (req, res) => {
  console.log(req.params.id);
  try {
    const singleItem = await ProductUploder.findById(req.params.id);
    if (!singleItem) {
      return res.json({ success: false, meassage: "single Product not fond" });
    }
    return res.json({ success: true, item: singleItem });
  } catch (error) {
    console.log(error);
  }
};

const similerProduct = async (req, res) => {
  try {
    const similer = await productUploader.find({});
  } catch (error) {}
};
