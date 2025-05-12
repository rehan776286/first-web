import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductItem",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    Price: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    DeliveryStatus: {
      type: String,
      enum: [
        "pending",
        "shipedd",
        "out for delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
      required: true,
    },
    PeymentMetod: {
      type: String,
      enum: ["cod", "upi", "creditCard", "bank"],
      default: "cod",
      required: true,
    },
    PaymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
      required: true,
    },
    RefundItem: {
      type: String,
      enum: ["not applicable", "pending", "refunded"],
      default: "not applicable",
    },

    refundAmount: {
      type: Number,
      default: 0,
    },
    refundedAt: {
      type: Date,
    },
    DeliveryCharge: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const orderPlaceSchema = mongoose.Schema(
  {
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    allOrder: [orderItemSchema],
    shippingAddress: [
      {
        FullName: {
          type: String,
          required: true,
        },
        PhoneNumber: {
          type: String,
          required: true,
        },
        alterNumber: {
          type: String,
        },
        PinCode: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        nearBy: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const orderplace = mongoose.model("orderPlace", orderPlaceSchema);

export default orderplace;
