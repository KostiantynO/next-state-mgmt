import Image from 'next/image';

export const ProductCard = ({
  name,
  description,
  price,
  image,
  small,
}: {
  name?: string;
  image?: string | null;
  description?: string;
  price?: number;
  small?: boolean;
}) => (
  <div className="flex flex-col p-2">
    <Image
      className={`aspect-[2/2] rounded-md object-cover`}
      src={image ?? ''}
      alt={`${name} image`}
      width={1024}
      height={1024}
    />
    <div>
      {name && (
        <h3
          className={`mt-2 font-bold leading-10 text-gray-100 ${
            small ? '' : 'text-xl'
          }`}
        >
          {name}
        </h3>
      )}
      {!small && price && (
        <div className="text-md my-1 leading-5 text-gray-300">
          {price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </div>
      )}
      {!small && description && (
        <div className="mt-1 text-sm font-light italic leading-5 text-gray-300">
          {description}
        </div>
      )}
    </div>
  </div>
);
