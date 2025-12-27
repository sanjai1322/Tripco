
import React, { useState, useEffect, useRef } from 'react';

const Memories: React.FC = () => {
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

  const features = [
    {
      id: '01',
      title: 'Find trips that fit your freedom',
      description: 'Traveling offers freedom and flexibility, solitude and spontaneity, and privacy and purpose.'
    },
    {
      id: '02',
      title: 'Get back to nature by travel',
      description: 'The world is a playground and you can finally explore Mother Nature\'s inimitable canvas.'
    },
    {
      id: '03',
      title: 'Reignite those travel tastebuds',
      description: 'There are infinite reasons to love travel, one of them being the food, glorious food.'
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 max-w-7xl mx-auto px-4 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Travel to make sweet memories</h2>
        <p className="text-gray-500">Find trips that fit a flexible lifestyle</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <div className="flex-1 space-y-12">
          {features.map((feature) => (
            <div key={feature.id} className="flex gap-6">
              <span className="shrink-0 w-10 h-10 flex items-center justify-center bg-cyan-soft text-cyan-primary font-bold rounded-xl">
                {feature.id}
              </span>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-sm">{feature.description}</p>
              </div>
            </div>
          ))}
          <button className="bg-cyan-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-200">
            Start your explore
          </button>
        </div>

        <div className="flex-1 relative">
          <div className="rounded-[40px] overflow-hidden aspect-[4/5] shadow-2xl relative">
            <img 
              src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&q=80&w=1000&h=1200" 
              alt="Majestic Mountain Falls" 
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Avatars (Floating badges) */}
            <div className="absolute top-[10%] left-[5%] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
              <img src="https://picsum.photos/40/40?random=1" className="w-10 h-10 rounded-full border-2 border-white" alt="user" />
              <div>
                <p className="text-xs font-bold text-gray-900">Karmelia Diana</p>
                <p className="text-[10px] text-yellow-500">★ 4.9</p>
              </div>
            </div>

            <div className="absolute top-[40%] right-[5%] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3 animate-pulse">
              <img src="https://picsum.photos/40/40?random=2" className="w-10 h-10 rounded-full border-2 border-white" alt="user" />
              <div>
                <p className="text-xs font-bold text-gray-900">Haikal Adam</p>
                <p className="text-[10px] text-yellow-500">★ 4.9</p>
              </div>
            </div>

            <div className="absolute bottom-[20%] left-[10%] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3">
              <img src="https://picsum.photos/40/40?random=3" className="w-10 h-10 rounded-full border-2 border-white" alt="user" />
              <div>
                <p className="text-xs font-bold text-gray-900">Joe Zefrano</p>
                <p className="text-[10px] text-yellow-500">★ 4.9</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Memories;
