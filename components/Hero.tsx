
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Hotel, Plane, Bus, Car, Loader2, Film, Sparkles, Key, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface HeroProps {
  onSearch: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('Hostelry');
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [bgVideoUrl, setBgVideoUrl] = useState<string | null>(null);
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  
  const [searchParams, setSearchParams] = useState({
    dest: '',
    checkIn: '',
    checkOut: '',
    guests: '2 Guest, 1 Room'
  });

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onSearch();
    }, 1200);
  };

  const handleGenerateAtmosphere = async () => {
    if (!searchParams.dest) {
      setSearchParams({ ...searchParams, dest: 'Santorini, Greece' });
    }

    if (window.aistudio?.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setShowKeyPrompt(true);
        return;
      }
    }

    setIsGeneratingVideo(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A cinematic 16:9 drone shot flying over ${searchParams.dest || 'a beautiful landscape'}, high definition, travel vlog style, 4k, natural lighting, serene atmosphere.`;
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: '16:9' }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 8000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setBgVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
      }
    } catch (error) {
      console.error("Hero Video Error:", error);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const handleOpenKeySelection = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setShowKeyPrompt(false);
      handleGenerateAtmosphere();
    }
  };

  const tabs = [
    { name: 'Hostelry', icon: <Hotel className="w-4 h-4" /> },
    { name: 'Flights', icon: <Plane className="w-4 h-4" /> },
    { name: 'Bus & Shuttle', icon: <Bus className="w-4 h-4" /> },
    { name: 'Cars', icon: <Car className="w-4 h-4" /> },
  ];

  return (
    <section className="relative pt-8 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Hero Card */}
        <div className="relative h-[600px] w-full overflow-hidden rounded-[48px] shadow-2xl bg-gray-50 border border-gray-100 group">
          {bgVideoUrl ? (
            <video 
              src={bgVideoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover brightness-[0.85] transition-all duration-1000 animate-in fade-in zoom-in-105"
            />
          ) : (
            <img 
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2074" 
              alt="Nature" 
              className={`w-full h-full object-cover brightness-[0.8] transition-all duration-1000 scale-105 group-hover:scale-110 ${isGeneratingVideo ? 'opacity-30 blur-md' : 'opacity-100'}`}
            />
          )}
          
          {/* Content Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col items-center justify-center text-center px-6 z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-in slide-in-from-top-4 duration-700">
              <Sparkles className="w-3 h-3 text-cyan-primary" />
              Your Premium Escape Awaits
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-black max-w-4xl leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
              Explore the whole world
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl font-medium mb-12 drop-shadow-lg">
              Curated experiences and hidden gems selected by global travel experts.
            </p>
          </div>

          {isGeneratingVideo && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl z-20 animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-cyan-primary rounded-[32px] flex items-center justify-center shadow-2xl animate-bounce mb-6">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
              <p className="text-gray-900 font-black uppercase tracking-widest text-xs bg-white/90 px-8 py-3 rounded-2xl shadow-xl">
                AI Vision In Progress...
              </p>
            </div>
          )}
        </div>

        {/* Floating Search Bar */}
        <div className="max-w-6xl mx-auto -mt-20 relative z-30">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-4 md:p-6 border border-white">
            {/* Tabs Header */}
            <div className="flex flex-wrap gap-2 md:gap-6 mb-6 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-3 py-3 px-6 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                    activeTab === tab.name 
                    ? 'bg-cyan-primary text-white shadow-xl shadow-cyan-100' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end p-2">
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 group-focus-within:text-cyan-primary transition-colors">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-primary w-5 h-5 transition-transform group-focus-within:scale-110" />
                  <input 
                    type="text" 
                    placeholder="Where to next?"
                    value={searchParams.dest}
                    onChange={(e) => setSearchParams({...searchParams, dest: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 hover:bg-gray-100 focus:bg-white rounded-[24px] border border-gray-100 focus:border-cyan-primary/30 focus:ring-4 focus:ring-cyan-primary/5 outline-none text-gray-900 font-bold transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4 group-focus-within:text-cyan-primary transition-colors">Check-in</label>
                <div className="relative">
                  <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-primary w-5 h-5" />
                  <input 
                    type="date" 
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 hover:bg-gray-100 focus:bg-white rounded-[24px] border border-gray-100 focus:border-cyan-primary/30 focus:ring-4 focus:ring-cyan-primary/5 outline-none text-gray-900 font-bold transition-all" 
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center px-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-focus-within:text-cyan-primary transition-colors">Details</label>
                  <button 
                    onClick={handleGenerateAtmosphere}
                    disabled={isGeneratingVideo}
                    className="text-[9px] font-black text-cyan-primary uppercase tracking-tighter hover:opacity-70 flex items-center gap-1 transition-all group/ai"
                  >
                    <Film className="w-3 h-3 group-hover/ai:rotate-12" /> AI Vision
                  </button>
                </div>
                <div className="relative">
                  <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-primary w-5 h-5" />
                  <input 
                    type="text" 
                    value={searchParams.guests}
                    onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 hover:bg-gray-100 focus:bg-white rounded-[24px] border border-gray-100 focus:border-cyan-primary/30 focus:ring-4 focus:ring-cyan-primary/5 outline-none text-gray-900 font-bold transition-all"
                  />
                </div>
              </div>

              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="relative overflow-hidden bg-cyan-primary text-white py-5 rounded-[24px] hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-100 font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 group/btn"
              >
                {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />}
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* API Key Modal (Re-styled for Hero) */}
      {showKeyPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-sm text-center shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border border-gray-100">
            <div className="w-20 h-20 bg-cyan-soft rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-inner">
              <Key className="w-10 h-10 text-cyan-primary" />
            </div>
            <h4 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">AI Vision Key</h4>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
              Generating cinematic destination previews requires a personal API key from a paid GCP project.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleOpenKeySelection} 
                className="w-full bg-cyan-primary text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-100 flex items-center justify-center gap-2"
              >
                Connect Key <ChevronRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setShowKeyPrompt(false)} 
                className="text-gray-400 text-xs font-black uppercase tracking-widest hover:text-gray-600 transition-colors"
              >
                Use Standard Image
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
