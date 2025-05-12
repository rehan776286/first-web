import orderplace from "../model/orderModel.js";
import ProductUploder from "../model/productModel.js";

const priviewController = async (req, res) => {
  const quantity = req.body?.quantity || 1;
  console.log(quantity);
  // if (!pa) {
  //   return res.json({ success: false, message: "please choose paymentMethod" });
  // }
  const productId = req.params?.id;
  console.log(productId);
  try {
    const product = await ProductUploder.findById(productId);
    console.log(product);
    if (!product) {
      return res.json({ success: false, message: "product is not available" });
    }
    // const totalAmount =
    const productDaitail = {
      productprice: product.productPrice,
      totalPrice: product.productPrice * quantity,
      delivery: "within 7 days",
      deliveryCharge: "free",
    };

    return res.json({
      success: true,
      message: "preview successfully send",
      productDaitail,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `priviw Controller failed ${error}`,
    });
  }
};

export default priviewController;
