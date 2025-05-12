import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productTitle: {
      type: String,
      required: true,
      maxlenght: [100, "productname must be less then 30 Characters"],
      trim: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
      maxlenght: 300,
      trim: true,
    },
    productBrandName: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    // ✅ Multiple Images (Cloudinary-style)
    productImages: {
      type: String,
      required: true,
    },
    reviews: [
      {
        type: String,
      },
    ],
    // ✅ Multiple Images (Cloudinary-style)
    // productImages: [
    //   {
    //     public_id: {
    //       type: String,
    //       required: true,
    //     },
    //     url: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],

    avergerating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ProductUploder = mongoose.model("ProductItem", productSchema);

export default ProductUploder;
