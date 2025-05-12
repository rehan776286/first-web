import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const dbconnect = await mongoose.connect(process.env.DBURL);

    console.log(`mongodb has connect at ${dbconnect.connection.host}`);
  } catch (error) {
    console.log(`mongodb dbconnection error ${error}`);
  }
};

export default dbConnection;
