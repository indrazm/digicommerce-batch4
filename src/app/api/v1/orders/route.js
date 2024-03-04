import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { products, buyerId } = await req.json();

  try {
    const createOrder = await prisma.order.create({
      data: {
        buyerId,
      },
    });

    products.forEach(async (productId) => {
      await prisma.orderedProduct.create({
        data: {
          productId,
          orderId: createOrder.id,
        },
      });
    });

    return NextResponse.json({ orderId: createOrder.id, message: "Create order succesfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errorMessage: "Create order failed" });
  }
}
