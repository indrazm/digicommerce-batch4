import { BarChart2, BoxIcon, Boxes, Receipt, ReceiptEuro, ReceiptText } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="w-full h-screen py-20">
      <main className="max-w-7xl m-auto space-y-6">
        <header className="w-full flex justify-between items-center">
          <div className="font-bold text-lg tracking-tight ml-2">Digicommerce.</div>
          <div className="flex gap-2 items-center">
            <div className="font-medium">Indra Zulfi</div>
            <div className="w-7 h-7 text-xs font-bold bg-primary text-white rounded-full flex justify-center items-center">in</div>
          </div>
        </header>
        <div className="flex gap-8">
          <aside className="w-64">
            <Link className="block" href="/dashboard">
              <div className="flex gap-2 items-center hover:bg-primary/5 p-2 font-medium cursor-pointer rounded-xl transition duration-200 ease-in-out">
                <BarChart2 size={18} />
                <p>Dashboard</p>
              </div>
            </Link>
            <Link className="block" href="/dashboard/products">
              <div className="flex gap-2 items-center hover:bg-primary/5 p-2 font-medium cursor-pointer rounded-xl transition duration-200 ease-in-out">
                <BoxIcon size={18} />
                <p>Products</p>
              </div>
            </Link>
            <Link className="block" href="/dashboard/orders">
              <div className="flex gap-2 items-center hover:bg-primary/5 p-2 font-medium cursor-pointer rounded-xl transition duration-200 ease-in-out">
                <ReceiptText size={18} />
                <p>Orders</p>
              </div>
            </Link>
          </aside>
          <section className="w-[calc(100%-16rem)]">{children}</section>
        </div>
      </main>
    </div>
  );
}
