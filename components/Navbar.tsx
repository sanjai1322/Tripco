
import React, { useState, useEffect } from 'react';
import { X, User, Menu, ChevronRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['home', 'popular', 'explore', 'activity'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-2xl py-4 shadow-sm border-b border-gray-100' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer group" onClick={() => scrollTo('home')}>
              <div className="w-10 h-10 bg-cyan-primary rounded-xl flex items-center justify-center text-white font-black text-xl mr-3 group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-200">
                T
              </div>
              <span className={`text-2xl font-black tracking-tighter transition-colors ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>Tripco</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-10">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Popular', id: 'popular' },
                { label: 'Explore', id: 'explore' },
                { label: 'Activities', id: 'activity' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative font-bold text-sm tracking-wide transition-all group ${
                    activeSection === item.id 
                    ? 'text-cyan-primary' 
                    : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-cyan-primary transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="hidden sm:block text-gray-500 font-bold text-sm hover:text-cyan-primary transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative bg-cyan-primary text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-100 flex items-center gap-2"
              >
                Sign Up
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-[48px] w-full max-w-lg overflow-hidden relative shadow-2xl animate-in zoom-in duration-300 flex flex-col md:flex-row">
            <div className="p-10 md:p-14 w-full">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute right-8 top-8 w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-10">
                <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tight">Access Luxury</h2>
                <p className="text-gray-400 font-medium">Your personalized travel concierge awaits.</p>
              </div>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">E-Mail Identity</label>
                  <input type="email" placeholder="voyager@global.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 focus:ring-2 focus:ring-cyan-primary focus:bg-white outline-none transition-all font-medium" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Security Key</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 focus:ring-2 focus:ring-cyan-primary focus:bg-white outline-none transition-all font-medium" required />
                </div>
                <button className="w-full bg-cyan-primary text-white py-5 rounded-2xl font-black text-sm tracking-widest uppercase hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-100 mt-6 flex items-center justify-center gap-3">
                  <User className="w-4 h-4" />
                  Initialize Profile
                </button>
              </form>
              
              <p className="mt-8 text-center text-gray-400 text-xs font-medium">
                New to the elite network? <button className="text-cyan-primary font-black hover:underline">Apply for Membership</button>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
