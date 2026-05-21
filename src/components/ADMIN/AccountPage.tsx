import { useState } from 'react';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';
import { Header } from '../USER/Header';
import { Footer } from '../USER/Footer';
import { Page } from '../../main';

type AccountPageProps = {
  onNavigate: (page: Page) => void;
  onLogout: () => void;
};

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses';

export function AccountPage({ onNavigate, onLogout }: AccountPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  const mockOrders = [
    {
      id: '#12345',
      date: '2026-05-15',
      status: 'Delivered',
      total: 124.98,
      items: 2
    },
    {
      id: '#12344',
      date: '2026-05-10',
      status: 'Shipped',
      total: 89.99,
      items: 1
    },
    {
      id: '#12343',
      date: '2026-05-05',
      status: 'Pending',
      total: 54.98,
      items: 2
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl sm:text-4xl text-black mb-4 sm:mb-0">
            Hello, Maria
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-4 py-3 rounded transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-[#A8B8A8] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="w-5 h-5 mr-3" />
                Profile Info
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center px-4 py-3 rounded transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[#A8B8A8] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                Order History
              </button>
              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center px-4 py-3 rounded transition-colors ${
                  activeTab === 'wishlist'
                    ? 'bg-[#A8B8A8] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Heart className="w-5 h-5 mr-3" />
                Wishlist
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center px-4 py-3 rounded transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-[#A8B8A8] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <MapPin className="w-5 h-5 mr-3" />
                Saved Addresses
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Info */}
            {activeTab === 'profile' && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl text-black mb-6">Profile Information</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Maria"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Santos"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="maria@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+63 917 123 4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* Order History */}
            {activeTab === 'orders' && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl text-black mb-6">Order History</h2>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row justify-between mb-3">
                        <div>
                          <h3 className="text-lg text-black mb-1">Order {order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <span
                            className={`inline-block px-3 py-1 rounded text-sm ${
                              order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'Shipped'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                          {order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                        </p>
                        <button className="text-[#A8B8A8] hover:text-[#98a898] transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl text-black mb-6">Wishlist</h2>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Your wishlist is empty</p>
                  <button
                    onClick={() => onNavigate('shop')}
                    className="mt-4 text-[#A8B8A8] hover:text-[#98a898] transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl text-black">Saved Addresses</h2>
                  <button className="bg-[#A8B8A8] text-white px-4 py-2 rounded hover:bg-[#98a898] transition-colors">
                    Add New Address
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg text-black">Home</h3>
                      <span className="bg-[#A8B8A8] text-white px-2 py-1 rounded text-xs">
                        Default
                      </span>
                    </div>
                    <p className="text-gray-600">
                      123 Main Street<br />
                      Makati City, Metro Manila 1200<br />
                      Philippines<br />
                      +63 917 123 4567
                    </p>
                    <div className="mt-3 flex gap-3">
                      <button className="text-[#A8B8A8] hover:text-[#98a898] text-sm">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700 text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
