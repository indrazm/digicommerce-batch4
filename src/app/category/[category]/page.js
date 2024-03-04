import { Home } from "@/components/web/Home";

async function getProductsByCategory(queryValue) {
  if (queryValue) {
    const res = await fetch(`http://localhost:3000/api/v1/products?category=${queryValue}`);
    const data = await res.json();
    return data;
  }
  const res = await fetch("http://localhost:3000/api/v1/products");
  const data = await res.json();
  return data;
}

async function getProductCount() {
  const res = await fetch("http://localhost:3000/api/v1/products?count=true");
  const data = await res.json();
  return data;
}

export default async function Page({ params }) {
  const category = params.category;
  const { data } = await getProductsByCategory(category);
  const { data: totalAllProducts } = await getProductCount();

  return <Home productData={data} totalProducts={totalAllProducts} />;
}
