"use client";

import { useQuery } from "@tanstack/react-query";
import { productQueryKeys } from "@/features/products/hooks/product-query-keys";
import { productsService } from "@/features/products/services/products.service";

export function useProductFilterOptions() {
  return useQuery({
    queryKey: productQueryKeys.filterOptions(),
    queryFn: () => productsService.filterOptions(),
  });
}