"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { useRouter, useSearchParams } from "next/navigation";


export const Products: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

   
  // Open modal based on URL parameter
  useEffect(() => {
    const productId = searchParams.get("product");
    
    if (productId) {
      const product = PRODUCTS_DATA.find((p) => p.id === productId);
      if (product) setSelectedProduct(product);
    }
  }, [searchParams]);

  // Close modal if route changes away from products page
  useEffect(() => {
    // console.log("pathname: ", pathname);
    // console.log("window location: ",window.location.href);
    // const path = window.location.href;
    const productId = searchParams.get("product");
    // console.log("product id: ",productId);
    
    if (productId === null) {
      setSelectedProduct(null);
    }
  }, [router, searchParams]);


  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    router.push(`?product=${product.id}`);
  }, [router]);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    router.push("");
  }, [router]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
