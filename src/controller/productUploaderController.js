import { json } from "stream/consumers";
import ProductUploder from "../model/productModel.js";
import cloudUploader from "../utiliti/cloudinaryUpload.js";
import path from "path";
import deleteFile from "../utiliti/deleteFile.js";

const productUploader = async (req, res) => {
  const { productTitle, productPrice, productBrandName, productDescription } =
    req.body;

  if (
    !productTitle ||
    !productBrandName ||
    !productPrice ||
    !productDescription
  ) {
    return res.json({ success: false, message: "samething is missing" });
  }

  try {
    const createBy = req.user?.id;
    const filePath = req.file.path;
    const cloudProduct = await cloudUploader(filePath);
    await deleteFile(filePath);
    const newproduct = await ProductUploder.create({
      productTitle,
      productDescription,
      productPrice,
      productBrandName,
      productImages: cloudProduct.secure_url,
      createBy,
    });
    console.log(newproduct);
    return res.json({
      success: true,
      message: "product successfully uploaded",
      product: newproduct,
    });
  } catch (error) {
    return json({
      success: false,
      message: "controller producUploader failed",
    });
  }
};
export default productUploader;
