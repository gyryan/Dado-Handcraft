import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { HomePage } from './components/USER/HomePage';
import { ShopPage } from './components/PRODUCT/ShopPage';
import { ProductDetailPage } from './components/PRODUCT/ProductDetailPage';
import { CartPage } from './components/USER/CartPage';
import { CheckoutPage } from './components/PRODUCT/CheckoutPage';
import { LoginPage } from './components/USER/LoginPage';
import { AccountPage } from './components/ADMIN/AccountPage';
import { AdminDashboard } from './components/ADMIN/AdminDashboard';
import { AdminProducts } from './components/ADMIN/AdminProducts';
import { AdminOrders } from './components/ADMIN/AdminOrders';
import { AdminSettings } from './components/ADMIN/AdminSettings';


export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating?: number;
  images?: string[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered';
  items: CartItem[];
  shippingAddress?: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
  };
};

export type Page = 
  | 'home' 
  | 'shop' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'login' 
  | 'account'
  | 'admin-dashboard'
  | 'admin-products'
  | 'admin-orders'
  | 'admin-settings';

export default function Component() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase on component mount
  useEffect(() => {
    fetchProducts();
    checkUser();
  }, []);

  // Fetch products from Supabase
  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data if Supabase fails
        setProducts(mockProducts);
      } else if (data && data.length > 0) {
        // Transform Supabase data to match your Product type
        const transformedProducts: Product[] = data.map((item: any) => ({
          id: item.product_id.toString(),
          name: item.name,
          price: item.price,
          description: item.description || '',
          category: item.category,
          image: item.image_url || '',
          stock: item.stock,
          rating: item.rating,
          images: item.image_url ? [item.image_url] : []
        }));
        setProducts(transformedProducts);
      } else {
        // Use mock data if no products in database
        setProducts(mockProducts);
      }
    } catch (error) {
      console.error('Error:', error);
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  }

  // Check if user is logged in and get their role
  async function checkUser() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setIsLoggedIn(true);
        
        // Get user role from your users table
        const { data: userData, error } = await supabase
          .from('users')
          .select('role')
          .eq('user_id', session.user.id)
          .single();
        
        if (!error && userData) {
          setIsAdmin(userData.role === 'admin');
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  }

  // Mock products as fallback
  const mockProducts: Product[] = [
    {
      id: '1',
      name: 'Cozy Crochet Blanket',
      price: 89.99,
      description: 'Soft and warm handmade crochet blanket, perfect for your living room or bedroom. Made with premium yarn.',
      category: 'Blankets',
      image: 'https://images.unsplash.com/photo-1675269605939-71cbac0e80b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmxhbmtldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc3OTI4MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 15,
      rating: 4.8,
      images: [
        'https://images.unsplash.com/photo-1675269605939-71cbac0e80b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmxhbmtldCUyMGhhbmRtYWRlfGVufDF8fHx8MTc3OTI4MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1632335023958-149d57da14fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YXJuJTIwa25pdHRpbmclMjB3b29sfGVufDF8fHx8MTc3OTI4MjE3NXww&ixlib=rb-4.1.0&q=80&w=1080'
      ]
    },
    {
      id: '2',
      name: 'Winter Beanie Hat',
      price: 24.99,
      description: 'Stylish crochet beanie to keep you warm during cold weather. Available in multiple colors.',
      category: 'Hats',
      image: 'https://images.unsplash.com/photo-1723856001946-3b53c9fe3bc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaGF0JTIwYmVhbmllfGVufDF8fHx8MTc3OTI4MjE3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 25,
      rating: 4.6
    },
    {
      id: '3',
      name: 'Handmade Tote Bag',
      price: 34.99,
      description: 'Durable and stylish crochet tote bag, perfect for shopping or everyday use.',
      category: 'Bags',
      image: 'https://images.unsplash.com/photo-1686285961015-12886f9b3bf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwYmFnJTIwdG90ZXxlbnwxfHx8fDE3NzkyODIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 18,
      rating: 4.9
    },
    {
      id: '4',
      name: 'Decorative Cushion Cover',
      price: 29.99,
      description: 'Beautiful crochet cushion cover to add a handmade touch to your home decor.',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1761206887095-e57f9ae4a06f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwY3VzaGlvbiUyMHBpbGxvd3xlbnwxfHx8fDE3NzkyODIxNzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 30,
      rating: 4.7
    },
    {
      id: '5',
      name: 'Warm Winter Scarf',
      price: 32.99,
      description: 'Luxurious handmade scarf that keeps you cozy and stylish throughout winter.',
      category: 'Scarves',
      image: 'https://images.unsplash.com/photo-1457545195570-67f207084966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwc2NhcmYlMjB3aW50ZXJ8ZW58MXx8fHwxNzc5MjgyMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 20,
      rating: 4.8
    },
    {
      id: '6',
      name: 'Boho Wall Hanging',
      price: 45.99,
      description: 'Handcrafted crochet wall hanging for a bohemian touch to your space.',
      category: 'Home Decor',
      image: 'https://images.unsplash.com/photo-1776992026037-98e0eff3a9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9jaGV0JTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3OTI4MjE3NHww&ixlib=rb-4.1.0&q=80&w=1080',
      stock: 12,
      rating: 5.0
    }
  ];

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        alert(error.message);
        return;
      }
      
      if (data.user) {
        // Get user role from your users table
        const { data: userData } = await supabase
          .from('users')
          .select('role')
          .eq('user_id', data.user.id)
          .single();
        
        const isUserAdmin = userData?.role === 'admin';
        setIsAdmin(isUserAdmin);
        setIsLoggedIn(true);
        
        // Navigate to appropriate page
        if (isUserAdmin) {
          setCurrentPage('admin-dashboard');
        } else {
          setCurrentPage('account');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setIsAdmin(false);
      setCurrentPage('home');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const renderPage = () => {
    // Show loading spinner while fetching products
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A8B8A8] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onNavigate={navigateTo}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
          />
        );
      case 'shop':
        return (
          <ShopPage
            products={products}
            onNavigate={navigateTo}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage
            product={selectedProduct}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
          />
        ) : (
          <HomePage
            products={products}
            onNavigate={navigateTo}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
          />
        );
      case 'cart':
        return (
          <CartPage
            cart={cart}
            onNavigate={navigateTo}
            onUpdateQuantity={updateCartQuantity}
            onRemove={removeFromCart}
          />
        );
      case 'checkout':
        return <CheckoutPage cart={cart} onNavigate={navigateTo} />;
      case 'login':
        return <LoginPage onNavigate={navigateTo} onLogin={handleLogin} />;
      case 'account':
        return <AccountPage onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'admin-dashboard':
        return <AdminDashboard products={products} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'admin-products':
        return <AdminProducts products={products} onNavigate={navigateTo} />;
      case 'admin-orders':
        return <AdminOrders onNavigate={navigateTo} />;
      case 'admin-settings':
        return <AdminSettings onNavigate={navigateTo} />;
      default:
        return (
          <HomePage
            products={products}
            onNavigate={navigateTo}
            onViewProduct={viewProduct}
            onAddToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
    </div>
  );
}