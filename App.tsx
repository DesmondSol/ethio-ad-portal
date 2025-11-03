
import React, { useState } from 'react';
import { Campaign, CampaignStep } from './types';
import { LandingPage } from './views/LandingPage';
import { BillboardChooser } from './views/BillboardChooser';
import { UploadAd } from './views/UploadAd';
import { KycForm } from './views/KycForm';
import { ReviewAndPay } from './views/ReviewAndPay';
import { ConfirmationPage } from './views/ConfirmationPage';
import { Dashboard } from './views/Dashboard';
import { Header } from './components/Header';

const App: React.FC = () => {
  const [step, setStep] = useState<CampaignStep>(CampaignStep.LANDING);
  const [campaign, setCampaign] = useState<Partial<Campaign>>({});
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);

  const updateCampaign = (data: Partial<Campaign>) => {
    setCampaign(prev => ({ ...prev, ...data }));
  };

  const finalizeCampaign = () => {
    const newCampaign: Campaign = {
        id: `ET-AD-${Math.floor(10000 + Math.random() * 90000)}`,
        status: 'Pending Approval',
        ...campaign
    } as Campaign;
    setAllCampaigns(prev => [...prev, newCampaign]);
    setStep(CampaignStep.CONFIRMATION);
  }

  const startNewCampaign = () => {
    setCampaign({});
    setStep(CampaignStep.CHOOSER);
  }

  const renderStep = () => {
    switch (step) {
      case CampaignStep.LANDING:
        return <LandingPage setStep={setStep} />;
      case CampaignStep.CHOOSER:
        return <BillboardChooser setStep={setStep} updateCampaign={updateCampaign} />;
      case CampaignStep.UPLOAD:
        return <UploadAd setStep={setStep} updateCampaign={updateCampaign} campaign={campaign} />;
      case CampaignStep.KYC:
        return <KycForm setStep={setStep} updateCampaign={updateCampaign} campaign={campaign} />;
      case CampaignStep.REVIEW:
        // Use a different function for the confirmation step to finalize and add to list
        return <ReviewAndPay setStep={finalizeCampaign} campaign={campaign} />;
      case CampaignStep.CONFIRMATION:
        return <ConfirmationPage setStep={setStep} campaign={campaign} startNewCampaign={startNewCampaign} />;
      case CampaignStep.DASHBOARD:
        return <Dashboard campaigns={allCampaigns} />;
      default:
        return <LandingPage setStep={setStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header setStep={setStep} />
      <main>
        {renderStep()}
      </main>
      <footer className="text-center p-8 mt-12 border-t border-slate-800 text-slate-500">
        <p>&copy; {new Date().getFullYear()} Ethio Telecom. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
