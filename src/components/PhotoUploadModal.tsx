import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Check, Image as ImageIcon, Sparkles, RefreshCw, Trash2 } from 'lucide-react';
import { compressAndFormatProfileImage } from '../utils/imageUtils';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl: string;
  userName: string;
  onSaveAvatar: (newUrl: string) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  userName,
  onSaveAvatar,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(currentAvatarUrl);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const AVATAR_PRESETS = [
    { label: 'Engineering Student', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    { label: 'Coder with Glasses', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' },
    { label: 'Software Developer', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
    { label: 'AI Researcher', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
    { label: 'Monogram Initials', url: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3525cd&color=fff&size=256` },
  ];

  const handleFileProcess = (file: File) => {
    compressAndFormatProfileImage(file, (base64) => {
      setPreviewUrl(base64);
    });
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileProcess(file);
    }
  };

  const handleSave = () => {
    onSaveAvatar(previewUrl);
    onClose();
  };

  const handleResetToInitials = () => {
    const initialsUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3525cd&color=fff&size=256`;
    setPreviewUrl(initialsUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-on-surface">
                Update Profile Picture
              </h3>
              <p className="text-xs text-outline">
                Upload your real photo or select a campus avatar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Active Preview */}
          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high">
            <div className="relative group">
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-24 h-24 rounded-3xl object-cover ring-4 ring-primary/20 shadow-md"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3525cd&color=fff`;
                }}
              />
              <span className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 text-white shadow-xs">
                <Check className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div>
                <p className="font-bold text-sm text-on-surface">{userName}</p>
                <p className="text-xs text-outline">Your photo is visible across your Dashboard, Placement Cards, and Profile</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs transition-all flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload from Device
                </button>
                <button
                  type="button"
                  onClick={handleResetToInitials}
                  className="px-3 py-1.5 rounded-xl border border-surface-container-high text-xs font-semibold text-outline hover:text-on-surface hover:bg-surface-container transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3" />
                  Initials Avatar
                </button>
              </div>
            </div>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[0.99]'
                  : 'border-surface-container-high hover:border-primary/50 bg-surface-container-low/50 hover:bg-surface-container-low'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-on-surface">
                Click to browse photo or drag & drop here
              </p>
              <p className="text-[11px] text-outline mt-0.5">
                Supports JPG, PNG, WebP • Auto-optimized for web
              </p>
            </div>
          </div>

          {/* Avatar Preset Grid */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-outline flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Or Pick from Curated Student Avatars
            </span>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {AVATAR_PRESETS.map((preset, idx) => {
                const isSelected = previewUrl === preset.url;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPreviewUrl(preset.url)}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary/30 bg-primary/5'
                        : 'border-surface-container-high hover:border-outline bg-white'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-11 h-11 rounded-xl object-cover"
                    />
                    <span className="text-[9px] font-medium text-outline truncate max-w-full">
                      {preset.label.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container shadow-2xs hover:shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            Save Profile Photo
          </button>
        </div>
      </div>
    </div>
  );
};
