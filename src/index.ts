import express from "express";
import type { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calculateFinalPrice } from "./pricing.js";
import { products } from "./products.js";

const app: Application = express();
const PORT = Number(process.env.PORT) || 7000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

app.get("/api/products", (_req: Request, res: Response) => {
  return res.status(200).json({ products });
});

app.post("/api/checkout", (req: Request, res: Response) => {
  const items = Array.isArray(req.body?.items)
    ? (req.body.items as Array<{ productId: string; quantity: number }>)
    : [];

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return sum;
    const quantity =
      Number.isFinite(item.quantity) && item.quantity > 0 ? item.quantity : 0;
    return sum + product.price * quantity;
  }, 0);

  const discountPercent = subtotal >= 200 ? 10 : 0;
  const taxPercent = 18;
  const total = calculateFinalPrice(subtotal, discountPercent, taxPercent);

  return res.status(200).json({
    subtotal: Number(subtotal.toFixed(2)),
    discountPercent,
    taxPercent,
    total,
  });
});

app.get("/", (_req: Request, res: Response) => {
  return res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/healthz", (_req: Request, res: Response) => {
  return res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
