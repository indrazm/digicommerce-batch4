import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="py-4 flex justify-between">
      <div className="font-medium tracking-tight text-base">Digicommerce.</div>
      <div className="flex gap-12 items-center">
        <div>Products</div>
        <div>Best-selling</div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <div>Login</div>
          </Link>
          <Link href="/register">
            <button className="w-fit">Get Started</button>
          </Link>
        </div>
      </div>
    </header>
  );
};
