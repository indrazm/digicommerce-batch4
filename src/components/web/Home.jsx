import React from "react";
import { Header } from "./Header";
import Image from "next/image";
import { EyeIcon, EyeOff } from "lucide-react";
import { HomeProductCard } from "./ProductCard";
import Link from "next/link";

export const Home = ({ productData, totalProducts }) => {
  return (
    <div className="max-w-5xl m-auto space-y-6 mb-12">
      <Header />
      <section className="h-[320px] flex flex-col justify-center text-center ">
        <div className="space-y-4">
          <h1 className="max-w-3xl m-auto text-5xl font-medium tracking-tight">{totalProducts} curated design resources to speed up your creative workflow.</h1>
          <h3>Join a growing family of 746,594 designers and makers from around the world.</h3>
          <div className="flex justify-center gap-2">
            <Link href={`/category/UIKIT`}>
              <button className="w-fit btn-outline">UI Kit</button>
            </Link>
            <Link href={`/category/TEMPLATE`}>
              <button className="w-fit btn-outline">Template</button>
            </Link>
            <Link href={`/category/FONTS`}>
              <button className="w-fit btn-outline">Fonts</button>
            </Link>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-3 gap-8">
        {productData.map(({ id, slug, name, price, featuredImage }) => {
          return <HomeProductCard slug={slug} key={id} id={id} name={name} price={price} imageSrc={featuredImage} />;
        })}
      </section>
    </div>
  );
};
