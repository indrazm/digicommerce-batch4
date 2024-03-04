import { Header } from "@/components/web/Header";
import { SingleProduct } from "@/components/web/SingleProduct";

import React from "react";

async function getProductBySlug(slug) {
  const res = await fetch(`http://localhost:3000/api/v1/products?slug=${slug}`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const slug = params.slug;
  const { data } = await getProductBySlug(slug);
  const images = JSON.parse(data.images);

  return (
    <div className="max-w-5xl m-auto space-y-6 mb-12">
      <Header />
      <SingleProduct data={data} images={images} />
    </div>
  );
}
