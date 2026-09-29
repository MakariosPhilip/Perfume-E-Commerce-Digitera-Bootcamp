import type { Product } from "@/features/products/types/product.types";
import {
  formatPrice,
  parseProductListQuery,
  resolveProductImages,
  selectProducts,
} from "./product.utils";

const testProducts: Product[] = [
  { id: "fleur-de-lune", name: "Fleur de Lune", description: "", notes: "", price: 195, images: [], category: "pure-extractions", scentFamily: "floral", occasion: "personal-use", options: [] },
  { id: "santal-parchment", name: "Santal Parchment", description: "", notes: "", price: 220, images: [], category: "pure-extractions", scentFamily: "woody", occasion: "personal-use", options: [] },
  { id: "noir-cocoon", name: "Noir Cocoon", description: "", notes: "", price: 240, images: [], category: "private-reserve", scentFamily: "oriental", occasion: "wedding", options: [] },
  { id: "sol-dor", name: "Sol d'Or", description: "", notes: "", price: 185, images: [], category: "pure-extractions", scentFamily: "fresh", occasion: "personal-use", options: [] },
  { id: "atelier-oud", name: "Atelier Oud", description: "", notes: "", price: 310, images: [], category: "atelier-oils", scentFamily: "woody", occasion: "gift-sets", options: [] },
  { id: "rose-absolute", name: "Rose Absolute", description: "", notes: "", price: 205, images: [], category: "private-reserve", scentFamily: "floral", occasion: "birthday", options: [] },
];

describe("formatPrice", () => {
  it("formats a USD amount", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });
});

describe("resolveProductImages", () => {
  it("uses only images provided by the product document", () => {
    expect(resolveProductImages(testProducts[0])).toEqual([]);
    expect(
      resolveProductImages({ ...testProducts[0], images: ["https://cdn.test/image.jpg"] }),
    ).toEqual(["https://cdn.test/image.jpg"]);
  });
});

describe("parseProductListQuery", () => {
  it("reads list query values from search params", () => {
    expect(
      parseProductListQuery({
        search: "mug",
        category: ["home", "garden"],
        scentFamily: "woody",
        occasion: "wedding,birthday",
        sort: "price-asc",
        page: "2",
        pageSize: "4",
      }),
    ).toEqual({
      search: "mug",
      categories: ["home", "garden"],
      scentFamilies: ["woody"],
      occasions: ["wedding", "birthday"],
      sort: "price-asc",
      page: 2,
      pageSize: 6,
    });
  });
});

describe("selectProducts", () => {
  it("searches, filters, sorts, and pages six products", () => {
    const searched = selectProducts(testProducts, { search: "rose" });
    expect(searched.items.map((product) => product.id)).toEqual(["rose-absolute"]);
    expect(searched.total).toBe(1);

    const woody = selectProducts(testProducts, {
      scentFamilies: ["woody"],
      sort: "price-asc",
    });
    expect(woody.items.map((product) => product.name)).toEqual([
      "Santal Parchment",
      "Atelier Oud",
    ]);

    const page = selectProducts(
      Array.from({ length: 8 }, (_, index) => ({
        ...testProducts[0],
        id: `product-${index}`,
        name: `Product ${index}`,
        price: index,
      })),
      { sort: "price-asc", page: 2 },
    );
    expect(page.items).toHaveLength(2);
    expect(page.pageSize).toBe(6);
    expect(page.total).toBe(8);
  });

  it("keeps products inside the selected price range", () => {
    expect(parseProductListQuery({ minPrice: "150", maxPrice: "300" })).toMatchObject({
      minPrice: 150,
      maxPrice: 300,
    });

    const priced = selectProducts(testProducts, {
      maxPrice: 200,
      sort: "price-asc",
    });
    expect(priced.items.map((product) => product.name)).toEqual([
      "Sol d'Or",
      "Fleur de Lune",
    ]);
  });
});
