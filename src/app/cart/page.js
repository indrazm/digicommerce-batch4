import { Cart } from "@/components/web/Cart";
import { Header } from "@/components/web/Header";

export default function Page() {
  return (
    <div className="max-w-5xl m-auto space-y-6 mb-12">
      <Header />
      <Cart />
    </div>
  );
}
