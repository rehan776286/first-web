import { Resend } from "resend";
const resend = () => {
  const resends = new Resend(process.env.RESEND_API_KEY);
  return resends;
};

export default resend;
