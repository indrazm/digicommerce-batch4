import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export async function POST(req) {
  const { orderId, amount } = await req.json();

  // logic untuk buat token ke midtrans
  const paymentDetails = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount,
    },
  };

  const token = await snap.createTransactionToken(paymentDetails);

  return NextResponse.json(token);
}
