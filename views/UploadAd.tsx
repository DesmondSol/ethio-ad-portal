
import React, { useState, useCallback, useRef } from 'react';
import { Campaign, CampaignStep } from '../types';
import { UploadIcon } from '../components/Icons';

interface UploadAdProps {
  setStep: (step: CampaignStep) => void;
  updateCampaign: (data: Partial<Campaign>) => void;
  campaign: Partial<Campaign>;
}

export const UploadAd: React.FC<UploadAdProps> = ({ setStep, updateCampaign, campaign }) => {
  const [campaignName, setCampaignName] = useState(campaign.campaignName || '');
  const [advertiserName, setAdvertiserName] = useState(campaign.advertiserName || '');
  const [adFile, setAdFile] = useState<File | null>(campaign.adContent || null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      // Basic validation
      if (file.size > 50 * 1024 * 1024) {
        alert("File size exceeds 50MB limit.");
        return;
      }
      if (!['video/mp4', 'video/quicktime'].includes(file.type)) {
        alert("Invalid file format. Please upload MP4 or MOV.");
        return;
      }
      setAdFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);
  
  const proceed = () => {
    if (!campaignName || !advertiserName || !adFile) {
      alert("Please fill all fields and upload an ad file.");
      return;
    }
    updateCampaign({ campaignName, advertiserName, adContent: adFile });
    setStep(CampaignStep.KYC);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Upload Your Advertisement</h1>
      <p className="text-slate-400 mb-8">Provide your campaign details and upload your ad creative.</p>
      
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Campaign Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="campaign-name" className="block font-semibold mb-2">Campaign Name</label>
              <input type="text" id="campaign-name" value={campaignName} onChange={e => setCampaignName(e.target.value)} placeholder="e.g., 'New Restaurant Launch - May'" className="bg-slate-700 p-3 rounded-lg w-full"/>
            </div>
            <div>
              <label htmlFor="advertiser-name" className="block font-semibold mb-2">Advertiser Name</label>
              <input type="text" id="advertiser-name" value={advertiserName} onChange={e => setAdvertiserName(e.target.value)} placeholder="Your Company/Individual Name" className="bg-slate-700 p-3 rounded-lg w-full"/>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Ad Content Upload</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-600 hover:border-slate-500'}`}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
              <p className="font-semibold text-white">Drag & drop your video here</p>
              <p className="text-slate-400 text-sm">or click to browse files</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="video/mp4,video/quicktime"
                onChange={e => handleFileChange(e.target.files)}
              />
            </div>
            <div className="text-sm text-slate-400 bg-slate-700/50 p-4 rounded-lg">
              <h3 className="font-bold text-white mb-2">Specifications:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><span className="font-semibold text-slate-300">Format:</span> MP4, MOV</li>
                <li><span className="font-semibold text-slate-300">Duration:</span> Exactly 15 seconds</li>
                <li><span className="font-semibold text-slate-300">Aspect Ratio:</span> 16:9 (Landscape)</li>
                <li><span className="font-semibold text-slate-300">Max File Size:</span> 50MB</li>
              </ul>
              <p className="mt-4 text-xs">Content must comply with Ethiopian law and is subject to Ethio Telecom approval.</p>
            </div>
          </div>
        </div>
        
        {filePreview && adFile && (
          <div>
            <h3 className="font-bold text-white mb-2">Preview:</h3>
            <video src={filePreview} controls className="w-full max-w-md rounded-lg shadow-lg"></video>
            <p className="text-sm text-slate-400 mt-2">File: {adFile.name}</p>
          </div>
        )}

        <div className="flex justify-end pt-6 border-t border-slate-700">
          <button 
            onClick={proceed}
            disabled={!campaignName || !advertiserName || !adFile}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            Proceed to Verification
          </button>
        </div>
      </div>
    </div>
  );
};
