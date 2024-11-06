import React, { Suspense } from "react";
import { Products } from "@/views/products";



export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    </Suspense>
  );
}
