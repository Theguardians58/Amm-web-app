import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { Camera, Save, User, X, Check, ZoomIn, ZoomOut, Move } from 'lucide-react';

interface ProfileSectionProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  t: any;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profile, onSave, t }) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cropping State
  const [tempImage, setTempImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [minZoom, setMinZoom] = useState(0.1); // Dynamic min zoom based on image size
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0 });
  const cropStartRef = useRef({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result as string);
        setCrop({ x: 0, y: 0 });
        // Zoom will be set automatically by handleImageLoad
      };
      reader.readAsDataURL(file);
    }
    // Reset input to allow selecting the same file again if cancelled
    e.target.value = '';
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    const viewportSize = 250;
    
    // Calculate scale needed to cover the viewport (object-fit: cover)
    // We use Math.min so that the smaller dimension fits the viewport, 
    // ensuring no whitespace for the other dimension.
    const scaleToCover = viewportSize / Math.min(naturalWidth, naturalHeight);
    
    // Safety check
    const safeScale = Number.isFinite(scaleToCover) ? scaleToCover : 1;

    setMinZoom(safeScale);
    setZoom(safeScale);
  };

  const handleCancelCrop = () => {
    setTempImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setMinZoom(0.1);
  };

  const handleSaveCrop = () => {
    if (!imgRef.current) return;
    
    // Create a canvas to process the crop
    const canvas = document.createElement('canvas');
    const size = 400; // Output resolution
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
       // Fill white background for transparency handling
       ctx.fillStyle = '#FFFFFF';
       ctx.fillRect(0, 0, size, size);

       // Create circular mask on canvas
       ctx.beginPath();
       ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
       ctx.clip();
       
       // Calculate scale factor between visual viewport (250px) and output size (400px)
       const viewportSize = 250;
       const scaleFactor = size / viewportSize;
       
       // Transform context to match user's visual adjustments
       ctx.translate(size/2, size/2); // Move origin to center
       ctx.translate(crop.x * scaleFactor, crop.y * scaleFactor);
       ctx.scale(zoom * scaleFactor, zoom * scaleFactor);
       
       // Draw image centered at origin
       const img = imgRef.current;
       ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
       
       const croppedUrl = canvas.toDataURL('image/jpeg', 0.9);
       setFormData(prev => ({ ...prev, photoUrl: croppedUrl }));
       setTempImage(null);
    }
  };

  // Drag Interaction Logic
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    dragStartRef.current = { x: clientX, y: clientY };
    cropStartRef.current = { x: crop.x, y: crop.y };
  };

  // Global event listeners for dragging outside the element bounds
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling while dragging
      
      const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
      
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;

      setCrop({
        x: cropStartRef.current.x + dx,
        y: cropStartRef.current.y + dy
      });
    };

    const onUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', onMove, { passive: false });
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden min-h-[80vh] p-8 md:p-10 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t.profile.title}</h2>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto">
        {/* Photo Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-36 h-36 group cursor-pointer" onClick={() => isEditing && fileInputRef.current?.click()}>
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl shadow-gray-200 bg-gray-50 flex items-center justify-center transition-transform group-hover:scale-105">
              {formData.photoUrl ? (
                <img src={formData.photoUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={72} className="text-gray-300" />
              )}
            </div>
            {isEditing && (
              <div
                className="absolute bottom-1 right-1 bg-ammi-maroon text-white p-3 rounded-full shadow-lg hover:bg-rose-800 transition-all border-4 border-white"
              >
                <Camera size={20} />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />
          </div>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-ammi-maroon text-sm font-bold hover:underline"
            >
              {t.profile.edit_photo}
            </button>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.name}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder={t.profile.ph_name}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.age}</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="25"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.size}</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100"
              >
                <option value="">Select Size</option>
                <option value="S">S (Small)</option>
                <option value="M">M (Medium)</option>
                <option value="L">L (Large)</option>
                <option value="XL">XL (Extra Large)</option>
                <option value="XXL">XXL</option>
                <option value="32B">32B</option>
                <option value="34B">34B</option>
                <option value="36C">36C</option>
                <option value="38D">38D</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.religion}</label>
            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100"
            >
              <option value="">Select Religion</option>
              <option value="Hindu">{t.profile.religions.hindu}</option>
              <option value="Muslim">{t.profile.religions.muslim}</option>
              <option value="Christian">{t.profile.religions.christian}</option>
              <option value="Sikh">{t.profile.religions.sikh}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="email@example.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.phone}</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="9876543210"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider ml-1">{t.profile.address}</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              rows={3}
              placeholder={t.profile.ph_address}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-ammi-maroon/20 focus:border-ammi-maroon transition-all disabled:opacity-70 disabled:bg-gray-100 resize-none"
            />
          </div>
        </div>

        {isEditing && (
          <button
            type="submit"
            className="w-full bg-ammi-maroon text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 flex items-center justify-center gap-2 hover:bg-rose-800 hover:scale-[1.02] transition-all text-lg"
          >
            <Save size={22} />
            {t.profile.btn_save}
          </button>
        )}
      </form>

      {/* Crop Modal */}
      {tempImage && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <Move size={18} className="text-ammi-maroon" /> Adjust Photo
                </h3>
                <button 
                    onClick={handleCancelCrop} 
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            
            <div className="p-6 bg-gray-100 flex flex-col items-center justify-center gap-4">
                <div className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                    Drag to pan • Pinch/Slider to zoom
                </div>
                
                {/* Crop Viewport */}
                <div 
                    className="relative w-[250px] h-[250px] bg-white rounded-full overflow-hidden shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] cursor-move touch-none border-4 border-white"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleMouseDown}
                >
                    <img
                        ref={imgRef}
                        src={tempImage}
                        onLoad={handleImageLoad}
                        alt="Crop Preview"
                        className="max-w-none absolute origin-center pointer-events-none select-none"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) translate(${crop.x}px, ${crop.y}px) scale(${zoom})`
                        }}
                    />
                </div>
            </div>

            <div className="p-4 bg-white border-t border-gray-100 space-y-4">
                {/* Zoom Control */}
                <div className="flex items-center gap-3 text-gray-500">
                    <ZoomOut size={18} />
                    <input 
                        type="range" 
                        min={minZoom} 
                        max={minZoom * 4} 
                        step={minZoom * 0.05} 
                        value={zoom}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-ammi-maroon"
                    />
                    <ZoomIn size={18} />
                </div>

                <div className="flex gap-3">
                    <button 
                        onClick={handleCancelCrop}
                        className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSaveCrop}
                        className="flex-1 py-3 rounded-xl bg-ammi-maroon text-white font-bold hover:bg-rose-800 shadow-lg shadow-rose-200 transition-colors flex items-center justify-center gap-2"
                    >
                        <Check size={20} /> Apply
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};