
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { MapPin, SlidersHorizontal, ChevronLeft, ChevronRight, Bookmark, Star } from 'lucide-react';
import { Destination } from '../types';

interface ExploreMoreProps {
  onBook: (destination: Destination) => void;
}

const ExploreMore: React.FC<ExploreMoreProps> = ({ onBook }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState('Popular destination');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
  
  const filters = [
    'Popular destination', 'Islands', 'Surfing', 'Nation parks', 'Lake', 'Beach', 'Luxury Safaris'
  ];

  const allDestinations: Destination[] = [
    { id: 'e1', name: 'Amalfi Coast', location: 'Amalfi, Italy', price: 1248, rating: 4.9, category: 'Popular destination', image: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e2', name: 'Taj Mahal', location: 'Agra, India', price: 940, rating: 4.9, category: 'Popular destination', image: 'https://images.unsplash.com/photo-1564507592333-c60657eea023?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e3', name: 'Tanah Gajah', location: 'Bali, Indonesia', price: 1148, rating: 4.9, category: 'Popular destination', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e4', name: 'Osaka Castle', location: 'Osaka, Japan', price: 1556, rating: 4.9, category: 'Popular destination', image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e5', name: 'Maasai Mara', location: 'Narok, Kenya', price: 2450, rating: 4.9, category: 'Luxury Safaris', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e6', name: 'Gili Meno', location: 'Lombok, Indonesia', price: 864, rating: 4.9, category: 'Islands', image: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e7', name: 'Pipeline Oahu', location: 'Hawaii, USA', price: 2120, rating: 4.8, category: 'Surfing', image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e8', name: 'Zion Canyon', location: 'Utah, USA', price: 1172, rating: 4.9, category: 'Nation parks', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e9', name: 'Lake Louise', location: 'Alberta, Canada', price: 1890, rating: 4.9, category: 'Lake', image: 'https://images.unsplash.com/photo-1503614472666-7e1451f0881b?auto=format&fit=crop&q=80&w=1000&h=800' } as any,
    { id: 'e10', name: 'Whitehaven', location: 'Whitsunday, Australia', price: 1420, rating: 5.0, category: 'Beach', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000&h=800' } as any
  ];

  // Helper to normalize the price display in the modal
  const destinationsWithPriceString = allDestinations.map(d => ({
    ...d,
    price: typeof d.price === 'number' ? `$${d.price.toLocaleString()}` : d.price
  }));

  const filteredDestinations = useMemo(() => {
    return destinationsWithPriceString.filter((d: any) => d.category === activeFilter);
  }, [activeFilter, destinationsWithPriceString]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 max-w-7xl mx-auto px-4 bg-gray-50/50 rounded-[80px] overflow-hidden border border-gray-100 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 px-4">
        <div>
          <span className="text-cyan-primary font-bold uppercase tracking-[0.2em] text-xs">Discover More</span>
          <h2 className="text-5xl font-bold text-gray-900 mt-2 mb-4 tracking-tight">Explore the globe</h2>
          <p className="text-gray-500 text-lg">Uncover unique experiences tailored to your style.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => scroll('left')} className="w-14 h-14 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-cyan-primary hover:border-cyan-primary transition-all shadow-sm hover:shadow-md">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => scroll('right')} className="w-14 h-14 rounded-2xl border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:text-cyan-primary hover:border-cyan-primary transition-all shadow-sm hover:shadow-md">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 px-4">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-3.5 rounded-2xl text-sm font-bold transition-all tracking-wide ${
                activeFilter === filter
                ? 'bg-cyan-primary text-white shadow-xl shadow-cyan-200 translate-y-[-2px]'
                : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-100 hover:border-gray-300'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-3 px-8 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all hover:shadow-sm">
          <SlidersHorizontal className="w-4 h-4 text-cyan-primary" />
          Advanced Filters
        </button>
      </div>

      <div 
        ref={scrollContainerRef}
        className="flex gap-10 overflow-x-auto pb-12 snap-x snap-mandatory scroll-smooth no-scrollbar px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{ __html: `.no-scrollbar::-webkit-scrollbar { display: none; }`}} />
        
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((dest: any, i) => (
            <div 
              key={i} 
              className="min-w-[320px] md:min-w-[440px] bg-white p-5 rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 group snap-start cursor-pointer border border-transparent hover:border-gray-100"
              onClick={() => onBook(dest)}
            >
              <div className="relative aspect-[4/3] rounded-[36px] overflow-hidden mb-8">
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[11px] font-black text-gray-900 flex items-center gap-2 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {dest.rating} (1.2k Reviews)
                </div>
                <button className="absolute top-6 right-6 p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-cyan-primary transition-all border border-white/20">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <div className="px-3 pb-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{dest.name}</h3>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-cyan-primary leading-none">{dest.price}</span>
                    <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">/ PERSON</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm font-medium">
                  <MapPin className="w-4 h-4 mr-2 text-cyan-primary" />
                  {dest.location}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full py-32 text-center bg-white rounded-[48px] border-2 border-dashed border-gray-200 mx-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-900 font-bold text-xl mb-2">Curating Hidden Gems...</p>
            <p className="text-gray-400 font-medium">Our scouts are currently verifying top spots in {activeFilter}.</p>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <button className="group relative bg-gray-900 text-white px-12 py-5 rounded-3xl font-black text-sm tracking-widest uppercase hover:bg-black transition-all shadow-xl shadow-gray-200 overflow-hidden">
          <span className="relative z-10">Discover Full Catalogue</span>
          <div className="absolute inset-0 bg-cyan-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default ExploreMore;
