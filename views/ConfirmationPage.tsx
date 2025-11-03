
import React from 'react';
import { Campaign, CampaignStep } from '../types';
import { CheckCircleIcon } from '../components/Icons';

interface ConfirmationPageProps {
  setStep: (step: CampaignStep) => void;
  campaign: Partial<Campaign>;
  startNewCampaign: () => void;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ setStep, campaign, startNewCampaign }) => {
  const transactionId = `ET-AD-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl text-center animate-fade-in">
      <div className="bg-slate-800 p-8 md:p-12 rounded-lg shadow-xl">
        <CheckCircleIcon className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
        <p className="text-slate-300 text-lg mb-6">
          Your payment of <span className="font-bold text-white">{campaign.totalCost?.toLocaleString()} ETB</span> has been received successfully.
        </p>

        <div className="bg-slate-700/50 p-4 rounded-lg mb-8">
          <p className="text-slate-400">Order/Transaction ID</p>
          <p className="font-mono text-xl font-bold text-white">{transactionId}</p>
        </div>

        <p className="text-slate-300 mb-8">
          Your advertisement is now in the <span className="font-semibold text-yellow-400">Pending Approval</span> queue. You will be notified via SMS and email once it is approved and scheduled to go live.
        </p>

        <div className="text-left bg-slate-900 p-6 rounded-lg">
            <h2 className="font-bold text-lg mb-3">Next Steps:</h2>
            <ul className="space-y-2 text-slate-400">
                <li className="flex items-start"><span className="font-semibold text-slate-300 w-24">Ad Review:</span> Typically within 24-48 hours.</li>
                <li className="flex items-start"><span className="font-semibold text-slate-300 w-24">Go-Live:</span> Your ad will play as per your scheduled slots.</li>
                <li className="flex items-start"><span className="font-semibold text-slate-300 w-24">Need Help?</span> <a href="#" className="text-emerald-400 hover:underline">Contact Support</a>.</li>
            </ul>
        </div>
        
        <div className="flex justify-center space-x-4 mt-10">
            <button 
                onClick={() => setStep(CampaignStep.DASHBOARD)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
                View Your Dashboard
            </button>
            <button 
                onClick={startNewCampaign}
                className="bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-300 font-bold py-3 px-8 rounded-lg transition-colors"
            >
                Book Another Ad
            </button>
        </div>
      </div>
    </div>
  );
};
