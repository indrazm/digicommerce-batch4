"use client";

import Script from "next/script";

export const PaymentBtn = () => {
  async function handlePayment() {
    const res = await fetch("/api/v1/payment", {
      method: "POST",
    });
    const { token } = await res.json();
    window.snap.pay(token, {
      onSuccess: () => {
        console.log("MBAYAR SUKSES");
      },
    });
  }
  return (
    <div>
      <Script src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY} />
      <button className="w-fit" onClick={handlePayment}>
        Pay
      </button>
    </div>
  );
};
