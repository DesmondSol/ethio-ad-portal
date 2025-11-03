
import { BillboardLocation, RoadType, TimeSlotType } from './types';

export const BILLBOARD_LOCATIONS: BillboardLocation[] = [
  { id: 1, name: 'Bole Rd', roadType: RoadType.PRIME, coords: { top: '55%', left: '60%' }, rates: { [TimeSlotType.PEAK]: 1200, [TimeSlotType.OFF_PEAK]: 700 } },
  { id: 2, name: 'Mexico Square', roadType: RoadType.PRIME, coords: { top: '45%', left: '40%' }, rates: { [TimeSlotType.PEAK]: 1100, [TimeSlotType.OFF_PEAK]: 650 } },
  { id: 3, name: 'Piassa', roadType: RoadType.PRIME, coords: { top: '30%', left: '35%' }, rates: { [TimeSlotType.PEAK]: 1000, [TimeSlotType.OFF_PEAK]: 600 } },
  { id: 4, name: 'Megenagna', roadType: RoadType.SECONDARY, coords: { top: '40%', left: '75%' }, rates: { [TimeSlotType.PEAK]: 800, [TimeSlotType.OFF_PEAK]: 500 } },
  { id: 5, name: 'Saris', roadType: RoadType.SECONDARY, coords: { top: '80%', left: '30%' }, rates: { [TimeSlotType.PEAK]: 750, [TimeSlotType.OFF_PEAK]: 450 } },
  { id: 6, name: 'Ayat', roadType: RoadType.SECONDARY, coords: { top: '25%', left: '85%' }, rates: { [TimeSlotType.PEAK]: 700, [TimeSlotType.OFF_PEAK]: 400 } },
];

export const TIME_SLOTS: { time: string, type: TimeSlotType }[] = [
    { time: '06:00', type: TimeSlotType.PEAK }, { time: '07:00', type: TimeSlotType.PEAK }, { time: '08:00', type: TimeSlotType.PEAK }, { time: '09:00', type: TimeSlotType.PEAK },
    { time: '10:00', type: TimeSlotType.OFF_PEAK }, { time: '11:00', type: TimeSlotType.OFF_PEAK }, { time: '12:00', type: TimeSlotType.OFF_PEAK }, { time: '13:00', type: TimeSlotType.OFF_PEAK },
    { time: '14:00', type: TimeSlotType.OFF_PEAK }, { time: '15:00', type: TimeSlotType.OFF_PEAK }, { time: '16:00', type: TimeSlotType.PEAK }, { time: '17:00', type: TimeSlotType.PEAK },
    { time: '18:00', type: TimeSlotType.PEAK }, { time: '19:00', type: TimeSlotType.PEAK }, { time: '20:00', type: TimeSlotType.PEAK }, { time: '21:00', type: TimeSlotType.PEAK },
    { time: '22:00', type: TimeSlotType.OFF_PEAK },
];
