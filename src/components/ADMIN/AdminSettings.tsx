import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { Page } from '../../main';

type AdminSettingsProps = {
  onNavigate: (page: Page) => void;
};

export function AdminSettings({ onNavigate }: AdminSettingsProps) {
  const [storeInfo, setStoreInfo] = useState({
    name: 'Da Do Handcrafts PH',
    description: 'Handmade crochet products crafted with love and care',
    email: 'contact@dadohandcrafts.ph',
    phone: '+63 917 123 4567',
    address: '123 Main Street, Makati City, Metro Manila 1200'
  });

  const [shippingSettings, setShippingSettings] = useState({
    flatRate: '10.00',
    freeShippingThreshold: '75.00',
    deliveryTime: '5-7'
  });

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Store information saved successfully!');
  };

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Shipping settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-black text-white z-50">
        <div className="p-6">
          <h1 className="text-xl tracking-tight mb-8">
            Da Do Handcrafts
          </h1>
          
          <nav className="space-y-2">
            <button
              onClick={() => onNavigate('admin-dashboard')}
              className="w-full flex items-center px-4 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('admin-products')}
              className="w-full flex items-center px-4 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              <Package className="w-5 h-5 mr-3" />
              Products
            </button>
            <button
              onClick={() => onNavigate('admin-orders')}
              className="w-full flex items-center px-4 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-3" />
              Orders
            </button>
            <button className="w-full flex items-center px-4 py-3 rounded hover:bg-gray-800 transition-colors">
              <Users className="w-5 h-5 mr-3" />
              Customers
            </button>
            <button
              onClick={() => onNavigate('admin-settings')}
              className="w-full flex items-center px-4 py-3 rounded bg-[#A8B8A8] text-white transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center px-4 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <h2 className="text-2xl text-black">Settings</h2>
        </header>

        <main className="p-8 max-w-4xl">
          {/* Store Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl text-black mb-6">Store Information</h3>
            <form onSubmit={handleSaveStore} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={storeInfo.name}
                  onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Store Description</label>
                <textarea
                  value={storeInfo.description}
                  onChange={(e) => setStoreInfo({ ...storeInfo, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Store Email</label>
                <input
                  type="email"
                  value={storeInfo.email}
                  onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={storeInfo.phone}
                  onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <textarea
                  value={storeInfo.address}
                  onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
              >
                Save Store Information
              </button>
            </form>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl text-black mb-6">Shipping Settings</h3>
            <form onSubmit={handleSaveShipping} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Flat Rate Shipping ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingSettings.flatRate}
                  onChange={(e) =>
                    setShippingSettings({ ...shippingSettings, flatRate: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Free Shipping Threshold ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={shippingSettings.freeShippingThreshold}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      freeShippingThreshold: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">
                  Estimated Delivery Time (business days)
                </label>
                <select
                  value={shippingSettings.deliveryTime}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      deliveryTime: e.target.value
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent bg-white"
                >
                  <option value="3-5">3-5 business days</option>
                  <option value="5-7">5-7 business days</option>
                  <option value="7-10">7-10 business days</option>
                  <option value="10-14">10-14 business days</option>
                </select>
              </div>
              
              <button
                type="submit"
                className="bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
              >
                Save Shipping Settings
              </button>
            </form>
          </div>

          {/* Payment Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl text-black mb-6">Payment Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Stripe API Key</label>
                <input
                  type="password"
                  value="sk_test_••••••••••••••••••••••••"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-50"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Your API key is securely stored. Contact support to update.
                </p>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">PayPal Email</label>
                <input
                  type="email"
                  placeholder="payments@dadohandcrafts.ph"
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="enablePaypal"
                  defaultChecked
                  className="w-4 h-4 mt-1 text-[#A8B8A8] border-gray-300 rounded focus:ring-[#A8B8A8]"
                />
                <label htmlFor="enablePaypal" className="ml-2 text-gray-700">
                  Enable PayPal payments
                </label>
              </div>
              
              <button
                type="button"
                className="bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
              >
                Save Payment Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
