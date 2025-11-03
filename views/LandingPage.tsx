
import React from 'react';
import { CampaignStep } from '../types';
import { AffordableIcon, InstantBookingIcon, TotalControlIcon, WideReachIcon } from '../components/Icons';

interface LandingPageProps {
  setStep: (step: CampaignStep) => void;
}

const ValueProp: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="bg-slate-800 p-4 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="font-bold text-lg text-emerald-400 mb-2">{title}</h3>
    <p className="text-slate-400">{children}</p>
  </div>
);

const HowItWorksStep: React.FC<{ step: string; title: string; children: React.ReactNode }> = ({ step, title, children }) => (
    <div className="relative flex-1 p-8 bg-slate-800 rounded-xl shadow-lg">
        <div className="absolute -top-5 -left-5 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {step}
        </div>
        <h3 className="font-bold text-2xl text-white mb-2">{title}</h3>
        <p className="text-slate-400">{children}</p>
    </div>
);


export const LandingPage: React.FC<LandingPageProps> = ({ setStep }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative text-center py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.3),rgba(255,255,255,0))]"></div>
        <div className="relative z-10 container mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
            Advertise to Millions on the Move. <span className="text-emerald-400">Instantly.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Ethio Telecom's Digital Billboards. Book by Location, Time, and Date. Pay with Telebirr.
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button 
              onClick={() => setStep(CampaignStep.CHOOSER)}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
              Start Your Ad Campaign
            </button>
            <button className="bg-transparent border border-slate-600 hover:bg-slate-800 text-slate-300 font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              View Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* Value Propositions Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueProp icon={<WideReachIcon className="w-8 h-8 text-emerald-400" />} title="Wide Reach">
              Major roads in Addis Ababa and beyond.
            </ValueProp>
            <ValueProp icon={<TotalControlIcon className="w-8 h-8 text-emerald-400" />} title="Total Control">
              Choose exactly when and where your ad plays.
            </ValueProp>
            <ValueProp icon={<AffordableIcon className="w-8 h-8 text-emerald-400" />} title="Affordable & Flexible">
              Budget-friendly options for all businesses.
            </ValueProp>
            <ValueProp icon={<InstantBookingIcon className="w-8 h-8 text-emerald-400" />} title="Instant Booking & Payment">
              No lengthy contracts. Go live in minutes.
            </ValueProp>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
        <section className="py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Go Live in 3 Simple Steps</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-12">Our self-service portal makes launching your ad campaign easier than ever.</p>
                <div className="flex flex-col md:flex-row gap-16 md:gap-8 items-stretch">
                    <HowItWorksStep step="1" title="Choose">
                        Select billboard locations and time slots from our interactive map.
                    </HowItWorksStep>
                    <HowItWorksStep step="2" title="Upload & Pay">
                        Submit your ad content and pay securely using Telebirr.
                    </HowItWorksStep>
                    <HowItWorksStep step="3" title="Go Live">
                        Your ad airs on your scheduled times, reaching thousands of potential customers.
                    </HowItWorksStep>
                </div>
            </div>
        </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold text-slate-400 mb-6">TRUSTED BY LEADING ETHIOPIAN BUSINESSES</h3>
          <div className="flex justify-center items-center space-x-8 md:space-x-12 opacity-60">
            <span className="font-bold text-2xl">Local Restaurant</span>
            <span className="font-bold text-2xl">Event Organizer</span>
            <span className="font-bold text-2xl">SME Corp</span>
          </div>
        </div>
      </section>
    </div>
  );
};
