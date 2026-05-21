export interface Product {
  id: number;
  name: string;
  price: number;
  description: string | null;
  image: string | null;
  createdAt: string;
  userId: number;
}
