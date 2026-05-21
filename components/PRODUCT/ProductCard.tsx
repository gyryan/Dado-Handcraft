import { Star } from 'lucide-react';
import { Product } from '../../main';
import { useState } from 'react';

function ImageWithFallback(props: any) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=="
          alt="Error loading image"
          {...rest}
          data-original-url={src}
        />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      {...rest}
      onError={() => setDidError(true)}
    />
  );
}

type ProductCardProps = {
  product: Product;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, onViewProduct, onAddToCart }: ProductCardProps) {
  return (
    <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div
        className="aspect-square overflow-hidden cursor-pointer bg-gray-50"
        onClick={() => onViewProduct(product)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <h3
          className="text-lg text-black mb-2 cursor-pointer hover:text-gray-700 transition-colors"
          onClick={() => onViewProduct(product)}
        >
          {product.name}
        </h3>
        
        {product.rating && (
          <div className="flex items-center mb-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        )}
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl text-black">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => onAddToCart(product)}
            className="bg-[#A8B8A8] text-white px-4 py-2 rounded hover:bg-[#98a898] transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
