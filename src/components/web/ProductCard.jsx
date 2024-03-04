import { EyeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { imageUrl } from "@/config/imageUrl";
import Link from "next/link";

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export const HomeProductCard = ({ id, slug, name, price, imageSrc }) => {
  return (
    <Link href={`/${slug}`}>
      <div className="space-y-3">
        <div className="relative flex justify-center items-center group">
          <div className="absolute top-0 right-0 group:hover:opacity-100 opacity-0 transition duration-200">
            <EyeIcon size={26} />
          </div>
          <div className="relative w-full h-[230px] rounded-lg overflow-hidden">
            <Image alt="Placeholder" src={`${imageUrl}/${id}/${imageSrc}`} fill className="object-cover hover:scale-105 transition duration-300" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <h4>{name}</h4>
          <h4>{formatter.format(price)}</h4>
        </div>
      </div>
    </Link>
  );
};
