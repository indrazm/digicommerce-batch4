"use client";

import Image from "next/image";
import { useState } from "react";

export default function Page() {
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [productImagesPreview, setProductImagesPreview] = useState([]);

  function createFeaturedImagePreview(file) {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(objectUrl);
    }
  }

  function createProductImagesPreview(files) {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const objectUrl = URL.createObjectURL(files[i]);
        setProductImagesPreview((prev) => [...prev, objectUrl]);
      }
    }
  }

  async function handleSubmitProduct(formData) {
    const user = JSON.parse(localStorage.getItem("user"));
    const authorId = user.id;

    formData.append("authorId", authorId);

    const res = await fetch("/api/v1/products", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <main className="space-y-8">
      <section className="flex justify-between items-center">
        <div>
          <h1>Create Product</h1>
          <p>Fill your product details</p>
        </div>
      </section>

      <form action={handleSubmitProduct}>
        <section className="space-y-3">
          <section className="grid grid-cols-2 gap-4">
            <div>
              <label>Product name</label>
              <input name="name" placeholder="Product name" />
            </div>
            <div>
              <label>Product category</label>
              <select name="category">
                <option value="ILLUSTRATION">Illustration</option>
                <option value="FONTS">Fonts</option>
                <option value="UIKIT">UI kit</option>
                <option value="TEMPLATE">Template</option>
                <option value="MOCKUPS">Mockups</option>
              </select>
            </div>
          </section>
          <div>
            <label>Product description</label>
            <textarea name="description" placeholder="Product description" rows={6}></textarea>
          </div>
          <div>
            <label>Price</label>
            <input name="price" placeholder="0" type="number" />
          </div>
          <div>
            <label>Featured Image</label>
            <input
              name="featuredImage"
              type="file"
              className="file-input file-input-bordered"
              onChange={(event) => createFeaturedImagePreview(event.target.files[0])}
            />
            {featuredImagePreview ? <Image alt="Featured Image" src={featuredImagePreview} width={200} height={200} className="rounded-lg" /> : null}
          </div>
          <div>
            <label>Product Images</label>
            <input
              name="productImages"
              type="file"
              multiple
              className="file-input file-input-bordered"
              onChange={(event) => createProductImagesPreview(event.target.files)}
            />
          </div>
          <div className="flex gap-4">
            {productImagesPreview.map((image) => {
              return <Image key={image} alt="Featured Image" src={image} width={200} height={200} className="rounded-lg border" />;
            })}
          </div>
          <button>Submit Product</button>
        </section>
      </form>
    </main>
  );
}
