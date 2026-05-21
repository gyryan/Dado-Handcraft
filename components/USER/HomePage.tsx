import { ArrowRight, Mail } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';
import { ProductCard } from '../PRODUCT/ProductCard';
import { Product, Page } from '../../main';
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

type HomePageProps = {
  products: Product[];
  onNavigate: (page: Page) => void;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
};

export function HomePage({ products, onNavigate, onViewProduct, onAddToCart }: HomePageProps) {
  const [email, setEmail] = useState('');

  const categories = [
    {
      name: 'Blankets',
      image: 'https://images.unsplash.com/photo-1675269605939-71cbac0e80b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmxhbmtldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc3OTI4MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Hats',
      image: 'https://images.unsplash.com/photo-1723856001946-3b53c9fe3bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaGF0JTIwYmVhbmllfGVufDF8fHx8MTc3OTI4MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1686285961015-12886f9b3bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwdG90ZXxlbnwxfHx8fDE3NzkyODIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1776992026037-98e0eff3a9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3OTI4MjE3NHww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const featuredProducts = products.slice(0, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl text-black mb-6">
                Handmade Crochet Products
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover unique, handcrafted crochet items made with love and care. 
                Each piece is thoughtfully created to bring warmth and style to your life.
              </p>
              <button
                onClick={() => onNavigate('shop')}
                className="bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors inline-flex items-center"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1613722336189-11b95f4ab87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNyYWZ0cyUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzkyODIxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Handmade crafts workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-black mb-4">
              Featured Collections
            </h2>
            <p className="text-gray-600">
              Handpicked favorites from our collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewProduct={onViewProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('shop')}
              className="text-[#A8B8A8] hover:text-[#98a898] transition-colors inline-flex items-center"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-black mb-4">
              Shop By Category
            </h2>
            <p className="text-gray-600">
              Explore our different collections
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => onNavigate('shop')}
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-50 transition-all">
                  <h3 className="text-white text-xl sm:text-2xl">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1632335023958-149d57da14fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YXJuJTIwa25pdHRpbmclMjB3b29sfGVufDF8fHx8MTc3OTI4MjE3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Yarn and crafting materials"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl text-black mb-6">
                About Our Shop
              </h2>
              <p className="text-gray-600 mb-4">
                Da Do Handcrafts PH is your destination for beautifully handmade crochet products. 
                Each item is lovingly crafted with attention to detail, using high-quality materials 
                to ensure durability and comfort.
              </p>
              <p className="text-gray-600 mb-4">
                We believe in the art of slow fashion and the beauty of handmade items. Every stitch 
                tells a story, and every piece is unique, making your purchase truly special.
              </p>
              <p className="text-gray-600">
                Whether you're looking for a cozy blanket, a stylish accessory, or a thoughtful gift, 
                we have something perfect for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#A8B8A8] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-12 h-12 text-white mx-auto mb-6" />
          <h2 className="text-3xl text-white mb-4">
            Get Updates on New Products
          </h2>
          <p className="text-white mb-8 opacity-90">
            Subscribe to our newsletter and be the first to know about new releases and special offers
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded border-0 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-8 py-3 rounded hover:bg-gray-900 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
