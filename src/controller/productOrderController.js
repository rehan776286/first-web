import orderplace from "../model/orderModel.js";
import ProductUploder from "../model/productModel.js";

const productOrderController = async (req, res) => {
  const quantity = req.body?.quantity || 1;

  const paymentMethod = req.body.paymentMethod;
  const productId = req.params.id;
  const userId = req.user.id;
  if (!paymentMethod) {
    return res.json({ success: false, message: "please choose paymentMethod" });
  }
  try {
    if (!productId) {
      return res.json({
        success: false,
        message: "productitem order id not find ",
      });
    }
    if (!userId) {
      return res.json({ success: false, message: "user not fonded" });
    }
    const product = await ProductUploder.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "product is not  founded" });
    }
    const shippingAddress = req.body?.shippingAddress || null;
    const productitem = {
      product: productId,
      quantity: quantity,
      Price: product.productPrice,
      totalPrice: product.productPrice * quantity,
      paymentMethod: paymentMethod,
    };
    await orderplace.create({
      orderby: userId,
      allOrder: [productitem],
      shippingAddress,
    });
    return res.json({ success: true, message: `order succesfully placed` });
  } catch (error) {
    return res.json({
      success: false,
      message: `productOrderController ${error}`,
    });
  }
};

export default productOrderController;
