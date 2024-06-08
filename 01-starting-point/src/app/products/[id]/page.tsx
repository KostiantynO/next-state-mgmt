import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { addToCart } from '@/api/cart';
import { getProductById, getProducts } from '@/api/products';
import { addReview } from '@/api/products';
import AddToCart from '@/app/components/AddToCart';
import { ProductCard } from '@/app/components/ProductCard';

import AverageRating from './components/AverageRating';
import Reviews from './components/Reviews';

export const dynamic = 'force-dynamic';

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const productId = Number(id);
  const product = await getProductById(productId);
  const products = await getProducts();

  if (!product) {
    notFound();
  }

  const addToCartAction = async () => {
    'use server';
    return await addToCart(productId);
  };
  const addReviewAction = async (text: string, rating: number) => {
    'use server';
    const reviews = await addReview(productId, { text, rating });
    revalidatePath(`/products/${id}`);
    return reviews ?? [];
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full md:w-1/2">
        <Image
          className="aspect-[2/2] rounded-md object-cover"
          src={product.image ?? ''}
          alt={`${product.name} image`}
          width={1024}
          height={1024}
        />
      </div>
      <div className="w-full p-5 md:w-1/2">
        <h1 className="text-3xl font-bold leading-10 text-gray-100">
          {product.name}
        </h1>
        <div className="text-md my-1 leading-5 text-gray-300">
          {product.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </div>
        <div className="mt-1 text-sm font-light italic leading-5 text-gray-300">
          {product.description}
        </div>
        <AverageRating reviews={product.reviews} />
        <div className="flex justify-end">
          <AddToCart addToCartAction={addToCartAction} />
        </div>
      </div>
      <div className="w-full">
        <Reviews reviews={product.reviews} addReviewAction={addReviewAction} />
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <h1 className="-mb-2 mt-2 text-2xl font-bold">Related Products</h1>
        <ul role="list" className="m-2 flex flex-row flex-wrap">
          {products
            .filter(p => p.id !== productId)
            .map(productObj => (
              <li key={productObj.id} className="md:w-1/5">
                <Link href={`/products/${productObj.id}`}>
                  <ProductCard {...productObj} small />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
