import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Product, Page } from '../../main';

type AdminDashboardProps = {
  products: Product[];
  onNavigate: (page: Page) => void;
  onLogout: () => void;
};

export function AdminDashboard({ products, onNavigate, onLogout }: AdminDashboardProps) {
  const mockStats = {
    revenue: 12847.50,
    orders: 156,
    totalProducts: products.length,
    customers: 89
  };

  const recentOrders = [
    {
      id: '#12345',
      customer: 'Maria Santos',
      date: '2026-05-20',
      amount: 124.98,
      status: 'Pending' as const
    },
    {
      id: '#12344',
      customer: 'John Reyes',
      date: '2026-05-20',
      amount: 89.99,
      status: 'Shipped' as const
    },
    {
      id: '#12343',
      customer: 'Ana Cruz',
      date: '2026-05-19',
      amount: 54.98,
      status: 'Delivered' as const
    },
    {
      id: '#12342',
      customer: 'Pedro Garcia',
      date: '2026-05-19',
      amount: 199.99,
      status: 'Shipped' as const
    }
  ];

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
              className="w-full flex items-center px-4 py-3 rounded bg-[#A8B8A8] text-white transition-colors"
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
              className="w-full flex items-center px-4 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              <Settings className="w-5 h-5 mr-3" />
              Settings
            </button>
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={onLogout}
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
          <h2 className="text-2xl text-black">Dashboard</h2>
        </header>

        <main className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Total Revenue</h3>
                <DollarSign className="w-8 h-8 text-[#A8B8A8]" />
              </div>
              <p className="text-3xl text-black mb-2">
                ${mockStats.revenue.toFixed(2)}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12% from last month</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Total Orders</h3>
                <ShoppingBag className="w-8 h-8 text-[#A8B8A8]" />
              </div>
              <p className="text-3xl text-black mb-2">
                {mockStats.orders}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+8% from last month</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Total Products</h3>
                <Package className="w-8 h-8 text-[#A8B8A8]" />
              </div>
              <p className="text-3xl text-black mb-2">
                {mockStats.totalProducts}
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <span>Active listings</span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-600">Total Customers</h3>
                <Users className="w-8 h-8 text-[#A8B8A8]" />
              </div>
              <p className="text-3xl text-black mb-2">
                {mockStats.customers}
              </p>
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+15% from last month</span>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-black">Recent Orders</h3>
              <button
                onClick={() => onNavigate('admin-orders')}
                className="text-[#A8B8A8] hover:text-[#98a898] transition-colors"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-black">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                      <td className="py-3 px-4 text-gray-600">{order.date}</td>
                      <td className="py-3 px-4 text-gray-600">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
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
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-[#A8B8A8] hover:text-[#98a898] transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-black">Recent Products</h3>
              <button
                onClick={() => onNavigate('admin-products')}
                className="text-[#A8B8A8] hover:text-[#98a898] transition-colors"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-50 rounded mb-3 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-black mb-1">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">Stock: {product.stock}</p>
                  <p className="text-lg text-black">${product.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
