import { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Search,
  Eye,
  X
} from 'lucide-react';
import { Page } from '../../main';

type AdminOrdersProps = {
  onNavigate: (page: Page) => void;
};

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

type Order = {
  id: string;
  customer: string;
  email: string;
  date: string;
  amount: number;
  status: OrderStatus;
  items: { name: string; quantity: number; price: number }[];
  address: string;
};

export function AdminOrders({ onNavigate }: AdminOrdersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const mockOrders: Order[] = [
    {
      id: '#12345',
      customer: 'Maria Santos',
      email: 'maria@example.com',
      date: '2026-05-20',
      amount: 124.98,
      status: 'Pending',
      items: [
        { name: 'Cozy Crochet Blanket', quantity: 1, price: 89.99 },
        { name: 'Winter Beanie Hat', quantity: 1, price: 24.99 }
      ],
      address: '123 Main St, Makati City, Metro Manila 1200'
    },
    {
      id: '#12344',
      customer: 'John Reyes',
      email: 'john@example.com',
      date: '2026-05-20',
      amount: 89.99,
      status: 'Shipped',
      items: [{ name: 'Cozy Crochet Blanket', quantity: 1, price: 89.99 }],
      address: '456 Oak Ave, Quezon City, Metro Manila 1100'
    },
    {
      id: '#12343',
      customer: 'Ana Cruz',
      email: 'ana@example.com',
      date: '2026-05-19',
      amount: 54.98,
      status: 'Delivered',
      items: [
        { name: 'Winter Beanie Hat', quantity: 1, price: 24.99 },
        { name: 'Decorative Cushion Cover', quantity: 1, price: 29.99 }
      ],
      address: '789 Pine Rd, Pasig City, Metro Manila 1600'
    },
    {
      id: '#12342',
      customer: 'Pedro Garcia',
      email: 'pedro@example.com',
      date: '2026-05-19',
      amount: 199.99,
      status: 'Shipped',
      items: [
        { name: 'Cozy Crochet Blanket', quantity: 2, price: 89.99 },
        { name: 'Warm Winter Scarf', quantity: 1, price: 32.99 }
      ],
      address: '321 Elm St, Mandaluyong City, Metro Manila 1550'
    },
    {
      id: '#12341',
      customer: 'Lisa Tan',
      email: 'lisa@example.com',
      date: '2026-05-18',
      amount: 45.99,
      status: 'Delivered',
      items: [{ name: 'Boho Wall Hanging', quantity: 1, price: 45.99 }],
      address: '654 Maple Dr, Taguig City, Metro Manila 1630'
    }
  ];

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    alert(`Order ${orderId} status updated to ${newStatus}`);
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
              className="w-full flex items-center px-4 py-3 rounded bg-[#A8B8A8] text-white transition-colors"
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
          <h2 className="text-2xl text-black">Orders</h2>
        </header>

        <main className="p-8">
          {/* Search and Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID or customer..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent bg-white"
              >
                <option value="All">All Orders</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-black">{order.id}</td>
                      <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                      <td className="py-3 px-4 text-gray-600">{order.date}</td>
                      <td className="py-3 px-4 text-gray-600">${order.amount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value as OrderStatus)
                          }
                          className={`px-3 py-1 rounded text-sm border-0 cursor-pointer ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'Shipped'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          className="flex items-center text-[#A8B8A8] hover:text-[#98a898] transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Order Detail Modal */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-2xl text-black">Order Details - {selectedOrder.id}</h3>
              <button
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedOrder(null);
                }}
                className="text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-lg text-black mb-3">Customer Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-gray-600">
                    <span className="text-black">Name:</span> {selectedOrder.customer}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-black">Email:</span> {selectedOrder.email}
                  </p>
                  <p className="text-gray-600">
                    <span className="text-black">Address:</span> {selectedOrder.address}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="text-lg text-black mb-3">Order Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-50 rounded-lg p-4"
                    >
                      <div>
                        <p className="text-black">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="text-black">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h4 className="text-lg text-black mb-3">Order Summary</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-xl text-black border-t border-gray-300 pt-2 mt-2">
                    <span>Total:</span>
                    <span>${selectedOrder.amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Change */}
              <div>
                <h4 className="text-lg text-black mb-3">Update Status</h4>
                <select
                  value={selectedOrder.status}
                  onChange={(e) =>
                    handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => alert('Marked as shipped!')}
                  className="flex-1 bg-[#A8B8A8] text-white px-6 py-3 rounded hover:bg-[#98a898] transition-colors"
                >
                  Mark as Shipped
                </button>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this order?')) {
                      alert('Order deleted');
                      setShowDetailModal(false);
                    }
                  }}
                  className="px-6 py-3 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
                >
                  Delete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
