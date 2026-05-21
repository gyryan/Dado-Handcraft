import { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Page } from '../../main';

type LoginPageProps = {
  onNavigate: (page: Page) => void;
  onLogin: (email: string, password: string) => void;
};

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }
    alert('Account created successfully!');
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={onNavigate} />

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {!isSignUp ? (
          /* Login Form */
          <div>
            <h1 className="text-3xl text-black mb-2 text-center">Welcome Back</h1>
            <p className="text-gray-600 mb-8 text-center">
              Sign in to your account
            </p>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 text-[#A8B8A8] border-gray-300 rounded focus:ring-[#A8B8A8]"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-[#A8B8A8] hover:text-[#98a898]"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-[#A8B8A8] hover:text-[#98a898]"
                >
                  Create Account
                </button>
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-4">
                For testing: Use email with "admin" to access admin panel
              </p>
            </div>
          </div>
        ) : (
          /* Sign Up Form */
          <div>
            <h1 className="text-3xl text-black mb-2 text-center">Create Account</h1>
            <p className="text-gray-600 mb-8 text-center">
              Join our handcraft community
            </p>

            <form onSubmit={handleSignUpSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#A8B8A8] focus:border-transparent"
                  required
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 mt-1 text-[#A8B8A8] border-gray-300 rounded focus:ring-[#A8B8A8]"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                  I accept the terms and conditions and privacy policy
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#A8B8A8] text-white px-8 py-3 rounded hover:bg-[#98a898] transition-colors"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-[#A8B8A8] hover:text-[#98a898]"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
