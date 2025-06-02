import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Here you would integrate with an email service or database
    // For demo, just log to server and return success
    console.log("Contact form submission:", { name, email, message });

    // Example: send email using a service like SendGrid, Resend, or Nodemailer
    // await sendEmail({ name, email, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message." }, { status: 500 });
  }
}
