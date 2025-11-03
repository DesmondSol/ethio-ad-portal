
import React, { useState, useMemo } from 'react';
import { Campaign, CampaignStep, SelectedSlot, BillboardLocation, TimeSlotType, RoadType } from '../types';
import { BILLBOARD_LOCATIONS, TIME_SLOTS } from '../constants';

interface BillboardChooserProps {
  setStep: (step: CampaignStep) => void;
  updateCampaign: (data: Partial<Campaign>) => void;
}

const today = new Date().toISOString().split('T')[0];

export const BillboardChooser: React.FC<BillboardChooserProps> = ({ setStep, updateCampaign }) => {
  const [selectedLocations, setSelectedLocations] = useState<Set<number>>(new Set());
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());
  const [roadFilter, setRoadFilter] = useState<RoadType | 'ALL'>('ALL');

  const handleLocationToggle = (id: number) => {
    setSelectedLocations(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleTimeToggle = (time: string) => {
    setSelectedTimes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(time)) {
        newSet.delete(time);
      } else {
        newSet.add(time);
      }
      return newSet;
    });
  };

  const { slots, totalCost } = useMemo(() => {
    const calculatedSlots: SelectedSlot[] = [];
    if (selectedLocations.size === 0 || selectedTimes.size === 0 || !selectedDate) {
      return { slots: [], totalCost: 0 };
    }

    BILLBOARD_LOCATIONS.forEach(loc => {
      if (selectedLocations.has(loc.id)) {
        const timeSlotInfo = TIME_SLOTS.find(ts => selectedTimes.has(ts.time));
        if (timeSlotInfo) {
          selectedTimes.forEach(time => {
            const slotType = TIME_SLOTS.find(t => t.time === time)?.type || TimeSlotType.OFF_PEAK;
            const cost = loc.rates[slotType];
            calculatedSlots.push({
              locationId: loc.id,
              date: selectedDate,
              time: time,
              slotType,
              cost
            });
          });
        }
      }
    });

    const cost = calculatedSlots.reduce((sum, slot) => sum + slot.cost, 0);
    return { slots: calculatedSlots, totalCost: cost };
  }, [selectedLocations, selectedDate, selectedTimes]);

  const filteredLocations = useMemo(() => {
    if (roadFilter === 'ALL') return BILLBOARD_LOCATIONS;
    return BILLBOARD_LOCATIONS.filter(loc => loc.roadType === roadFilter);
  }, [roadFilter]);

  const proceed = () => {
    updateCampaign({ selectedSlots: slots, totalCost });
    setStep(CampaignStep.UPLOAD);
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Billboard Chooser & Rate Calculator</h1>
      <p className="text-slate-400 mb-8">Select locations, dates, and times to build your campaign.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Location Selection */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl mb-8">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Step 1: Select Locations</h2>
            <div className="flex items-center space-x-4 mb-4">
              <span className="font-semibold">Filter by Road Type:</span>
              <button onClick={() => setRoadFilter('ALL')} className={`px-3 py-1 rounded-full text-sm ${roadFilter === 'ALL' ? 'bg-emerald-500 text-white' : 'bg-slate-700'}`}>All</button>
              <button onClick={() => setRoadFilter(RoadType.PRIME)} className={`px-3 py-1 rounded-full text-sm ${roadFilter === RoadType.PRIME ? 'bg-emerald-500 text-white' : 'bg-slate-700'}`}>{RoadType.PRIME}</button>
              <button onClick={() => setRoadFilter(RoadType.SECONDARY)} className={`px-3 py-1 rounded-full text-sm ${roadFilter === RoadType.SECONDARY ? 'bg-emerald-500 text-white' : 'bg-slate-700'}`}>{RoadType.SECONDARY}</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Map View */}
              <div className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden border-2 border-slate-600">
                <img src="https://picsum.photos/seed/addis/800/450" alt="Map of Addis Ababa" className="w-full h-full object-cover opacity-30"/>
                {BILLBOARD_LOCATIONS.map(loc => (
                  <button 
                    key={loc.id} 
                    onClick={() => handleLocationToggle(loc.id)}
                    style={{ top: loc.coords.top, left: loc.coords.left }}
                    className={`absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${selectedLocations.has(loc.id) ? 'bg-yellow-400 scale-150 ring-2 ring-white' : 'bg-emerald-500'}`}
                    title={loc.name}
                  />
                ))}
              </div>
              {/* List View */}
              <div className="max-h-52 overflow-y-auto pr-2">
                {filteredLocations.map(loc => (
                  <div key={loc.id} onClick={() => handleLocationToggle(loc.id)} className={`flex justify-between items-center p-3 rounded-lg cursor-pointer mb-2 transition-colors ${selectedLocations.has(loc.id) ? 'bg-emerald-500/20' : 'bg-slate-700 hover:bg-slate-600'}`}>
                    <div>
                      <span className="font-semibold">{loc.name}</span>
                      <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${loc.roadType === RoadType.PRIME ? 'bg-yellow-500/20 text-yellow-300' : 'bg-sky-500/20 text-sky-300'}`}>{loc.roadType}</span>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 ${selectedLocations.has(loc.id) ? 'bg-emerald-500 border-emerald-400' : 'border-slate-500'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Date & Time Selection */}
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-emerald-400">Step 2: Select Date & Time</h2>
            <div className="mb-4">
              <label htmlFor="campaign-date" className="block font-semibold mb-2">Campaign Date</label>
              <input type="date" id="campaign-date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={today} className="bg-slate-700 p-2 rounded-lg w-full md:w-1/2"/>
            </div>
            <div>
              <label className="block font-semibold mb-2">Time Slots</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {TIME_SLOTS.map(({ time, type }) => (
                  <button key={time} onClick={() => handleTimeToggle(time)} className={`p-2 text-center rounded-lg text-sm transition-colors ${selectedTimes.has(time) ? 'bg-emerald-500 text-white font-bold' : type === TimeSlotType.PEAK ? 'bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-200' : 'bg-sky-500/20 hover:bg-sky-500/40 text-sky-200'}`}>
                    {time}
                    <span className="block text-xs opacity-70">{type}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rate Calculator */}
        <div className="lg:col-span-1">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl sticky top-24">
                <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Campaign Summary</h2>
                {slots.length === 0 ? (
                    <p className="text-slate-400">Please select locations and time slots to see the estimated cost.</p>
                ) : (
                    <div className="max-h-80 overflow-y-auto pr-2 mb-4">
                        {Array.from(selectedLocations).map(locId => {
                            const location = BILLBOARD_LOCATIONS.find(l => l.id === locId);
                            const locationSlots = slots.filter(s => s.locationId === locId);
                            const locationCost = locationSlots.reduce((sum, s) => sum + s.cost, 0);
                            if (!location || locationSlots.length === 0) return null;
                            return (
                                <div key={locId} className="mb-3">
                                    <h3 className="font-semibold text-emerald-400">{location.name}</h3>
                                    <p className="text-sm text-slate-300">{locationSlots.length} slots @ {locationCost.toLocaleString()} ETB</p>
                                </div>
                            );
                        })}
                    </div>
                )}
                <div className="border-t border-slate-700 pt-4 mt-4">
                    <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Total Cost:</span>
                        <span>{totalCost.toLocaleString()} ETB</span>
                    </div>
                    <button 
                        onClick={proceed}
                        disabled={totalCost === 0}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg mt-6 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                        Proceed to Upload Ad
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
