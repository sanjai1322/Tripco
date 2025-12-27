
import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Send } from 'lucide-react';

interface FooterProps {
  onSubscribe: () => void;
}

const Footer: React.FC<FooterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSubscribe();
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-cyan-primary mb-6">Tripco</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              30 Great Peter St, Westminster, London SW1P 2BU, United Kingdom
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-primary hover:bg-cyan-soft transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-primary hover:bg-cyan-soft transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-cyan-primary hover:bg-cyan-soft transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">About</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">About us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Plans</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Why Tripco</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Partner with us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Account</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Support center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Feedback</a></li>
              <li><a href="#" className="text-gray-400 hover:text-cyan-primary transition-colors text-sm">Contact us</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-xs">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">Subscribe our newsletter and get exciting offers</p>
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address" 
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-4 pr-12 text-sm focus:ring-2 focus:ring-cyan-primary"
                required
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-primary text-white rounded-xl flex items-center justify-center hover:bg-cyan-700 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs">© 2023 Tripco. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-gray-400 hover:text-gray-600 text-xs">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-xs">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
