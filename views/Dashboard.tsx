
import React, { useState } from 'react';
import { Campaign } from '../types';
import { BILLBOARD_LOCATIONS } from '../constants';

interface DashboardProps {
  campaigns: Campaign[];
}

type Tab = 'Active' | 'Pending' | 'History' | 'Analytics' | 'Billing' | 'Profile';

const CampaignCard: React.FC<{ campaign: Campaign }> = ({ campaign }) => (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-emerald-500/10 transition-shadow">
        <div className="flex justify-between items-start">
            <div>
                <h3 className="text-xl font-bold text-white">{campaign.campaignName}</h3>
                <p className="text-sm text-slate-400">ID: {campaign.id}</p>
            </div>
            <span className={`px-3 py-1 text-sm rounded-full font-semibold ${
                campaign.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                campaign.status === 'Pending Approval' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-slate-600 text-slate-300'
            }`}>{campaign.status}</span>
        </div>
        <div className="mt-4 border-t border-slate-700 pt-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-slate-400">Total Cost</p>
                    <p className="font-semibold text-lg">{campaign.totalCost.toLocaleString()} ETB</p>
                </div>
                <div>
                    <p className="text-slate-400">Slots Booked</p>
                    <p className="font-semibold text-lg">{campaign.selectedSlots.length}</p>
                </div>
                 <div>
                    <p className="text-slate-400">Locations</p>
                    <p className="font-semibold">
                        {[...new Set(campaign.selectedSlots.map(s => BILLBOARD_LOCATIONS.find(l => l.id === s.locationId)?.name))].join(', ')}
                    </p>
                </div>
                 <div>
                    <p className="text-slate-400">Date Range</p>
                    <p className="font-semibold">
                        {[...new Set(campaign.selectedSlots.map(s => s.date))].sort().join(' to ')}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ campaigns }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Pending');

  const tabs: Tab[] = ['Active', 'Pending', 'History', 'Analytics', 'Billing', 'Profile'];

  const renderContent = () => {
    switch (activeTab) {
      case 'Active':
      case 'Pending':
      case 'History':
        const filteredCampaigns = campaigns.filter(c => {
            if(activeTab === 'Active') return c.status === 'Active';
            if(activeTab === 'Pending') return c.status === 'Pending Approval';
            if(activeTab === 'History') return c.status === 'Completed' || c.status === 'Rejected';
            return false;
        });
        if (filteredCampaigns.length === 0) {
            return <div className="text-center p-12 bg-slate-800 rounded-lg"><p className="text-slate-400">No campaigns in this category.</p></div>
        }
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCampaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
        </div>;
      case 'Analytics':
        return <div className="text-center p-12 bg-slate-800 rounded-lg"><p className="text-slate-400">Detailed analytics are coming soon.</p></div>;
      case 'Billing':
        return <div className="text-center p-12 bg-slate-800 rounded-lg"><p className="text-slate-400">Billing history will be available here.</p></div>;
      case 'Profile':
        return <div className="text-center p-12 bg-slate-800 rounded-lg"><p className="text-slate-400">You can view and edit your KYC information here.</p></div>;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <nav className="flex-shrink-0 md:w-48">
          <ul className="space-y-2">
            {tabs.map(tab => (
              <li key={tab}>
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left font-semibold p-3 rounded-lg transition-colors ${
                    activeTab === tab ? 'bg-emerald-500 text-white' : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
