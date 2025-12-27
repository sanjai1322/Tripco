
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Newspaper, Loader2, ExternalLink, Sparkles } from 'lucide-react';

const NewsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [news, setNews] = useState<string>('');
  const [sources, setSources] = useState<{title: string, uri: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const fetchNews = async () => {
    setIsLoading(true);
    setNews('');
    setSources([]);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "What are the top 3 trending travel destinations and news stories for this week? provide a concise summary.",
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text;
      setNews(text || "No news found at the moment.");
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (chunks) {
        const extractedSources = chunks
          .filter((c: any) => c.web)
          .map((c: any) => ({
            title: c.web.title || "Source",
            uri: c.web.uri
          }));
        setSources(extractedSources);
      }
    } catch (error) {
      setNews("Failed to fetch news. Please try again later.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`py-24 max-w-7xl mx-auto px-4 transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`} 
      id="news"
    >
      <div className="bg-gray-900 rounded-[48px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 bg-cyan-primary/10 border border-cyan-primary/20 px-4 py-2 rounded-full text-cyan-primary text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              AI Powered Insights
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Get the latest global <span className="text-cyan-primary">travel trends</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Stay ahead of the curve with real-time updates on trending destinations and travel requirements worldwide.
            </p>
            <button
              onClick={fetchNews}
              disabled={isLoading}
              className="group relative bg-cyan-primary hover:bg-cyan-400 text-white px-10 py-5 rounded-2xl font-bold transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Newspaper className="w-5 h-5" />}
              {isLoading ? 'Scanning the globe...' : 'Fetch Latest News'}
            </button>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 min-h-[300px] flex flex-col">
              {news ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="prose prose-invert max-w-none text-gray-300 mb-8 whitespace-pre-wrap leading-relaxed">
                    {news}
                  </div>
                  {sources.length > 0 && (
                    <div className="border-t border-white/10 pt-6">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Verified Sources</p>
                      <div className="flex flex-wrap gap-3">
                        {sources.slice(0, 3).map((source, idx) => (
                          <a
                            key={idx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl text-xs text-cyan-primary transition-colors border border-white/5"
                          >
                            {source.title.length > 20 ? source.title.substring(0, 20) + '...' : source.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 text-gray-600">
                    <Newspaper className="w-8 h-8" />
                  </div>
                  <p className="text-gray-500 font-medium">Click the button to see what's happening in the world of travel.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
