
import React, { useState } from 'react';
import { Campaign, CampaignStep, AdvertiserType, KycDetails } from '../types';

interface KycFormProps {
  setStep: (step: CampaignStep) => void;
  updateCampaign: (data: Partial<Campaign>) => void;
  campaign: Partial<Campaign>;
}

const FileInput: React.FC<{ label: string; onFileSelect: (file: File) => void }> = ({ label, onFileSelect }) => {
  const [fileName, setFileName] = useState('');
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileSelect(file);
    }
  };
  return (
    <div>
      <label className="block font-semibold mb-2">{label}</label>
      <label htmlFor={label} className="cursor-pointer bg-slate-700 p-3 rounded-lg w-full flex justify-between items-center hover:bg-slate-600 transition-colors">
        <span className="text-slate-300">{fileName || 'Click to select a file'}</span>
        <span className="bg-emerald-500 text-white font-bold py-1 px-3 rounded-md text-sm">Browse</span>
      </label>
      <input type="file" id={label} className="hidden" onChange={handleFileChange} />
    </div>
  );
};


export const KycForm: React.FC<KycFormProps> = ({ setStep, updateCampaign }) => {
  const [advertiserType, setAdvertiserType] = useState<AdvertiserType>(AdvertiserType.BUSINESS);
  const [formData, setFormData] = useState<Partial<KycDetails>>({ advertiserType: AdvertiserType.BUSINESS });

  const setFormField = <K extends keyof KycDetails,>(field: K, value: KycDetails[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const proceed = () => {
    if (!formData.tinNumber) {
        alert("TIN Number is required.");
        return;
    }
    // Add more validation as needed
    updateCampaign({ kycDetails: formData as KycDetails });
    setStep(CampaignStep.REVIEW);
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Advertiser Verification</h1>
      <p className="text-slate-400 mb-8">To ensure a secure and compliant advertising environment, we need to verify your identity. This is a one-time process.</p>
      
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400">Advertiser Type</h2>
          <div className="flex space-x-4">
            <label className={`flex-1 p-4 rounded-lg cursor-pointer border-2 transition-all ${advertiserType === AdvertiserType.BUSINESS ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700'}`}>
              <input type="radio" name="advertiserType" value={AdvertiserType.BUSINESS} checked={advertiserType === AdvertiserType.BUSINESS} onChange={() => {setAdvertiserType(AdvertiserType.BUSINESS); setFormField('advertiserType', AdvertiserType.BUSINESS)}} className="hidden"/>
              <span className="font-semibold">{AdvertiserType.BUSINESS}</span>
            </label>
            <label className={`flex-1 p-4 rounded-lg cursor-pointer border-2 transition-all ${advertiserType === AdvertiserType.INDIVIDUAL ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700'}`}>
              <input type="radio" name="advertiserType" value={AdvertiserType.INDIVIDUAL} checked={advertiserType === AdvertiserType.INDIVIDUAL} onChange={() => {setAdvertiserType(AdvertiserType.INDIVIDUAL); setFormField('advertiserType', AdvertiserType.INDIVIDUAL)}} className="hidden"/>
              <span className="font-semibold">{AdvertiserType.INDIVIDUAL}</span>
            </label>
          </div>
        </div>

        {advertiserType === AdvertiserType.BUSINESS && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-xl font-bold mb-2 text-emerald-400">Business Details</h2>
            <div>
              <label htmlFor="business-name" className="block font-semibold mb-2">Business Name</label>
              <input type="text" id="business-name" onChange={e => setFormField('businessName', e.target.value)} className="bg-slate-700 p-3 rounded-lg w-full"/>
            </div>
            <div>
              <label htmlFor="business-tin" className="block font-semibold mb-2">Business TIN Number (Required)</label>
              <input type="text" id="business-tin" onChange={e => setFormField('tinNumber', e.target.value)} className="bg-slate-700 p-3 rounded-lg w-full"/>
            </div>
            <FileInput label="Trade License" onFileSelect={file => setFormField('tradeLicense', file)} />
            <FileInput label="Authorized Representative Letter (Optional)" onFileSelect={file => setFormField('representativeLetter', file)} />
          </div>
        )}

        {advertiserType === AdvertiserType.INDIVIDUAL && (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-xl font-bold mb-2 text-emerald-400">Individual Details</h2>
            <div>
              <label htmlFor="full-name" className="block font-semibold mb-2">Full Legal Name</label>
              <input type="text" id="full-name" onChange={e => setFormField('fullName', e.target.value)} className="bg-slate-700 p-3 rounded-lg w-full"/>
            </div>
            <div>
              <label htmlFor="individual-tin" className="block font-semibold mb-2">TIN Number (Required)</label>
              <input type="text" id="individual-tin" onChange={e => setFormField('tinNumber', e.target.value)} className="bg-slate-700 p-3 rounded-lg w-full"/>
            </div>
            <FileInput label="Government-Issued ID" onFileSelect={file => setFormField('governmentId', file)} />
             <p className="text-sm text-slate-400">Acceptable IDs: Passport, National ID, or Driving License.</p>
          </div>
        )}

        <div className="flex justify-end pt-6 border-t border-slate-700">
          <button 
            onClick={proceed}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Proceed to Final Review & Pay
          </button>
        </div>
      </div>
    </div>
  );
};
