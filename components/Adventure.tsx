
import React, { useState, useEffect, useRef } from 'react';
import { Plane } from 'lucide-react';

const Adventure: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const adventures = [
    { name: 'PARIS', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600&h=600' },
    { name: 'NEW YORK', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600&h=600' },
    { name: 'SEOUL', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=600&h=600' },
    { name: 'BALI', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=600&h=600' }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 max-w-7xl mx-auto px-4 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Let's go on an adventure</h2>
        <p className="text-gray-500">Find and book a great experience.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {adventures.map((adv, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="relative group mb-6">
              <div className="w-48 h-48 md:w-60 md:h-60 rounded-full overflow-hidden border-8 border-gray-50 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img src={adv.image} alt={adv.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-2 -left-2 w-14 h-14 bg-cyan-primary text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Plane className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-lg font-black tracking-widest text-gray-300 uppercase">{adv.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Adventure;
