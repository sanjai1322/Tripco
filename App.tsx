
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PopularPlaces from './components/PopularPlaces';
import Memories from './components/Memories';
import ExploreMore from './components/ExploreMore';
import Adventure from './components/Adventure';
import PromoVideo from './components/PromoVideo';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import { Destination } from './types';

const App: React.FC = () => {
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 3000);
  };

  const handleOpenBooking = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    setIsBookingModalOpen(false);
    showToast(`Booking confirmed for ${selectedDestination?.name}! Check your email.`);
    setSelectedDestination(null);
  };

  const handleHeroSearch = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
      showToast('Filtering the best matches for you...');
    }
  };

  return (
    <div className="min-h-screen bg-white relative selection:bg-cyan-primary selection:text-white font-['Plus_Jakarta_Sans']">
      <Navbar />
      <main>
        <div id="home">
          <Hero onSearch={handleHeroSearch} />
        </div>
        <div id="popular">
          <PopularPlaces onBook={handleOpenBooking} />
        </div>
        <Memories />
        <div id="explore">
          <ExploreMore onBook={handleOpenBooking} />
        </div>
        <div id="activity">
          <Adventure />
        </div>
        <PromoVideo onBook={() => showToast('Redirecting to ticket booking...')} />
      </main>
      <Footer onSubscribe={() => showToast('Thanks for subscribing!')} />

      <BookingModal 
        destination={selectedDestination}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onConfirm={handleConfirmBooking}
      />

      {/* Global Toast */}
      {toast.visible && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 border border-white/10">
          <p className="font-semibold text-sm flex items-center gap-3">
            <span className="w-2 h-2 bg-cyan-primary rounded-full animate-pulse" />
            {toast.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
