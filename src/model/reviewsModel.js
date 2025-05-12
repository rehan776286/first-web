import mongoose, { Types } from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewAt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductItem",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    commentOn: {
      type: String,
      trim: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    totallike: {
      type: Number,
    },
    reviewMedia: [
      {
        type: {
          type: String,
          enum: ["images", "videos"],
          required: true,
        },
        mediaUrl: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const review = mongoose.model("Review", reviewsSchema);

export default review;
