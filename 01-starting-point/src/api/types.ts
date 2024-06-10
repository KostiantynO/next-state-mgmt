export interface Review {
  rating: number;
  text: string;
}

export type ReviewsArray = Review[];

export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  reviews: ReviewsArray;
}

type PartialProduct = Pick<Product, 'id' | 'name' | 'image' | 'price'>;

export interface Cart {
  products: PartialProduct[];
}
