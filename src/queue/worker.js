import { tryCatch, Worker } from "bullmq";
import connection from "./redisConnection.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
new Worker(
  "email",
  async (job) => {
    const { to, subject, html } = job.data;
    try {
      await resend.emails.send({
        from: "Trend Mode <noreply@trendmode.in>",
        to,
        subject,
        html,
      });
      console.log("✅ Email sent to", to);
    } catch (error) {
      console.error("❌ Failed to send email to", to, "\n", error);
      throw error;
    }
  },
  { connection }
);
