
import React, { useState } from 'react';
import { Play, Loader2, Sparkles, Film } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface PromoVideoProps {
  onBook: () => void;
}

const PromoVideo: React.FC<PromoVideoProps> = ({ onBook }) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayVideo = async () => {
    if (videoUrl) return;

    // Check key
    if (window.aistudio?.openSelectKey && !(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
    }

    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = "A high-end travel montage, POV of someone jumping into crystal clear turquoise water in the Maldives, slow motion, sun rays through the water, cinematic lighting, 4k.";
      
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
        setVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
      }
    } catch (error) {
      console.error("Promo Video Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div>
          <span className="text-cyan-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Live Action Preview</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Experience it before you go</h2>
        </div>
        <button 
          onClick={onBook}
          className="bg-cyan-primary text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest hover:bg-cyan-700 transition-all shadow-2xl shadow-cyan-100"
        >
          Book Your Adventure
        </button>
      </div>

      <div className="relative h-[600px] w-full rounded-[60px] overflow-hidden group shadow-2xl bg-black border border-gray-100">
        {videoUrl ? (
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-cover animate-in fade-in duration-1000"
          />
        ) : (
          <>
            <img 
              src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=2070" 
              alt="Adventure Video Thumbnail" 
              className={`w-full h-full object-cover transition-all duration-1000 ${isLoading ? 'scale-110 brightness-50 blur-md' : 'group-hover:scale-105 brightness-90'}`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button 
                onClick={handlePlayVideo}
                disabled={isLoading}
                className={`w-32 h-32 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center transition-all border-2 border-white/50 ${isLoading ? 'scale-90 animate-pulse' : 'hover:scale-110 shadow-2xl'}`}
              >
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-cyan-primary shadow-xl">
                  {isLoading ? <Loader2 className="w-10 h-10 animate-spin" /> : <Play className="w-10 h-10 fill-current translate-x-1" />}
                </div>
              </button>
              
              {isLoading && (
                <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <Sparkles className="w-5 h-5 text-cyan-primary" />
                    <span className="text-white font-black uppercase tracking-[0.3em] text-xs">AI Cinema Engine</span>
                  </div>
                  <p className="text-white/60 font-medium text-sm">Composing your immersive travel experience...</p>
                </div>
              )}

              {!isLoading && (
                <div className="absolute bottom-12 flex items-center gap-3 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Film className="w-4 h-4 text-cyan-primary" />
                  <span className="text-white font-bold text-xs uppercase tracking-widest">Click to generate cinematic preview</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PromoVideo;
