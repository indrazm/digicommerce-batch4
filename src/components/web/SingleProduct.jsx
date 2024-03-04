"use client";

import React from "react";
import Image from "next/image";
import { imageUrl } from "@/config/imageUrl";
import { useAtom } from "jotai";
import { cartAtom } from "@/context/cart";

export const SingleProduct = ({ data, images }) => {
  const [cart, setCart] = useAtom(cartAtom);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  function handleAddToCart() {
    const newCart = [...cart];
    newCart.push(data);
    setCart(newCart);
  }

  return (
    <>
      <section className="flex justify-between items-end">
        <div>
          <h1>{data.name}</h1>
          <div>
            {data.author.username} - {data.category}
          </div>
        </div>
        <button className="w-fit" onClick={handleAddToCart}>
          Add to cart {formatter.format(data.price)}
        </button>
      </section>
      <section className="grid grid-cols-2 gap-10">
        {images.map((image) => {
          return <Image key={image} alt="Product Image" src={`${imageUrl}/${data.id}/${image}`} width={800} height={800} className="rounded-lg" />;
        })}
      </section>
      <section>
        <p>{data.description}</p>
      </section>
    </>
  );
};
