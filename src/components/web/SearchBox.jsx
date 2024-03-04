"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const SearchBox = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function handlePushSearch(event) {
    if (event.code === "Enter") {
      router.push(`/?query=${query}`);
    }
  }

  return (
    <div>
      <input placeholder="Search ..." onChange={handleSearch} onKeyUp={handlePushSearch} className="input-sm border-none focus:outline-none focus:ring-0" />
    </div>
  );
};
