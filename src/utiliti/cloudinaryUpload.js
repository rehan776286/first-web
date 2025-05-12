import cloudinary from "../Config/cloudinaryConfig.js";
import deleteFile from "./deleteFile.js";

const cloudUploader = async (file, isVideo = false) => {
  try {
    const resultFile = await cloudinary.uploader.upload(file, {
      resource_type: isVideo ? "video" : "image",
      folder: isVideo ? "my video" : "my file",
    });
    return resultFile;
  } catch (error) {
    throw new Error("cloadinary failed " + error.message);
  }
};

export default cloudUploader;
