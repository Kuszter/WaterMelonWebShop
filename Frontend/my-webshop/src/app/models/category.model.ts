import { Product } from "./product.model";
export interface Category {
    id: string;
    name: string;
    imageUrl: string;
    products?: Product[]; 
  }
  