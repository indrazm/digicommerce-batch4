import { uploadFile } from "@/lib/uploadFile";
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get("slug");
  const query = searchParams.get("query");
  const count = searchParams.get("count");
  const category = searchParams.get("category");

  if (count === "true") {
    try {
      const totalAllProducts = await prisma.product.count();
      return NextResponse.json({ data: totalAllProducts, message: "Get data successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ data: null, message: "Get data failed" }, { status: 500 });
    }
  }

  if (category) {
    try {
      const allProductByCategory = await prisma.product.findMany({
        where: {
          category,
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      });
      return NextResponse.json({ data: allProductByCategory, message: "Get data by category successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ data: null, message: "Get data by category failed" }, { status: 500 });
    }
  }

  if (query) {
    try {
      const allProductByQuery = await prisma.product.findMany({
        where: {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      });
      return NextResponse.json({ data: allProductByQuery, message: "Get data by query successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ data: null, message: "Get data by query failed" }, { status: 500 });
    }
  }

  if (slug) {
    try {
      const singleProduct = await prisma.product.findFirst({
        where: {
          slug,
        },
        include: {
          author: {
            select: {
              username: true,
            },
          },
        },
      });
      return NextResponse.json({ data: singleProduct, message: "Get single data successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ data: null, message: "Get single data failed" }, { status: 500 });
    }
  }

  try {
    const allProducts = await prisma.product.findMany({
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });
    return NextResponse.json({ data: allProducts, message: "Get data successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: null, message: "Get data failed" }, { status: 500 });
  }
}

export async function POST(req) {
  const formData = await req.formData();

  const id = nanoid();
  const name = formData.get("name");
  const description = formData.get("description");
  const category = formData.get("category");
  const price = formData.get("price");
  const featuredImage = formData.get("featuredImage");
  const productImages = formData.getAll("productImages");
  const authorId = formData.get("authorId");
  const slug = slugify(name, { lower: true });

  const images = productImages.map((file) => slugify(file.name, { lower: true }));

  // Upload
  try {
    await uploadFile({ Body: featuredImage, Key: featuredImage.name, ContentType: featuredImage.type, Dir: `products/${id}` });
    for (let i = 0; i < productImages.length; i++) {
      await uploadFile({ Body: productImages[i], Key: productImages[i].name, ContentType: productImages[i].type, Dir: `products/${id}` });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const createProduct = await prisma.product.create({
      data: {
        id,
        name,
        slug,
        description,
        featuredImage: slugify(featuredImage.name, { lower: true }),
        price: Number(price),
        category,
        images: JSON.stringify(images),
        authorId,
      },
    });
    console.log(createProduct);
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({});
}
