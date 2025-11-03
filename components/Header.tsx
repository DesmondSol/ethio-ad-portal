
import React from 'react';
import { CampaignStep } from '../types';

interface HeaderProps {
    setStep: (step: CampaignStep) => void;
}

export const Header: React.FC<HeaderProps> = ({ setStep }) => {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm p-4 sticky top-0 z-50 border-b border-slate-700">
            <div className="container mx-auto flex justify-between items-center">
                <div 
                    className="text-2xl font-bold text-emerald-400 cursor-pointer"
                    onClick={() => setStep(CampaignStep.LANDING)}
                >
                    Ethio Ad Portal
                </div>
                <nav className="flex items-center space-x-4">
                    <button 
                        onClick={() => setStep(CampaignStep.DASHBOARD)} 
                        className="text-slate-300 hover:text-white transition-colors"
                    >
                        Dashboard
                    </button>
                    <button 
                        onClick={() => setStep(CampaignStep.CHOOSER)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        New Campaign
                    </button>
                </nav>
            </div>
        </header>
    );
};
