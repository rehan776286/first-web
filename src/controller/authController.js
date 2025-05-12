import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Resend } from "resend";

// import emailQueue from "../queue/emailQueue.js";
// import resend from "../Config/ResendConfig.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.json({ success: false, message: "samething is missing" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      try {
        if (existingUser.isUserVerified == false) {
          const hashedPassword = await bcrypt.hash(password, 10);
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const hashOtp = await bcrypt.hash(otp, 10);
          existingUser.name = name;
          existingUser.password = hashedPassword;
          existingUser.otpVerify = hashOtp;
          role;
          existingUser.otpExpiry = Date.now() + 5 * 60 * 1000;
          const saveUser = await existingUser.save();
          const token = jwt.sign(
            {
              id: existingUser._id,
              isUserVerified: existingUser.isUserVerified,
            },
            process.env.JWT_SECRET
          );
          res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: "Trend Mode <noreply@trendmode.in>",
            to: email,
            subject: "OTP VERIFICATION",
            html: `
               <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <div style="text-align: center;">
              <img src="https://res.cloudinary.com/dp3iyxldc/image/upload/v1743944300/ko6wjsqxqyvzzv1k5ayo.png" alt="Brand Logo" width="120" style="margin-bottom: 20px;" />
              <h2 style="color: #333;">🔐 Verify Your Email</h2>
              <p style="font-size: 16px; color: #555;">Thank you for signing up. Please use the OTP below to verify your email address:</p>
              <div style="font-size: 30px; font-weight: bold; margin: 20px 0; color: #1d4ed8;">${otp}</div>
              <p style="color: #777; font-size: 14px;">This code will expire in 10 minutes. Do not share it with anyone.</p>
              <a href="https://your-website.com/verify" style="display: inline-block; background-color: #1d4ed8; color: white; text-decoration: none; padding: 12px 24px; margin-top: 20px; border-radius: 6px;">Verify Now</a>
              <hr style="margin: 30px 0;" />
              <p style="font-size: 12px; color: #aaa;">If you didn't request this, you can safely ignore this email.</p>
            </div>
          </div>
              `,
          });
          return res.json({
            success: true,
            role,
            message: "user verified succesfully",
          });
        }
        return res.json({ success: false, message: "user Already exist" });
      } catch (error) {
        return res.json({
          success: false,

          message: `issue in nested if  register error ${error}`,
        });
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 8);

    const otpExpiry = Date.now() + 5 * 60 * 1000;
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      otpVerify: hashedOtp,
      otpExpiry,
      role,
    });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, isUserVerified: newUser.isUserVerified },
      process.env.JWT_SECRET
    );
    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Trend Mode <noreply@trendmode.in>",
      to: email,
      subject: "OTP VERIFICATION",
      html: `
         <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <div style="text-align: center;">
        <img src="https://res.cloudinary.com/dp3iyxldc/image/upload/v1743944300/ko6wjsqxqyvzzv1k5ayo.png" alt="Brand Logo" width="120" style="margin-bottom: 20px;" />
        <h2 style="color: #333;">🔐 Verify Your Email</h2>
        <p style="font-size: 16px; color: #555;">Thank you for signing up. Please use the OTP below to verify your email address:</p>
        <div style="font-size: 30px; font-weight: bold; margin: 20px 0; color: #1d4ed8;">${otp}</div>
        <p style="color: #777; font-size: 14px;">This code will expire in 10 minutes. Do not share it with anyone.</p>
        <a href="https://your-website.com/verify" style="display: inline-block; background-color: #1d4ed8; color: white; text-decoration: none; padding: 12px 24px; margin-top: 20px; border-radius: 6px;">Verify Now</a>
        <hr style="margin: 30px 0;" />
        <p style="font-size: 12px; color: #aaa;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    </div>
        `,
    });
    return res.json({
      success: true,
      role,
      message: "user succecfully register",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: `register failed catch error ${error}`,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, message: "something is missing" });
  }
  try {
    const userlog = await User.findOne({ email });
    if (!userlog) {
      return res.json({ success: false, message: "user does not exist" });
    }
    const isUserPasswrodMatch = await bcrypt.compare(
      password,
      userlog.password
    );
    if (!isUserPasswrodMatch) {
      return res.json({ success: false, message: "password wrong" });
    }
    if (!userlog.isUserVerified) {
      return res.json({
        success: false,
        message: "your account is not verified",
      });
    }
    const token = jwt.sign(
      {
        id: userlog._id,
        isUserVerified: userlog.isUserVerified,
        role: userlog.role,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.json({ success: true, message: "user succesfully login" });
  } catch (error) {
    return res.json({
      success: false,
      message: `login user failed error ${error}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ success: true, message: "user succesfully logout" });
  } catch (error) {
    return res.json({ success: false, message: "user logout failed" });
  }
};

export const otpVerification = async (req, res) => {
  const { otp } = req.body;
  console.log("otp verification is running....");

  if (!otp) {
    return res.json({ success: false, message: "someting is missing" });
  }
  try {
    const userId = req.user?.id;
    console.log(userId);
    if (!userId) {
      return res.json({ success: false, message: "usertoken not find" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "user not found otp verification",
      });
    }

    const compareOtp = await bcrypt.compare(otp, user.otpVerify);

    if (!compareOtp) {
      return res.json({ success: false, message: "otp is wrong" });
    }
    if (user.isUserVerified) {
      return res.json({
        success: false,
        message: "account is already verified",
      });
    }
    if (user.otpExpiry < Date.now()) {
      return res.json({ success: false, message: "opt has expired try again" });
    }
    user.isUserVerified = true;
    user.otpExpiry = null;
    user.otpVerify = 0;
    await user.save();
    const token = jwt.sign(
      { id: user._id, isUserVerified: true, role: user.role },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.json({ success: true, message: "user successfully verified" });
  } catch (error) {
    return res.json({
      success: false,
      message: `user otpVerification failed error ${error}`,
    });
  }
};

export const isAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({
        success: false,
        message: "user is not authenticated fond ",
      });
    }
    const role = req.user.role;
    if (!req.user.isUserVerified) {
      return res.json({
        success: false,
        message: "account is not verify verified failed",
      });
    }
    console.log("is Auth running");
    return res.json({ success: true, role, message: "user is authenticated" });
  } catch (error) {
    return res.json({ success: false, message: "user is not authendicated" });
  }
};
