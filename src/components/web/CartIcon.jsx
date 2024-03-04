"use client";

import { cartAtom } from "@/context/cart";
import { useAtom } from "jotai";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export const CartIcon = () => {
  const [cart] = useAtom(cartAtom);

  return (
    <Link href="/cart">
      <div className="relative">
        <ShoppingBag size={18} strokeWidth={1.6} />
        <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs font-bold w-4 h-4 rounded-full flex justify-center items-center">
          {cart.length}
        </div>
      </div>
    </Link>
  );
};
