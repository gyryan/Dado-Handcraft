import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Page, CartItem } from '../../main';

type HeaderProps = {
  onNavigate: (page: Page) => void;
  cart?: CartItem[];
  isAdmin?: boolean;
};

export function Header({ onNavigate, cart = [], isAdmin = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => onNavigate(isAdmin ? 'admin-dashboard' : 'home')}
          >
            <h1 className="text-xl sm:text-2xl text-black tracking-tight">
              Da Do Handcrafts PH
            </h1>
          </div>

          {/* Desktop Navigation */}
          {!isAdmin && (
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className="text-gray-700 hover:text-black transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('shop')}
                className="text-gray-700 hover:text-black transition-colors"
              >
                Shop
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="text-gray-700 hover:text-black transition-colors"
              >
                About
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="text-gray-700 hover:text-black transition-colors"
              >
                Contact
              </button>
            </nav>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {!isAdmin && (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-700 hover:text-black transition-colors"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('cart')}
                  className="relative text-gray-700 hover:text-black transition-colors"
                  aria-label="Shopping Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#A8B8A8] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </>
            )}
            
            {/* Mobile Menu Button */}
            {!isAdmin && (
              <button
                className="md:hidden text-gray-700 hover:text-black"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && !isAdmin && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-black transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('shop');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-black transition-colors text-left"
              >
                Shop
              </button>
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-black transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => {
                  onNavigate('login');
                  setMobileMenuOpen(false);
                }}
                className="text-gray-700 hover:text-black transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
