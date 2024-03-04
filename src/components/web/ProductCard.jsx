import { EyeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { imageUrl } from "@/config/imageUrl";
import Link from "next/link";

export const HomeProductCard = ({ id, slug, name, price, imageSrc }) => {
  return (
    <Link href={`/${slug}`}>
      <div className="space-y-3">
        <div className="relative flex justify-center items-center group">
          <div className="absolute top-0 right-0 group:hover:opacity-100 opacity-0 transition duration-200">
            <EyeIcon size={26} />
          </div>
          <Image alt="Placeholder" src={`${imageUrl}/${id}/${imageSrc}`} width={600} height={400} className="rounded-lg" />
        </div>
        <div className="flex justify-between items-center">
          <h3>{name}</h3>
          <h3>$ {price}</h3>
        </div>
      </div>
    </Link>
  );
};
