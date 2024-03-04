import Midtrans from "midtrans-client";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

const paymentDetails = {
  transaction_details: {
    order_id: nanoid(),
    gross_amount: 80000,
  },
};

export async function POST(req) {
  const token = await snap.createTransactionToken(paymentDetails);
  console.log(token);

  return NextResponse.json({ token });
}
