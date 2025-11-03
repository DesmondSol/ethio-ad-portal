import React, { useState } from 'react';
import { Campaign, CampaignStep } from '../types';
import { BILLBOARD_LOCATIONS } from '../constants';
import { CheckCircleIcon } from '../components/Icons';

interface ReviewAndPayProps {
  setStep: () => void;
  campaign: Partial<Campaign>;
}

export const ReviewAndPay: React.FC<ReviewAndPayProps> = ({ setStep, campaign }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const proceedToPayment = () => {
    // Here you would integrate with Telebirr API
    console.log("Redirecting to Telebirr for payment...");
    setStep();
  };

  if (!campaign.selectedSlots || !campaign.adContent || !campaign.kycDetails) {
    return <div className="text-center p-8">Loading campaign details...</div>;
  }

  const mediaPreviewUrl = campaign.adContent ? URL.createObjectURL(campaign.adContent) : '';

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Review & Confirm Your Order</h1>
      <p className="text-slate-400 mb-8">Please review all the details below before making the payment.</p>

      <div className="bg-slate-800 p-8 rounded-lg shadow-xl space-y-6">
        {/* Campaign Details */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400 border-b border-slate-700 pb-2">Campaign Details</h2>
          <p><span className="font-semibold text-slate-300">Campaign Name:</span> {campaign.campaignName}</p>
          <p><span className="font-semibold text-slate-300">Advertiser Name:</span> {campaign.advertiserName}</p>
        </div>

        {/* Booking Summary */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400 border-b border-slate-700 pb-2">Booking Summary</h2>
          <div className="max-h-60 overflow-y-auto pr-2">
            {campaign.selectedSlots.map((slot, index) => {
              const location = BILLBOARD_LOCATIONS.find(l => l.id === slot.locationId);
              return (
                <div key={index} className="flex justify-between items-center p-2 rounded-md hover:bg-slate-700/50">
                  <span>{location?.name} on {slot.date} at {slot.time}</span>
                  <span className="font-semibold">{slot.cost.toLocaleString()} ETB</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ad Content */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400 border-b border-slate-700 pb-2">Ad Content</h2>
          <div className="flex items-start space-x-4">
            {campaign.adContent.type.startsWith('image/') ? (
              <img src={mediaPreviewUrl} alt="Ad preview" className="w-28 h-auto rounded-lg shadow-lg" />
            ) : (
              <video src={mediaPreviewUrl} className="w-28 rounded-lg shadow-lg" />
            )}
            <div>
              <p className="font-semibold">{campaign.adContent.name}</p>
              <button onClick={() => window.open(mediaPreviewUrl)} className="text-emerald-400 hover:underline text-sm">Preview Fullscreen</button>
            </div>
          </div>
        </div>

        {/* KYC Status */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-emerald-400 border-b border-slate-700 pb-2">KYC Status</h2>
          <div className="flex items-center space-x-2 text-green-400">
            <CheckCircleIcon className="w-6 h-6" />
            <span className="font-semibold">Verification Documents Submitted</span>
          </div>
        </div>

        {/* Total & Payment */}
        <div className="border-t border-slate-700 pt-6">
          <div className="text-right mb-6">
            <p className="text-slate-400">Total Amount</p>
            <p className="text-4xl font-bold text-emerald-400">{campaign.totalCost?.toLocaleString()} ETB</p>
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="mt-1 h-5 w-5 rounded bg-slate-600 border-slate-500 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-slate-300 text-sm">
                I agree to the <a href="#" className="underline text-emerald-400">Terms of Service</a> and <a href="#" className="underline text-emerald-400">Advertising Content Policy</a>. I understand that my ad is subject to approval by Ethio Telecom and may be rejected if it violates guidelines.
              </span>
            </label>
          </div>

          <div className="flex justify-end mt-6">
            <button
              onClick={proceedToPayment}
              disabled={!agreedToTerms}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              Pay with Telebirr
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};