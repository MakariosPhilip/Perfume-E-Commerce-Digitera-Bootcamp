import { sanityProductsService } from "@/features/products/services/products.sanity";
import type {
  Product,
  ProductFilterOptions,
  ProductId,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";

export type ProductsService = {
  list(query: ProductListQuery): Promise<ProductListResult>;
  getById(id: ProductId): Promise<Product | null>;
  filterOptions(): Promise<ProductFilterOptions>;
};

export const productsService: ProductsService = sanityProductsService;
