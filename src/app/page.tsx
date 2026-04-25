"use client";

import { useEffect, useState } from "react";
import ProductListSec from "@/components/common/ProductListSec";
import Brands from "@/components/homepage/Brands";
import DressStyle from "@/components/homepage/DressStyle";
import Header from "@/components/homepage/Header";
import Reviews from "@/components/homepage/Reviews";
import { Product } from "@/types/product.types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          srcUrl: item.image,
          gallery: [item.image],
          price: item.price,
          discount: {
            amount: 0,
            percentage: 0,
          },
          rating: item.rating?.rate || 4,
        }));

        setProducts(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ SAFE FALLBACKS (prevent crash)
  const safeProducts = products || [];

  return (
    <>
      <Header />
      <Brands />

      <main className="my-[50px] sm:my-[72px]">
        {/* ✅ Loading fallback */}
        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <>
            <ProductListSec
              title="NEW ARRIVALS"
              data={safeProducts.slice(0, 4)}
              viewAllLink="/shop#new-arrivals"
            />

            <div className="max-w-frame mx-auto px-4 xl:px-0">
              <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
            </div>

            <div className="mb-[50px] sm:mb-20">
              <ProductListSec
                title="TOP SELLING"
                data={safeProducts.slice(4, 8)}
                viewAllLink="/shop#top-selling"
              />
            </div>

            <div className="mb-[50px] sm:mb-20">
              <DressStyle />
            </div>

            {/* Optional */}
            {/* <Reviews data={reviewsData} /> */}
          </>
        )}
      </main>
    </>
  );
}