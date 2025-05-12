import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import dbConnection from "./dbConnection/connectDb.js";
import authrouter from "./router/authrouter.js";
import path from "path";
import uploader from "./utiliti/multerUpload.js";
import orderplace from "./model/orderModel.js";
import productRouter from "./router/productUploaderRouter.js";
import { getAllOrder } from "./controller/getController.js";
import getRouter from "./router/getRouters.js";
const PORT = process.env.PORT || 3000;
const startServer = async () => {
  try {
    await dbConnection();

    app.listen(PORT, () => {
      console.log(`sever is running at ${PORT}`);
    });
  } catch (error) {
    console.log(`severConnection failed ${error}`);
  }
};
startServer();

app.use("/api/auth", authrouter);
app.use("/api", productRouter);
app.use("/api", getRouter);
// app.get("/api/product", async (req, res) => {
//   try {
//     const allOrders = await orderplace.aggregate([
//       {
//         $lookup: {
//           from: "users",
//           localField: "orderby",
//           foreignField: "_id",
//           as: "userDetails",
//         },
//       },
//       { $unwind: "$userDetails" },
//       { $unwind: "$allOrder" },
//       {
//         $lookup: {
//           from: "productitems",
//           localField: "allOrder.product",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       { $unwind: "$productDetails" },
//       {
//         $project: {
//           _id: 0,
//           orderId: "$_id",
//           userName: "$userDetails.name",
//           userEmail: "$userDetails.email",
//           DeliveryStatus: "$DeliveryStatus",
//           orderDate: "$createdAt",
//           productName: "$productDetails.productTitle", // or name
//           productPrice: "$allOrder.price",
//           quantity: "$allOrder.quantity",
//           paymentStatus: "$allOrder.PeymentMetod",
//           DeliveryStatus: "$allOrder.DeliveryStatus",
//           totalItemPrice: {
//             $multiply: ["$allOrder.Price", "$allOrder.quantity"],
//           },
//           productImage: {
//             $cond: {
//               if: { $isArray: "$productDetails.productImages" },
//               then: { $arrayElemAt: ["$productDetails.productImages", 0] },
//               else: "$productDetails.productImages", // fallback if only a single image field
//             },
//           },
//         },
//       },
//     ]);

//     res.json({ success: true, products: allOrders });
//   } catch (error) {
//     console.log(error);
//   }
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./storage");
//   },
//   filename: (req, file, cd) => {
//     const fileName = Date.now() + path.extname(file.originalname);
//     cd(null, fileName);
//   },
// });

// const upload = multer({
//   storage: storage,
//   limits: 1024 * 1024 * 5,
// });
// app.post("/uploader", uploader.array("userfile", 5), async (req, res) => {
//   const filePath = req.files;
//   console.log(filePath);
//   const uploadedFile = [];
//   const failedFile = [];

//   for (const file of filePath) {
//     try {
//       const isVideo = file.mimetype.startsWith("video/");
//       const uploadfile = await cloudUploader(file.path, isVideo);

//       uploadedFile.push({
//         image: !isVideo && uploadfile.secure_url,
//         video: isVideo && uploadfile.secure_url,
//         type: isVideo ? "video" : "image",
//       });
//     } catch (error) {
//       console.log(file);
//       failedFile.push(file);
//     }
//   }

//   res.send(uploadedFile.map((file) => file));

//   console.log(uploadedFile);
// res.send(filePath);
// setTimeout(() => {
//   deleteFile(filePath).then(() => {
//     console.log("deletefile is running");
//   });
// }, 10000);
// });

// setTimeout(() => {
//   deleteFile(filePath).then(() => {
//     console.log("deletefile is running");
//   });
// }, 4000);

// const redis = new Redis({
//   host: "localhost",
//   port: 6379,
// });

// redis.set("hello", "world");
// redis.get("hello").then((result) => {
//   console.log(result); // Should print "world"
// });

// const transpoter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 587,
//   auth: {
//     user: "87ce4b001@smtp-brevo.com",
//     pass: "Z7rjI21WaRXMFyY3",
//   },
// });

// const sendNodeMailer = async () => {
//   try {
//     transpoter.sendMail({
//       from: "my name is rehan khan <rehankhan2mrk@gmail.com>",
//       to: "mdrehankhan322002@gmail.com",
//       subject: "hello rehan",
//       text: "you are amazing perton",
//       html: ` <div style="text-align:center;">
// //           <h2>Welcome, Rehan!</h2>
// //           <a href="www.google.com">
// //           <img src="https://res.cloudinary.com/dp3iyxldc/image/upload/v1743944300/ko6wjsqxqyvzzv1k5ayo.png" alt="Welcome" width="300"/></a>
// //           <p>Thanks for joining our platform ❤️ ❤️❤️❤️❤️❤️❤️</p>
// //         </div>`,
//     });
//   } catch (error) {}
// };
// sendNodeMailer();

// const resend = new Resend(process.env.RESEND_API_KEY);

// const sendEmail = async () => {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: "Trend Mode <noreply@trendmode.in>",
//       // Use this during dev
//       to: "mdrehankhan322002@gmail.com",
//       subject: "cloudnery image",

//       html: `
//         <div style="text-align:center;">
//           <h2>Welcome, Rehan!</h2>
//           <a href="www.google.com">
//           <img src="https://res.cloudinary.com/dp3iyxldc/image/upload/v1743944300/ko6wjsqxqyvzzv1k5ayo.png" alt="Welcome" width="300"/></a>
//           <p>Thanks for joining our platform ❤️ ❤️❤️❤️❤️❤️❤️</p>
//         </div>
//       `,
//     });

//     if (error) {
//       console.error("Error:", error);
//     } else {
//       console.log("Email sent:", data);
//     }
//   } catch (err) {
//     console.log("Unexpected error:", err);
//   }
// };

// sendEmail();
