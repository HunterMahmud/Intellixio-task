import React from "react";

import { Products } from "@/views/products/products";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <Suspense>
      <Products />
    </Suspense>
  );
}
