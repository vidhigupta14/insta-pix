'use client';

import { useState } from 'react';

export default function PolaroidForm() {
    const [mode, setMode] = useState('caption');

    return (
    <div className="bg-white w-[480px] p-8 m-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100">
      <form className="space-y-8">   
        {/* Upload Section */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Photo Source</label>
          <div className="w-full py-4 px-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:border-primary hover:text-primary transition-all group cursor-pointer">
            <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <span className="font-semibold text-gray-600 group-hover:text-primary transition-colors">Upload Image</span>
            <span className="text-xs text-gray-400">JPG, PNG or GIF (max 5MB)</span>
            <input type="file" id="imageUrl" name="imageUrl" className="hidden" accept="image/*" />
          </div>
        </div>

        {/* Mode Toggle */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Customization Mode</label>
          <div className="bg-gray-100 p-1.5 rounded-2xl flex relative">
            <div 
              className="absolute inset-y-1.5 bg-white rounded-xl shadow-sm w-[calc(50%-6px)] transition-all duration-300"
              style={{ left: mode === 'caption' ? '6px' : '50%' }}
            ></div>
            <button 
              type="button" 
              onClick={() => setMode('caption')}
              className={`cursor-pointer flex-1 py-3 text-sm font-semibold rounded-xl relative z-10 transition-colors ${
                mode === 'caption' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Caption Mode
            </button>
            <button 
              type="button" 
              onClick={() => setMode('spotify')}
              className={`cursor-pointer flex-1 py-3 text-sm font-semibold rounded-xl relative z-10 transition-colors ${
                mode === 'spotify' ? 'text-primary' : 'text-gray-500'
              }`}
            >
              Spotify Mode
            </button>
          </div>
        </div>

        {/* Caption Mode Inputs */}
        {mode === 'caption' && (
          <>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Memory Caption</span>
                <span className="text-[10px] bg-accent px-2 py-0.5 rounded-full font-bold text-gray-700">Handwritten</span>
              </label>
              <textarea 
                placeholder="Write something sweet..." 
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ring-primary focus:border-primary transition-all resize-none h-32"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date</label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <input 
                  type="date" 
                  defaultValue="2026-02-18"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-gray-800 focus:outline-none focus:ring-2 ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
          </>
        )}

        {/* Spotify Mode Inputs */}
        {mode === 'spotify' && (
          <>
            <div className="space-y-2">
              <label className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Spotify URL</span>
                <span className="text-[10px] bg-accent px-2 py-0.5 rounded-full font-bold text-gray-700">Share Link</span>
              </label>
              <div className="relative">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 18V5l12-2v13M6 21a3 3 0 100-6 3 3 0 000 6zm12-2a3 3 0 100-6 3 3 0 000 6z"></path>
                </svg>
                <input 
                  type="text" 
                  placeholder="https://open.spotify.com/track/..."
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 18V5l12-2v13M6 21a3 3 0 100-6 3 3 0 000 6zm12-2a3 3 0 100-6 3 3 0 000 6z"></path>
                </svg>
              </div>
              <div>
                <div className="w-32 h-3 bg-gray-200 rounded-full mb-2"></div>
                <div className="w-24 h-2 bg-gray-100 rounded-full"></div>
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button type="submit" className="w-full py-4 bg-primary text-white rounded-[20px] font-bold text-lg shadow-xl shadow-primary hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
          <span>Save to Gallery</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </form>
    </div>
    );
}


