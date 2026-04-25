import { Product } from "@/types/product.types";

const productImages = [
  "https://dummyjson.com/image/400x400/000/fff?text=Product+1",
  "https://dummyjson.com/image/400x400/111/fff?text=Product+2",
  "https://dummyjson.com/image/400x400/222/fff?text=Product+3",
  "https://dummyjson.com/image/400x400/333/fff?text=Product+4",
  "https://dummyjson.com/image/400x400/444/fff?text=Product+5",
  "https://dummyjson.com/image/400x400/555/fff?text=Product+6",
  "https://dummyjson.com/image/400x400/666/fff?text=Product+7",
  "https://dummyjson.com/image/400x400/777/fff?text=Product+8",
  "https://dummyjson.com/image/400x400/888/fff?text=Product+9",
  "https://dummyjson.com/image/400x400/999/fff?text=Product+10",

  "https://dummyjson.com/image/400x400/ff0000/fff?text=Product+11",
  "https://dummyjson.com/image/400x400/00ff00/fff?text=Product+12",
  "https://dummyjson.com/image/400x400/0000ff/fff?text=Product+13",
  "https://dummyjson.com/image/400x400/ff00ff/fff?text=Product+14",
  "https://dummyjson.com/image/400x400/00ffff/000?text=Product+15",
  "https://dummyjson.com/image/400x400/ffff00/000?text=Product+16",
  "https://dummyjson.com/image/400x400/123456/fff?text=Product+17",
  "https://dummyjson.com/image/400x400/654321/fff?text=Product+18",
  "https://dummyjson.com/image/400x400/abcdef/000?text=Product+19",
  "https://dummyjson.com/image/400x400/fedcba/000?text=Product+20",

  "https://dummyjson.com/image/400x400/0f0f0f/fff?text=Product+21",
  "https://dummyjson.com/image/400x400/f0f0f0/000?text=Product+22",
  "https://dummyjson.com/image/400x400/1a1a1a/fff?text=Product+23",
  "https://dummyjson.com/image/400x400/2b2b2b/fff?text=Product+24",
  "https://dummyjson.com/image/400x400/3c3c3c/fff?text=Product+25",
  "https://dummyjson.com/image/400x400/4d4d4d/fff?text=Product+26",
  "https://dummyjson.com/image/400x400/5e5e5e/fff?text=Product+27",
  "https://dummyjson.com/image/400x400/6f6f6f/fff?text=Product+28",
  "https://dummyjson.com/image/400x400/7a7a7a/fff?text=Product+29",
  "https://dummyjson.com/image/400x400/8b8b8b/fff?text=Product+30"
];

const createProduct = (id: number): Product => {
  const img = productImages[id % productImages.length];

  return {
    id,
    title: `Product ${id}`,
    srcUrl: img,
    gallery: [img, img, img],
    price: 500 + id * 25,
    discount: {
      amount: Math.round((500 + id * 25) * 0.1),
      percentage: 10,
    },
    rating: +(Math.random() * 5).toFixed(1),
  };
};

export const newArrivalsData: Product[] = Array.from(
  { length: 20 },
  (_, i) => createProduct(i + 1)
);

export const topSellingData: Product[] = Array.from(
  { length: 20 },
  (_, i) => createProduct(i + 101)
);

export const relatedProductData: Product[] = Array.from(
  { length: 20 },
  (_, i) => createProduct(i + 201)
);

export const reviewsData: any[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  user: `User ${i + 1}`,
  rating: +(Math.random() * 5).toFixed(1),
  comment: `This is a sample review for product ${i + 1}`,
}));