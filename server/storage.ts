import mongoose from "mongoose";
import { Product, Category } from "./models";
import { type InsertProduct, type InsertCategory, type ProductType, type CategoryType } from "@shared/schema";

let isConnected = false;

export async function connectDB() {
  if (isConnected && mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export interface IStorage {
  getAllProducts(): Promise<ProductType[]>;
  getProductById(id: string): Promise<ProductType | null>;
  getProductsByCategory(categoryId: string): Promise<ProductType[]>;
  createProduct(product: InsertProduct): Promise<ProductType>;
  updateProduct(id: string, product: Partial<InsertProduct>): Promise<ProductType | null>;
  deleteProduct(id: string): Promise<boolean>;
  
  getAllCategories(): Promise<CategoryType[]>;
  getCategoryById(id: string): Promise<CategoryType | null>;
  createCategory(category: InsertCategory): Promise<CategoryType>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<CategoryType | null>;
  deleteCategory(id: string): Promise<boolean>;
}

export class MongoStorage implements IStorage {
  async getAllProducts(): Promise<ProductType[]> {
    await connectDB();
    const products = await Product.find({}).lean();
    return products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      shortDescription: p.shortDescription,
      image: p.image,
      category: p.category,
      categoryId: p.categoryId,
      features: p.features,
      benefits: p.benefits,
      ingredients: p.ingredients,
      usage: p.usage,
    }));
  }

  async getProductById(id: string): Promise<ProductType | null> {
    await connectDB();
    const product = await Product.findOne({ id }).lean();
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      image: product.image,
      category: product.category,
      categoryId: product.categoryId,
      features: product.features,
      benefits: product.benefits,
      ingredients: product.ingredients,
      usage: product.usage,
    };
  }

  async getProductsByCategory(categoryId: string): Promise<ProductType[]> {
    await connectDB();
    const products = await Product.find({ categoryId }).lean();
    return products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      shortDescription: p.shortDescription,
      image: p.image,
      category: p.category,
      categoryId: p.categoryId,
      features: p.features,
      benefits: p.benefits,
      ingredients: p.ingredients,
      usage: p.usage,
    }));
  }

  async createProduct(product: InsertProduct): Promise<ProductType> {
    await connectDB();
    const newProduct = new Product(product);
    await newProduct.save();
    return {
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      shortDescription: newProduct.shortDescription,
      image: newProduct.image,
      category: newProduct.category,
      categoryId: newProduct.categoryId,
      features: newProduct.features,
      benefits: newProduct.benefits,
      ingredients: newProduct.ingredients,
      usage: newProduct.usage,
    };
  }

  async updateProduct(id: string, product: Partial<InsertProduct>): Promise<ProductType | null> {
    await connectDB();
    const updated = await Product.findOneAndUpdate({ id }, product, { new: true }).lean();
    if (!updated) return null;
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      shortDescription: updated.shortDescription,
      image: updated.image,
      category: updated.category,
      categoryId: updated.categoryId,
      features: updated.features,
      benefits: updated.benefits,
      ingredients: updated.ingredients,
      usage: updated.usage,
    };
  }

  async deleteProduct(id: string): Promise<boolean> {
    await connectDB();
    const result = await Product.deleteOne({ id });
    return result.deletedCount > 0;
  }

  async getAllCategories(): Promise<CategoryType[]> {
    await connectDB();
    const categories = await Category.find({}).lean();
    return categories.map(c => ({
      id: c.id,
      name: c.name,
      description: c.description,
      image: c.image,
    }));
  }

  async getCategoryById(id: string): Promise<CategoryType | null> {
    await connectDB();
    const category = await Category.findOne({ id }).lean();
    if (!category) return null;
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      image: category.image,
    };
  }

  async createCategory(category: InsertCategory): Promise<CategoryType> {
    await connectDB();
    const newCategory = new Category(category);
    await newCategory.save();
    return {
      id: newCategory.id,
      name: newCategory.name,
      description: newCategory.description,
      image: newCategory.image,
    };
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<CategoryType | null> {
    await connectDB();
    const updated = await Category.findOneAndUpdate({ id }, category, { new: true }).lean();
    if (!updated) return null;
    return {
      id: updated.id,
      name: updated.name,
      description: updated.description,
      image: updated.image,
    };
  }

  async deleteCategory(id: string): Promise<boolean> {
    await connectDB();
    const result = await Category.deleteOne({ id });
    return result.deletedCount > 0;
  }
}

export const storage = new MongoStorage();
