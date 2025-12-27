
import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Star, ShieldCheck, Calendar, Users, ChevronRight, Sparkles, Loader2, Play, Film, Key, AlertCircle } from 'lucide-react';
import { Destination } from '../types';
import { GoogleGenAI } from "@google/genai";

interface BookingModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ destination, isOpen, onClose, onConfirm }) => {
  const [itinerary, setItinerary] = useState<string | null>(null);
  const [isGeneratingItinerary, setIsGeneratingItinerary] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const hasAttemptedAutoVideo = useRef(false);

  useEffect(() => {
    if (isOpen && destination && !hasAttemptedAutoVideo.current) {
      checkAndGenerateVideo();
      hasAttemptedAutoVideo.current = true;
    }
    if (!isOpen) {
      hasAttemptedAutoVideo.current = false;
      setVideoUrl(null);
      setItinerary(null);
      setVideoError(null);
    }
  }, [isOpen, destination]);

  const checkAndGenerateVideo = async () => {
    if (window.aistudio?.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (hasKey) {
        handleGenerateVideo();
      }
    }
  };

  const handleGenerateVideo = async () => {
    if (window.aistudio?.hasSelectedApiKey) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        setShowKeyPrompt(true);
        return;
      }
    }

    setIsVideoLoading(true);
    setVideoError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A cinematic drone shot of ${destination?.name} in ${destination?.location}, 4k, travel adventure style.`;
      
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
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found")) {
        setShowKeyPrompt(true);
      } else {
        setVideoError("Could not generate cinematic view.");
      }
    } finally {
      setIsVideoLoading(false);
    }
  };

  const generateItinerary = async () => {
    setIsGeneratingItinerary(true);
    setItinerary(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a bulleted 3-day travel itinerary for ${destination?.name} in ${destination?.location}.`,
      });
      setItinerary(response.text || "Itinerary unavailable.");
    } catch (error) {
      setItinerary("AI scout is busy.");
    } finally {
      setIsGeneratingItinerary(false);
    }
  };

  if (!isOpen || !destination) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div className="bg-white rounded-[40px] w-full max-w-4xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
        <button onClick={onClose} className="absolute right-6 top-6 z-30 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-md">
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="md:w-1/2 relative min-h-[250px] bg-gray-100">
          {videoUrl ? (
            <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay loop />
          ) : isVideoLoading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 text-center px-8">
              <Loader2 className="w-10 h-10 text-cyan-primary animate-spin mb-4" />
              <p className="font-bold text-gray-900">Generating AI Trailer...</p>
            </div>
          ) : (
            <>
              <img src={destination.image} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-3xl font-bold mb-1">{destination.name}</h3>
                <div className="flex items-center text-white/80 text-sm">
                  <MapPin className="w-4 h-4 mr-2" /> {destination.location}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="md:w-1/2 p-8 md:p-10 overflow-y-auto">
          <div className="mb-8">
            <span className="text-cyan-primary font-bold text-xs uppercase tracking-widest">Destination Profile</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">Book Your Trip</h2>
          </div>

          <div className="flex gap-4 mb-8">
            <button onClick={handleGenerateVideo} disabled={isVideoLoading || !!videoUrl} className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-cyan-soft transition-all text-left">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-cyan-primary mb-3 shadow-sm">
                <Film className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-gray-900">Cinema View</p>
              <p className="text-[10px] text-gray-500 font-medium">AI Drone Footage</p>
            </button>
            <button onClick={generateItinerary} disabled={isGeneratingItinerary} className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-cyan-soft transition-all text-left">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-cyan-primary mb-3 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-gray-900">AI Itinerary</p>
              <p className="text-[10px] text-gray-500 font-medium">3-Day Plan</p>
            </button>
          </div>

          {itinerary && (
            <div className="mb-8 p-6 bg-cyan-soft/50 rounded-2xl border border-cyan-100 animate-in fade-in">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{itinerary}</p>
            </div>
          )}

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Calendar className="w-5 h-5 text-cyan-primary" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Dates</p>
                <p className="text-sm font-bold text-gray-900">Flexible - 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Users className="w-5 h-5 text-cyan-primary" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Travelers</p>
                <p className="text-sm font-bold text-gray-900">2 People</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 mt-auto flex justify-between items-center gap-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase">Total Estimate</p>
              <p className="text-2xl font-bold text-gray-900">${destination.price}<span className="text-xs text-gray-400 ml-1">/ person</span></p>
            </div>
            <button onClick={onConfirm} className="bg-cyan-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-cyan-700 transition-all flex items-center gap-2">
              Confirm Booking <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
