import { useState } from 'react';
import { Check } from 'lucide-react';
import { Header } from '../USER/Header';
import { Footer } from '../USER/Footer';
import { CartItem, Page } from '../../main';

type CheckoutPageProps = {
  cart: CartItem[];
  onNavigate: (page: Page) => void;
};

type CheckoutStep = 1 | 2 | 3;

export function CheckoutPage({ cart, onNavigate }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    sameAsShipping: true
  });

  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 10;
  const total = subtotal + shipping;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePlaceOrder = () => {
    alert('Order placed successfully! Thank you for your purchase.');
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} cart={cart} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl text-black mb-8">
          Checkout
        </h1>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { step: 1, label: 'Shipping' },
              { step: 2, label: 'Payment' },
              { step: 3, label: 'Review' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= item.step
                        ? 'bg-[#A8B8A8] text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > item.step ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      item.step
                    )}
                  </div>
                  <span className="text-sm mt-2 text-gray-600">{item.label}</span>
                </div>
                {index < 2 && (
                  <div
                    className={`h-0.5 flex-1 ${
                      currentStep > item.step ? 'bg-[#A8B8A8]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl text-black mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Address *</label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) =>
                          setShippingInfo({ ...shippingInfo, address: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, city: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">State *</label>
                        <input
                          type="text"
                          value={shippingInfo.state}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, state: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          value={shippingInfo.zip}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, zip: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">Phone *</label>
                        <input
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-6 bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-2xl text-black mb-6">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Card Number *</label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })
                        }
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          value={paymentInfo.expiry}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, expiry: e.target.value })
                          }
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-2">CVV *</label>
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                          }
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sameAsShipping"
                        checked={paymentInfo.sameAsShipping}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            sameAsShipping: e.target.checked
                          })
                        }
                        className="w-4 h-4 text-[#A8B8A8] border-gray-300 rounded focus:ring-[#A8B8A8]"
                      />
                      <label htmlFor="sameAsShipping" className="ml-2 text-gray-700">
                        Billing address same as shipping
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-white text-black px-8 py-3 rounded border border-black hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Shipping Address */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl text-black mb-4">Shipping Address</h2>
                  <p className="text-gray-600">
                    {shippingInfo.name}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                    {shippingInfo.phone}
                  </p>
                </div>

                {/* Order Items */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl text-black mb-4">Order Items</h2>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex justify-between text-gray-600">
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-white text-black px-8 py-3 rounded border border-black hover:bg-gray-50 transition-colors"
                  >
                    Back to Payment
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl text-black mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl text-black">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Items Summary */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm text-gray-600 mb-3">Items ({cart.length})</h3>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.product.id} className="text-sm text-gray-600">
                      {item.product.name} × {item.quantity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
