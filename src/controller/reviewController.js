import review from "../model/reviewsModel.js";
import path from "path";
import cloudUploader from "../utiliti/cloudinaryUpload.js";
import ProductUploder from "../model/productModel.js";
import mongoose from "mongoose";
import deleteFile from "../utiliti/deleteFile.js";

const reviewController = async (req, res) => {
  const { rating, commentOn } = req.body;
  const productId = req.params.id;
  console.log(typeof productId);
  if (!rating || !commentOn) {
    return res.json({ success: false, message: "something is missing" });
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const product = await ProductUploder.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  console.log(product);
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.json({ success: false, message: "user  not found" });
    }
    const cloudFile = req.files;
    const reviewMedia = [];
    for (const file of cloudFile) {
      try {
        const isVideo = file.mimetype.startsWith("video/");
        const cloudImage = await cloudUploader(file.path, isVideo);
        reviewMedia.push({
          type: isVideo ? "videos" : "images",
          mediaUrl: cloudImage.secure_url,
        });
        deleteFile(file.path);
      } catch (error) {
        return res.json({
          success: false,
          message: `reveiw controller for of failed ${error}`,
        });
      }
    }

    const newReview = await review.create({
      reviewBy: userId,
      reviewAt: productId,
      rating: rating,
      commentOn: commentOn,
      reviewMedia: reviewMedia,
    });
    product.reviews.push(newReview._id);
    product.numberOfReviews = product.review.length;
    await product.save();

    return res.json({
      success: true,
      message: "user review successfully created",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `review controller get failed ${error}`,
    });
  }
};

export default reviewController;
