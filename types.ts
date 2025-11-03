
export enum CampaignStep {
  LANDING,
  CHOOSER,
  UPLOAD,
  KYC,
  REVIEW,
  CONFIRMATION,
  DASHBOARD,
}

export enum RoadType {
  PRIME = 'Prime',
  SECONDARY = 'Secondary',
}

export enum TimeSlotType {
    PEAK = 'Peak',
    OFF_PEAK = 'Off-Peak',
}

export interface BillboardLocation {
  id: number;
  name: string;
  roadType: RoadType;
  coords: { top: string; left: string };
  rates: {
    [TimeSlotType.PEAK]: number;
    [TimeSlotType.OFF_PEAK]: number;
  };
}

export interface SelectedSlot {
  locationId: number;
  date: string;
  time: string; // e.g., "07:00"
  slotType: TimeSlotType;
  cost: number;
}

export enum AdvertiserType {
  BUSINESS = 'Registered Business',
  INDIVIDUAL = 'Individual / Sole Proprietor',
}

export interface KycDetails {
  advertiserType: AdvertiserType;
  fullName?: string;
  businessName?: string;
  tinNumber: string;
  tradeLicense?: File;
  representativeLetter?: File;
  governmentId?: File;
}

export interface Campaign {
  id: string;
  campaignName: string;
  advertiserName: string;
  selectedSlots: SelectedSlot[];
  adContent: File | null;
  kycDetails: KycDetails | null;
  totalCost: number;
  status: 'Pending Approval' | 'Active' | 'Completed' | 'Rejected';
}
