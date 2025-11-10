import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule, ModalController } from "@ionic/angular";
import { ParkingLotDetailComponent } from "src/app/components/parking-lot-detail/parking-lot-detail.component";

export interface ParkingLot {
  id: string;
  name: string;
  available: number | null; // null หมายถึงข้อมูลไม่มา หรือ "เต็ม" แบบไม่มีตัวเลข
  capacity: number;
  mapX: number; // ตำแหน่งแกน X บนแผนที่ (สำหรับ Mock)
  mapY: number; // ตำแหน่งแกน Y บนแผนที่ (สำหรับ Mock)
  status: 'available' | 'full' | 'closed' | 'low'; // สถานะหลัก
  isBookmarked: boolean;
  distance: number;
  hours: string;
  hasEVCharger: boolean;
  userTypes: string;
  price: number;
  priceUnit: string;
  type: 'normal' | 'ev' | 'motorcycle'; // สำหรับกรองตาม Tab
}

@Component({
  selector: "app-parking.modal",
  templateUrl: "./parking.modal.page.html",
  styleUrls: ["./parking.modal.page.scss"],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ParkingLotDetailComponent
,
  ],
})
export class ParkingModalPage implements OnInit {
  // --- 2. Properties ที่ผูกกับ HTML ---
  searchQuery: string = "";
  selectedFilter: string = "car";
  selectedTab: string = "normal"; // Tab เริ่มต้น
  activeNav: string = "search"; // Nav-bar เริ่มต้น

