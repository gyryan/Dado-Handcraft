import { Globe, Mail, MessageCircle } from 'lucide-react';
import { Page } from '../../main';

type FooterProps = {
  onNavigate: (page: Page) => void;
};

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-black text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg mb-4">Da Do Handcrafts PH</h3>
            <p className="text-gray-400 text-sm">
              Handmade crochet products crafted with love and care. Each piece is unique and made to order.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Shipping Info
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Returns
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </button>
              </li>
              <li>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Care Instructions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              contact@dadohandcrafts.ph
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Da Do Handcrafts PH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
