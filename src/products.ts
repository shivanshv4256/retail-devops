export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    id: "sku-101",
    name: "Trail Running Shoes",
    category: "Footwear",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sku-102",
    name: "Performance Hoodie",
    category: "Apparel",
    price: 69.5,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sku-103",
    name: "Smart Water Bottle",
    category: "Accessories",
    price: 39.0,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "sku-104",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 99.0,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
  },
];
