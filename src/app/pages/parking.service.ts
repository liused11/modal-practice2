// src/app/services/parking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParkingLotStatic, ParkingLotRealtime, ParkingLotViewModel } from '../pages/parking.modal';
// อย่าลืม import Supabase client
// import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  // private supabase: SupabaseClient;
  // ... (setup supabase)

  constructor(private http: HttpClient) { }

  // 1. โหลดข้อมูล Static จากไฟล์ JSON
  getStaticParkingData(): Observable<ParkingLotStatic[]> {
    // ในตัวอย่างนี้ ผมใช้ข้อมูลจาก JSON ที่คุณให้มาโดยตรง
    // แต่ในแอปจริง คุณควรย้าย parking_lots ไปไว้ใน assets/parking_data.json
    // return this.http.get<ParkingLotStatic[]>('/assets/parking_data.json');
    
    // จำลองการโหลด (ใช้ข้อมูลที่คุณส่งมา)
    const staticData = [{
      "id": "lot_s2_14fl",
      "site_id": "site_kmutt_main",
      "revision": 5,
      "name": "ลานจอดรถ 14 ชั้น (S2)",
      "description": "พื้นที่จอดรถ S2 เป็นลานจอดรถหลัก...",
      "location": { "latitude": 13.6504, "longitude": 100.4939, "geohash": "w4u1r3c4x" },
      "distance_meters": 230,
      "vehicle_support": { "car": true, "car_ev": true, "motorcycle": false },
      "facilities": { "ev_charger": { "available": true, "charger_count": 10, "charger_type": ["Type 2"] }, "cctv": true, "security_guard": true },
      "operating_hours": { "display_text": "เปิดอยู่ - ปิด 24:00 น.", "schedule": [], "grace_period_minutes": 15, "max_parking_duration_hours": 24 },
      "user_types": ["student", "staff", "visitor"],
      "user_types_display": "นักศึกษา, บุคลากร, บุคคลภายนอก",
      "user_type_rules": [],
      "overnight_policy": { "allowed": true, "flat_fee": 50, "cut_off_time": "00:00", "end_time": "05:00" },
      "pricing_rules": {
        "currency": "THB",
        "default": {
          "display_name": "ทั่วไป (ไม่ประทับตรา)",
          "tiers": [
            { "from_hours_exclusive": 0, "to_hours_inclusive": 1, "rate_type": "free", "rate_value": 0, "display_text": "ฟรี 1 ชั่วโมง" },
            { "from_hours_exclusive": 1, "to_hours_inclusive": 3, "rate_type": "per_hour", "rate_value": 10, "display_text": "ชั่วโมงที่ 1-3: 10 บาท/ชม." }
          ]
        },
        "stamp_levels": []
      },
      "reservation": { "enabled": true, "max_duration_hours": 4, "allow_extend": true },
      "note": "รองรับผู้มาติดต่อมหาวิทยาลัย"
    }];
    return of(staticData as ParkingLotStatic[]);
  }

  // 2. จำลองการดึงข้อมูล Realtime จาก Supabase
  getRealtimeParkingData(): Observable<ParkingLotRealtime[]> {
    // ในแอปจริง:
    // 1. query ตาราง parking_lot_realtime
    // 2. ใช้ this.supabase.channel('...').on('...').subscribe(...)
    // 3. return เป็น Observable (เช่น BehaviorSubject)
    
    // จำลองข้อมูลกลับ
    const realtimeData: ParkingLotRealtime[] = [
      {
        "lot_id": "lot_s2_14fl",
        "status": "available",
        "display_text": "ว่าง",
        "available_spots": 317,
        "last_update_timestamp": "2025-10-21T16:54:00+07:00"
      }
      // ... (ข้อมูล lot อื่นๆ)
    ];
    return of(realtimeData);
  }

  // 3. รวมข้อมูล 2 แหล่งให้เป็น ViewModel
  getParkingLotViewModels(): Observable<ParkingLotViewModel[]> {
    return combineLatest([
      this.getStaticParkingData(),
      this.getRealtimeParkingData()
    ]).pipe(
      map(([staticLots, realtimeLots]) => {
        // สร้าง lookup map เพื่อให้ join ข้อมูลได้เร็ว
        const realtimeMap = new Map<string, ParkingLotRealtime>(
          realtimeLots.map(rt => [rt.lot_id, rt])
        );

        return staticLots.map(staticLot => {
          const realtimeStatus = realtimeMap.get(staticLot.id);
          
          // ลบ status_info (ถ้ามี) ออกจาก staticLot
          const { ...restOfStatic } = staticLot;

          return {
            ...restOfStatic, // ข้อมูล static ทั้งหมด
            id: staticLot.id, // ต้องมั่นใจว่า id ถูกส่งไปด้วย
            status_info: realtimeStatus // ข้อมูล realtime ที่อัปเดต
          } as ParkingLotViewModel;
        });
      })
    );
  }
}