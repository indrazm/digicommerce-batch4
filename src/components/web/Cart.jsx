"use client";

import { cartAtom } from "@/context/cart";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Script from "next/script";

export const Cart = () => {
  const [cart] = useAtom(cartAtom);
  const [user, setUser] = useState(null);
  const totalCart = cart.reduce((acc, curr) => acc + curr.price, 0);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  async function handleCreateOrder() {
    const buyerId = user.id;
    const products = cart.map((item) => item.id);

    // create order
    const res = await fetch("/api/v1/orders", {
      method: "POST",
      body: JSON.stringify({ buyerId, products }),
    });
    const { orderId } = await res.json();

    // create payment
    const resPayment = await fetch("/api/v1/payment", {
      method: "POST",
      body: JSON.stringify({ orderId, amount: totalCart }),
    });
    const token = await resPayment.json();
    window.snap.pay(token, {
      onSuccess: () => {
        // logic untuk patch order sesuai order_id
        console.log("Suksess bro bayarmu!");
      },
    });
  }

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUser(parsedUserData);
    }
  }, []);

  return (
    <main>
      <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />
      <div className="space-y-2">
        {cart.map(({ id, name, price }) => {
          return (
            <div key={id} className="flex justify-between items-center">
              <h3>{name}</h3>
              <h3>{formatter.format(price)}</h3>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-8 border-t pt-8">
        <h1>Total</h1>
        <h1>{formatter.format(totalCart)}</h1>
      </div>
      <div className="flex justify-end">
        <button className="w-fit" onClick={handleCreateOrder}>
          Checkout
        </button>
      </div>
    </main>
  );
};
