import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
    maxlength: [20, "Username must be less then 20 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password must be more then 8 characters"],
    // maxlength: [16, "password must be less then 16 characters"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  isUserVerified: {
    type: Boolean,
    default: false,
  },
  otpVerify: {
    type: String,
    default: null,
  },
  otpExpiry: {
    type: Number,
    default: 0,
  },
  passwordResetOtp: {
    type: String,
    default: null,
  },
  passwordResetOtpExpiry: {
    type: Number,
    default: 0,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
