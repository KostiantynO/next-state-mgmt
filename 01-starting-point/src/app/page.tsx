import Link from 'next/link';

import { getProducts } from '@/api/products';

import { ProductCard } from './components/ProductCard';

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="flex flex-wrap gap-2">
      <ul role="list" className="m-2 flex flex-row flex-wrap">
        {products.map((product, idx) => (
          <li key={product.id} className="md:w-1/3">
            <Link href={`/products/${product.id}`}>
              <ProductCard {...product} isAboveTheFold imageIdx={idx} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
