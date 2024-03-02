import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
/**
 * Asynchronously handles a POST request.
 *
 * @param {NextRequest} req - the request object
 * @return {Promise} a promise that resolves with the result of handling the POST request
 */
export async function POST(req) {
  const formData = await req.formData();

  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = formData.get("price");
  const featuredImage = formData.get("featuredImage");
  const images = formData.getAll("images");

  const productImages = images.map((image) => slugify(image.name, { lower: true }));

  try {
    const createProduct = await prisma.product.create({
      data: {
        name,
        slug: slugify(name, { lower: true }),
        description,
        category,
        featuredImage: slugify(featuredImage.name, { lower: true }),
        price: Number(price),
        images: productImages,
      },
    });
    console.log(createProduct);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ name, description, category, featuredImage, images });
}
