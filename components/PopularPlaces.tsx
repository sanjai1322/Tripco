
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Heart } from 'lucide-react';
import { Destination } from '../types';

interface PopularPlacesProps {
  onBook: (destination: Destination) => void;
}

const PopularPlaces: React.FC<PopularPlacesProps> = ({ onBook }) => {
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

  const places: Destination[] = [
    {
      id: 'p1',
      name: 'Santorini Caldera',
      location: 'Oia, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: 'FLASH SALE',
      rating: 4.9,
      price: 890
    },
    {
      id: 'p2',
      name: 'Lauterbrunnen',
      location: 'Bern, Switzerland',
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: '25% OFF',
      rating: 4.8,
      price: 1250
    },
    {
      id: 'p3',
      name: 'Arashiyama Bamboo',
      location: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1524413840049-1d3c0595a8b7?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: 'EARLY BIRD',
      rating: 4.9,
      price: 940
    },
    {
      id: 'p4',
      name: 'Machu Picchu',
      location: 'Cusco, Peru',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: 'LUXURY PACK',
      rating: 4.7,
      price: 1550
    },
    {
      id: 'p5',
      name: 'Bora Bora Resort',
      location: 'French Polynesia',
      image: 'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: '15% OFF',
      rating: 5.0,
      price: 2800
    },
    {
      id: 'p6',
      name: 'Banff National Park',
      location: 'Alberta, Canada',
      image: 'https://images.unsplash.com/photo-1439337153520-7082a56a81f4?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: 'WINTER SPEC',
      rating: 4.9,
      price: 1100
    },
    {
      id: 'p7',
      name: 'Hallstatt Village',
      location: 'Salzkammergut, Austria',
      image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: 'NEW YEAR',
      rating: 4.8,
      price: 980
    },
    {
      id: 'p8',
      name: 'Twelve Apostles',
      location: 'Victoria, Australia',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800&h=1000',
      discount: 'ADVENTURE',
      rating: 4.7,
      price: 1320
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 max-w-7xl mx-auto px-4 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="space-y-4">
          <span className="text-cyan-primary font-bold uppercase tracking-[0.2em] text-xs">Curated Collections</span>
          <h2 className="text-5xl font-bold text-gray-900 tracking-tight">Popular Places</h2>
          <p className="text-gray-500 max-w-md text-lg">Hand-picked destinations for your next unforgettable journey.</p>
        </div>
        <div className="text-right hidden md:block max-w-xs">
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Our global network ensures you find the cleanest, most breathtaking locations with exclusive deals.
          </p>
          <div className="h-1 w-24 bg-cyan-primary ml-auto rounded-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {places.map((place, index) => (
          <div 
            key={place.id} 
            className="group cursor-pointer"
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => onBook(place)}
          >
            <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden mb-8 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
              <img 
                src={place.image} 
                alt={place.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md text-cyan-primary text-[10px] font-black px-4 py-2 rounded-2xl shadow-sm tracking-widest uppercase">
                  {place.discount}
                </div>
              </div>
              <button className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all shadow-lg">
                <Heart className="w-5 h-5 transition-transform group-active:scale-90" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            
            <div className="px-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-cyan-primary transition-colors tracking-tight">
                {place.name}
              </h3>
              <div className="flex items-center text-gray-400 text-sm font-medium">
                <MapPin className="w-4 h-4 mr-2 text-cyan-primary" />
                {place.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPlaces;
