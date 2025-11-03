import { OrderConfirmationEmail } from "@/email/order-confirmation";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, customerDetails, items, totals } = body;

    const { data, error } = await resend.emails.send({
      from: `Audiophile <${process.env.EMAIL_FROM}>`,
      to: [customerDetails.email],
      subject: `Order Confirmation - ${orderId}`,
      react: OrderConfirmationEmail({
        orderId,
        customerName: customerDetails.name,
        items,
        totals,
      }),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