  allParkingLots: ParkingLot[] = []; // ข้อมูลที่จอดรถทั้งหมด (จาก Mock)
  visibleParkingLots: ParkingLot[] = []; // ที่จอดรถสำหรับแสดงบนแผนที่
  filteredParkingLots: ParkingLot[] = []; // ที่จอดรถสำหรับแสดงในรายการ

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // เมื่อ Component โหลด ให้ดึงข้อมูล Mock
    this.allParkingLots = this.getMockData();
    // กรองข้อมูลเพื่อแสดงผลครั้งแรก
    this.filterData();
  }

  // --- 3. Mock Data (ข้อมูลจำลอง) ---
  getMockData(): ParkingLot[] {
    return [
      {
        id: "s2",
        name: "ลานจอดรถ 14 ชั้น (S2) อันนี้กดไปแล้วเปิด modal ใหม่ออกมา",
        available: 317,
        capacity: 366,
        mapX: 150,
        mapY: 100,
        status: "available",
        isBookmarked: true,
        distance: 230,
        hours: "เปิดอยู่ - ปิด 24:00 น.",
        hasEVCharger: true,
        userTypes: "นศ., บุคลากร, ภายนอก",
        price: 10,
        priceUnit: "ต่อชั่วโมง",
        type: "normal",
      },
      {
        id: "n16",
        name: "อาคารเรียนรวม (N16)",
        available: 40,
        capacity: 150,
        mapX: 250,
        mapY: 180,
        status: "low",
        isBookmarked: false,
        distance: 450,
        hours: "ใกล้ปิด - ปิด 20:00 น.",
        hasEVCharger: false,
        userTypes: "นศ., บุคลากร",
        price: 10,
        priceUnit: "ต่อชั่วโมง",
        type: "normal",
      },
      {
        id: "s9",
        name: "คณะพลังงาน (S9)",
        available: 0,
        capacity: 50,
        mapX: 100,
        mapY: 220,
        status: "full",
        isBookmarked: false,
        distance: 450,
        hours: "เปิดอยู่ - ปิด 24:00 น.",
        hasEVCharger: false,
        userTypes: "บุคลากร",
        price: 10,
        priceUnit: "ต่อชั่วโมง",
        type: "normal",
      },
      {
        id: "ev1",
        name: "S2 - EV Charger",
        available: 8,
        capacity: 10,
        mapX: 155,
        mapY: 110,
        status: "available",
        isBookmarked: false,
        distance: 230,
        hours: "เปิดอยู่ - ปิด 24:00 น.",
        hasEVCharger: true,
        userTypes: "ทั้งหมด",
        price: 15,
        priceUnit: "ต่อชั่วโมง",
        type: "ev",
      },
      // เพิ่มข้อมูล EV และ Motorcycle
      {
        id: "mc1",
        name: "ที่จอดมอเตอร์ไซค์ (ใต้ S2)",
        available: 50,
        capacity: 200,
        mapX: 140,
        mapY: 120,
        status: "available",
        isBookmarked: false,
        distance: 240,
        hours: "เปิดอยู่ - ปิด 24:00 น.",
        hasEVCharger: false,
        userTypes: "ทั้งหมด",
        price: 5,
        priceUnit: "ต่อวัน",
        type: "motorcycle",
      },
    ];
  }

  // --- 4. Logic กรองข้อมูล ---
  filterData() {
    // 1. กรองตาม Tab (normal, ev, motorcycle)
    this.filteredParkingLots = this.allParkingLots.filter((lot) =>
      lot.type === this.selectedTab
    );

    // 2. กรองตามคำค้นหา (Search Query)
    if (this.searchQuery && this.searchQuery.trim() !== "") {
      this.filteredParkingLots = this.filteredParkingLots.filter((lot) =>
        lot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // 3. กำหนดข้อมูลสำหรับแผนที่ (ในตัวอย่างนี้ เอามาแค่ 3 อันแรก)
    this.visibleParkingLots = this.allParkingLots.slice(0, 3);
  }

  // --- 5. ฟังก์ชันที่ถูกเรียกจาก HTML ---
  onSearch() {
    this.filterData();
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    console.log("Filter selected:", filter);
    // ใส่ Logic การกรองเพิ่มเติมสำหรับ "ที่จอดรถ" vs "อาคาร"
  }

  async viewLotDetails(lot: ParkingLot) {
    console.log("View details for:", lot.name);

    // 1. สร้าง Modal ใหม่
    const modal = await this.modalCtrl.create({
      component: ParkingLotDetailComponent, // 👈 ใช้ Component ใหม่
      componentProps: {
        lot: lot, // 👈 ส่งข้อมูล 'lot' ทั้งก้อนเข้าไป
      },
      // 2. ทำให้เป็น Bottom Sheet แบบ Google Maps
      initialBreakpoint: 0.5,    // 👈 เริ่มต้นที่ครึ่งจอ
      breakpoints: [0, 0.5, 0.9], // 👈 สามารถย่อสุด, ครึ่งจอ, เกือบเต็มจอ
      backdropDismiss: true,     // 👈 แตะพื้นหลังเพื่อปิด
      cssClass: 'detail-sheet-modal' // 👈 (Optional) เผื่ออยากแต่ง CSS เพิ่ม
    });

    // 3. แสดง Modal
    await modal.present();
  }

  toggleSheet() {
    console.log("Toggle sheet");
    // ในแอปจริง คุณจะต้องใช้ GestureController หรือตัวแปร boolean
    // เพื่อควบคุมการเปิด/ปิด Bottom Sheet
  }

  onTabChange() {
    this.filterData(); // กรองข้อมูลใหม่เมื่อเปลี่ยน Tab
  }

  navigateTo(page: string) {
    this.activeNav = page;
    console.log("Navigate to:", page);
    // ใส่ Logic การเปลี่ยนหน้า (Routing) จริงๆ ที่นี่
  }

  // --- 6. Helper Functions สำหรับ Style ---
  getMarkerColorClass(available: number | null, capacity: number): string {
    if (available === null || available === 0) {
      return "bg-red-600"; // เต็ม
    }
    const percentage = (available / capacity) * 100;
    if (percentage < 20) {
      return "bg-yellow-500"; // ว่างน้อย
    }
    return "bg-blue-600"; // ว่าง (สถานะปกติ)
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case "available":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-yellow-100 text-yellow-800";
      case "full":
        return "bg-red-100 text-red-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case "available":
        return "ว่าง";
      case "low":
        return "ว่างน้อย";
      case "full":
        return "เต็ม";
      case "closed":
        return "ปิด";
      default:
        return "ไม่ทราบ";
    }
  }

  
}
