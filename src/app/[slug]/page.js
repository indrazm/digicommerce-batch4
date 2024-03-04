import { Header } from "@/components/web/Header";
import { imageUrl } from "@/config/imageUrl";
import Image from "next/image";
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
    <div className="max-w-7xl m-auto space-y-6 mb-12">
      <Header />
      <section className="flex justify-between items-end">
        <div>
          <h1>{data.name}</h1>
          <div>
            {data.author.username} - {data.category}
          </div>
        </div>
        <button className="w-fit">Add to cart ${data.price}</button>
      </section>
      <section className="grid grid-cols-2 gap-10">
        {images.map((image) => {
          return <Image key={image} alt="Product Image" src={`${imageUrl}/${data.id}/${image}`} width={600} height={400} className="rounded-lg" />;
        })}
      </section>
      <section>
        <p>{data.description}</p>
      </section>
    </div>
  );
}
