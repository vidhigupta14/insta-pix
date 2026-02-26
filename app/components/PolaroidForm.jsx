'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function PolaroidForm() {
    const [mode, setMode] = useState('caption');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [date, setDate] = useState('2026-02-18');
    const [spotifyUrl, setSpotifyUrl] = useState('');
    const [spotifyData, setSpotifyData] = useState(null);
    const [showPolaroid, setShowPolaroid] = useState(false);

    const handleUploadClick = () => {
        document.getElementById('imageUrl').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUploadedImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setUploadedImage(null);
        document.getElementById('imageUrl').value = '';
    };

    useEffect(() => {
        const extractSpotifyInfo = () => {
            if (!spotifyUrl) {
                setSpotifyData(null);
                return;
            }

            const trackIdMatch = spotifyUrl.match(/track\/([a-zA-Z0-9]+)/);
            if (trackIdMatch) {
                setSpotifyData({
                    trackId: trackIdMatch[1],
                    url: spotifyUrl
                });
            } else {
                setSpotifyData(null);
            }
        };

        extractSpotifyInfo();
    }, [spotifyUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!uploadedImage) {
            alert('Please upload an image first!');
            return;
        }
        if (mode === 'spotify' && !spotifyUrl) {
            alert('Please enter a Spotify URL!');
            return;
        }
        setShowPolaroid(true);
    };

    const handleDownload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 1000;

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 20, 20, 760, 760);

            if (mode === 'caption') {
                ctx.fillStyle = '#2d2d2d';
                ctx.font = '36px Caveat, cursive';
                ctx.textAlign = 'center';

                let y = 840;
                if (caption) {
                    ctx.fillText(caption, canvas.width / 2, y);
                    y += 40;
                }
                if (date) {
                    const dateObj = new Date(date + 'T00:00:00');
                    const formattedDate = dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    });
                    ctx.fillText(formattedDate, canvas.width / 2, y);
                }
                
                const link = document.createElement('a');
                link.download = `polaroid-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            } else if (spotifyData) {
                // Load barcode SVG
                const barcodeImg = new Image();
                barcodeImg.crossOrigin = 'anonymous';
                barcodeImg.onload = () => {
                    // Draw Spotify logo
                    // ctx.fillStyle = '#000000';
                    // ctx.beginPath();
                    // ctx.arc(120, 860, 35, 0, Math.PI * 2);
                    // ctx.fill();

                    // Draw white Spotify icon
                    // ctx.fillStyle = '#FFFFFF';
                    // ctx.font = 'bold 40px Arial';
                    // ctx.textAlign = 'center';
                    // ctx.fillText('♫', 120, 875);

                    // Draw barcode
                    const barcodeWidth = 400;
                    const barcodeHeight = 80;
                    const barcodeX = (canvas.width - barcodeWidth) / 2 + 60;
                    const barcodeY = 830;
                    ctx.drawImage(barcodeImg, barcodeX, barcodeY, barcodeWidth, barcodeHeight);
                    
                    const link = document.createElement('a');
                    link.download = `polaroid-spotify-${Date.now()}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                };
                barcodeImg.onerror = () => {
                    // Fallback if SVG doesn't load
                    const link = document.createElement('a');
                    link.download = `polaroid-spotify-${Date.now()}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                };
                barcodeImg.src = '/spotify_barcode.svg';
            }
        };
        img.src = uploadedImage;
    };

    const handlePrint = () => {
        // Create a new window with only the polaroid
        const printWindow = window.open('', '_blank');
        const polaroidElement = document.getElementById('polaroid-to-print');
        
        if (printWindow && polaroidElement) {
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Print Polaroid</title>
                    <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap" rel="stylesheet">
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            display: flex; 
                            justify-content: center; 
                            align-items: center; 
                            min-height: 100vh; 
                            background: white;
                            font-family: 'Caveat', cursive;
                        }
                        .polaroid { 
                            background: white; 
                            padding: 20px; 
                            padding-bottom: 60px; 
                            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                            width: 400px;
                        }
                        .polaroid img { 
                            width: 100%; 
                            aspect-ratio: 1; 
                            object-fit: cover; 
                        }
                        .caption-area { 
                            padding-top: 30px; 
                            text-align: center;
                            min-height: 120px;
                        }
                        .caption { 
                            font-size: 32px; 
                            color: #262626; 
                            margin-bottom: 10px;
                        }
                        .date { 
                            font-size: 24px; 
                            color: #737373; 
                        }
                        .spotify-container {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 8px;
                        }
                        .spotify-logo {
                            width: 48px;
                            height: 48px;
                            background: black;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .barcode {
                            width: 256px;
                            height: 80px;
                            object-fit: contain;
                        }
                        .spotify-text {
                            font-size: 10px;
                            color: #a3a3a3;
                        }
                        @media print {
                            body { background: white; }
                            .polaroid { box-shadow: none; }
                        }
                    </style>
                </head>
                <body>
                    ${polaroidElement.innerHTML}
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            
            // Wait for images to load before printing
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    };

    if (showPolaroid) {
        return (
            <div className="min-h-screen bg-[#F3F4F6] flex flex-col items-center justify-center p-8">
                <div className="relative mb-8">
                    {/* Tape */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-accent backdrop-blur-sm z-10 rotate-2 border border-accent flex items-center justify-center pointer-events-none shadow-sm">
                        <div className="w-full h-full border-x-2 border-accent"></div>
                    </div>

                    {/* Polaroid for display */}
                    <div className="bg-white p-4 pb-12 shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-sm flex flex-col items-center w-[400px] border border-gray-50 rotate-[-2deg]">
                        <div className="w-full aspect-square bg-gray-50 overflow-hidden relative">
                            <img 
                                src={uploadedImage} 
                                alt="Polaroid" 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="w-full pt-8 px-4 min-h-[120px] flex flex-col items-center justify-center">
                            {mode === 'caption' ? (
                                <div className="text-center">
                                    <p className="font-caveat text-3xl text-gray-800 leading-tight">
                                        {caption || 'Your story here...'}
                                    </p>
                                    {date && (
                                        <p className="font-caveat text-xl text-gray-500 mt-2">
                                            {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center gap-2 relative">
                                    {/* Spotify Logo */}
                                    {/* <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                                        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                        </svg>
                                    </div> */}
                                    
                                    {/* Container with barcode + invisible QR overlay */}
                                    <div className="relative">
                                        {/* Your visible barcode */}
                                        <img src="/spotify_barcode.svg" alt="Spotify Barcode" className="w-64 h-20 object-contain" />
                                        
                                        {/* Invisible QR code overlay (scannable) */}
                                        {spotifyData && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0">
                                                <QRCodeSVG 
                                                    value={spotifyUrl}
                                                    size={80}
                                                    level="M"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <p className="text-[10px] text-gray-400 mt-1">Scan to open in Spotify</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Hidden polaroid for printing (without QR code) */}
                <div id="polaroid-to-print" className="hidden">
                    <div className="polaroid">
                        <img src={uploadedImage} alt="Polaroid" />
                        <div className="caption-area">
                            {mode === 'caption' ? (
                                <>
                                    <div className="caption">{caption || 'Your story here...'}</div>
                                    {date && (
                                        <div className="date">
                                            {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="spotify-container">
                                    {/* <div className="spotify-logo">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                        </svg>
                                    </div> */}
                                    <img src="/spotify_barcode.svg" alt="Spotify Barcode" className="barcode" />
                                    <p className="spotify-text">Scan to open in Spotify</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button 
                        onClick={handleDownload}
                        className="py-3 px-8 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
                    >
                        Download
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="py-3 px-8 bg-white text-primary border-2 border-primary rounded-2xl font-bold hover:bg-primary hover:text-white transition-all"
                    >
                        Print
                    </button>
                    {mode === 'spotify' && spotifyData && (
                        <a 
                            href={spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-8 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                            </svg>
                            Open in Spotify
                        </a>
                    )}
                </div>

                <button 
                    onClick={() => setShowPolaroid(false)}
                    className="mt-6 text-gray-600 hover:text-primary font-semibold transition-colors"
                >
                    ← Create Another
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white w-[480px] p-8 m-10 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-gray-100">
            <form className="space-y-8" onSubmit={handleSubmit}>   
                {/* Upload Section */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Photo Source</label>
                    
                    {!uploadedImage ? (
                        <div 
                            onClick={handleUploadClick}
                            className="w-full py-4 px-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-all group cursor-pointer"
                        >
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <span className="font-semibold text-gray-600 group-hover:text-primary transition-colors">Upload Image</span>
                            <span className="text-xs text-gray-400">JPG, PNG or GIF (max 5MB)</span>
                        </div>
                    ) : (
                        <div className="relative w-full rounded-2xl overflow-hidden border-2 border-primary">
                            <img src={uploadedImage} alt="Uploaded" className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                                <span className="text-white font-semibold flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    Image Uploaded
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-2 right-2 bg-primary text-white rounded-full p-1.5 hover:bg-primary/80 transition-all shadow-lg"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                    
                    <input 
                        type="file" 
                        id="imageUrl" 
                        name="imageUrl" 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
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
                            className={`flex-1 py-3 text-sm font-semibold rounded-xl relative z-10 transition-colors ${
                                mode === 'caption' ? 'text-primary' : 'text-gray-500'
                            }`}
                        >
                            Caption Mode
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setMode('spotify')}
                            className={`flex-1 py-3 text-sm font-semibold rounded-xl relative z-10 transition-colors ${
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
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
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
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
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
                                    value={spotifyUrl}
                                    onChange={(e) => setSpotifyUrl(e.target.value)}
                                    placeholder="https://open.spotify.com/track/..."
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 pl-12 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ring-primary focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {spotifyData ? (
                            <div className="p-4 bg-gray-50 rounded-2xl border-2 border-primary/20 flex items-center gap-4">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="w-full h-3 bg-primary/20 rounded-full mb-2"></div>
                                    <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        ) : (
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
                        )}
                    </>
                )}

                {/* Submit Button */}
                <button type="submit" className="w-full py-4 bg-primary text-white rounded-[20px] font-bold text-lg shadow-xl shadow-primary hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                    <span>Generate Polaroid</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </form>
        </div>
    );
  }
