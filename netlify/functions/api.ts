import express, { type Request, Response, NextFunction, Router } from "express";
import serverless from "serverless-http";
import { storage } from "../../server/storage";
import { insertProductSchema, insertCategorySchema } from "../../shared/schema";

const app = express();
const router = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router.get("/products", async (req, res) => {
  console.log("[Netlify Function] GET /products - Starting");
  try {
    console.log("[Netlify Function] Fetching products from storage");
    const products = await storage.getAllProducts();
    console.log(`[Netlify Function] Successfully fetched ${products.length} products`);
    res.json(products);
  } catch (error) {
    console.error("[Netlify Function] Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products", details: error instanceof Error ? error.message : String(error) });
  }
});

router.get("/products/:id", async (req, res) => {
  console.log(`[Netlify Function] GET /products/${req.params.id} - Starting`);
  try {
    const product = await storage.getProductById(req.params.id);
    if (!product) {
      console.log(`[Netlify Function] Product ${req.params.id} not found`);
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(`[Netlify Function] Successfully fetched product ${req.params.id}`);
    res.json(product);
  } catch (error) {
    console.error(`[Netlify Function] Error fetching product ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch product", details: error instanceof Error ? error.message : String(error) });
  }
});

router.get("/categories/:id/products", async (req, res) => {
  try {
    const products = await storage.getProductsByCategory(req.params.id);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

router.post("/products", async (req, res) => {
  try {
    const validatedData = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(validatedData);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: "Invalid product data" });
  }
});

router.get("/categories", async (req, res) => {
  console.log("[Netlify Function] GET /categories - Starting");
  console.log("[Netlify Function] MONGODB_URI exists:", !!process.env.MONGODB_URI);
  try {
    console.log("[Netlify Function] Fetching categories from storage");
    const categories = await storage.getAllCategories();
    console.log(`[Netlify Function] Successfully fetched ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    console.error("[Netlify Function] Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories", details: error instanceof Error ? error.message : String(error) });
  }
});

router.get("/categories/:id", async (req, res) => {
  console.log(`[Netlify Function] GET /categories/${req.params.id} - Starting`);
  try {
    const category = await storage.getCategoryById(req.params.id);
    if (!category) {
      console.log(`[Netlify Function] Category ${req.params.id} not found`);
      return res.status(404).json({ error: "Category not found" });
    }
    console.log(`[Netlify Function] Successfully fetched category ${req.params.id}`);
    res.json(category);
  } catch (error) {
    console.error(`[Netlify Function] Error fetching category ${req.params.id}:`, error);
    res.status(500).json({ error: "Failed to fetch category", details: error instanceof Error ? error.message : String(error) });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const validatedData = insertCategorySchema.parse(req.body);
    const category = await storage.createCategory(validatedData);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Invalid category data" });
  }
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

app.use('/.netlify/functions/api', router);

export const handler = async (event: any, context: any) => {
  console.log("[Netlify Function] Handler invoked");
  console.log("[Netlify Function] Event path:", event.path);
  console.log("[Netlify Function] Event method:", event.httpMethod);
  context.callbackWaitsForEmptyEventLoop = false;
  const serverlessHandler = serverless(app);
  try {
    const result = await serverlessHandler(event, context);
    console.log("[Netlify Function] Handler completed successfully");
    return result;
  } catch (error) {
    console.error("[Netlify Function] Handler error:", error);
    throw error;
  }
};
