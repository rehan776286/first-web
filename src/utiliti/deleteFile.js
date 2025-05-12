import path from "path";
import fs from "fs/promises";

const deleteFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`file is deleted ${filePath}`);
  } catch (error) {
    console.log(`deleteFile failed ${filePath}`);
  }
};

export default deleteFile;
