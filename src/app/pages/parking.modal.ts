// src/app/models/parking.model.ts

// 1. Interface สำหรับข้อมูล Realtime จาก Supabase
export interface ParkingLotRealtime {
  lot_id: string;
  available_spots: number;
  status: 'available' | 'full' | 'closed' | 'closing_soon';
  display_text: string;
  last_update_timestamp: string;
}

// 2. Interface สำหรับข้อมูล Static (จากไฟล์ JSON ใน assets)
// (นี่คือโครงสร้างจากไฟล์ parking_lots.json ของคุณ)
export interface ParkingLotStatic {
  id: string;
  site_id: string;
  revision: number;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    geohash: string;
  };
  distance_meters: number;
  vehicle_support: {
    car: boolean;
    car_ev: boolean;
    motorcycle: boolean;
  };
  // status_info จะถูกแทนที่ด้วยข้อมูล Realtime
  // status_info: { ... }; 
  facilities: {
    ev_charger: {
      available: boolean;
      charger_count: number;
      charger_type: string[];
    };
    cctv: boolean;
    security_guard: boolean;
  };
  operating_hours: {
    display_text: string;
    // ... อื่นๆ
  };
  user_types_display: string;
  pricing_rules: {
    currency: string;
    default: {
      display_name: string;
      tiers: PricingTier[];
    };
    stamp_levels: any[]; // (ขอย่อ)
  };
  reservation: {
    enabled: boolean;
    max_duration_hours: number;
    allow_extend: boolean;
  };
  note: string;
}

export interface PricingTier {
  from_hours_exclusive: number;
  to_hours_inclusive: number | null;
  rate_type: string;
  rate_value: number;
  display_text: string;
}

// 3. View Model: ข้อมูลที่ใช้แสดงผลจริง (รวมร่าง Static + Realtime)
export interface ParkingLotViewModel extends Omit<ParkingLotStatic, 'id'> {
  // เราจะรวม status_info จาก Realtime เข้ามา
  status_info: ParkingLotRealtime; 
}