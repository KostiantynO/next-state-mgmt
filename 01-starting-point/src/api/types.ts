export interface Review {
  rating: number;
  text: string;
}

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  reviews: Review[];
}

type PartialProduct = Pick<Product, 'id' | 'name' | 'image' | 'price'>;

export interface Cart {
  products: PartialProduct[];
}
