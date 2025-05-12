import express from "express";
import productUploader from "../controller/productUploaderController.js";
import authGetToken from "../middelware/AccessToken.js";
import reviewController from "../controller/reviewController.js";
import uploader from "../utiliti/multerUpload.js";
import likeRouter from "../controller/likeRouter.js";
import priviewController from "../controller/priviewOrderController.js";
import productOrderController from "../controller/productOrderController.js";

const productRouter = express.Router();

productRouter.post(
  "/product",
  authGetToken,
  uploader.single("userfile"),
  productUploader
);
productRouter.post(
  "/review/:id",
  authGetToken,
  uploader.array("media", 5),
  reviewController
);
productRouter.post("/like/:id", authGetToken, likeRouter);
productRouter.post("/productitem/:id", authGetToken, priviewController);
productRouter.post("/productorder/:id", authGetToken, productOrderController);

export default productRouter;
