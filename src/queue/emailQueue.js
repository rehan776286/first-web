import { Queue } from "bullmq";
import connection from "./redisConnection.js";

const emailQueue = new Queue("email", { connection });
export default emailQueue;
