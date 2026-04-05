declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}
export const CATEGORIES = [
  "LONGSLEEVETSHIRT",
  "POLOSHIRT",
  "SHORTSLEEVETSHIRT",
  "SWEATER",
  "SWEATSHIRT",
  "SLEEVELESS",
  "PANTS",
  "DENIMPANTS",
  "LEGGINGS",
  "SHORTS",
  "SWEATPANTS",
  "JACKET",
] as const;

export type Category = (typeof CATEGORIES)[number];



type ClothingData = {
  brandName: string;
  itemName: string | null;
  price: number | null;
  imageUrls: string[];
  productUrl: string | null;
  category: Category; 
  gender: "MALE" | "FEMALE" | "UNISEX";
};

export {};