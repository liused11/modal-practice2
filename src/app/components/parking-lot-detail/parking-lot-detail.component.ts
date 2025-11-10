import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ParkingLot } from '../../pages/parking.modal/parking.modal.page';
                                                  // (ชี้ไปที่ไฟล์ parking.modal.page.ts ที่คุณมี interface)

@Component({
  selector: 'app-parking-lot-detail',
  templateUrl: './parking-lot-detail.component.html',
  styleUrls: ['./parking-lot-detail.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule], // 👈 เพิ่ม imports
})
export class ParkingLotDetailComponent implements OnInit {

  // 1. รับข้อมูลที่จอดรถที่ถูกส่งเข้ามา
  @Input() lot!: ParkingLot; // 👈 ใช้ ! เพื่อบอกว่าค้านี้จะถูกส่งมาแน่นอน

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // สามารถ Log ดูได้ว่าข้อมูลมาจริง
    console.log('Modal detail opened with data:', this.lot);
  }

  // 2. ฟังก์ชันสำหรับปิด Modal
  dismiss() {
    this.modalCtrl.dismiss();
  }

  // (Optional) เอา Helper Functions บางส่วนจากหน้าหลักมาใช้
  getStatusColorClass(status: string): string {
    switch (status) {
      case 'available': return 'text-blue-600';
      case 'low': return 'text-yellow-600';
      case 'full': return 'text-red-600';
      case 'closed': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'available': return 'ว่าง';
      case 'low': return 'ว่างน้อย';
      case 'full': return 'เต็ม';
      case 'closed': return 'ปิด';
      default: return 'ไม่ทราบ';
    }
  }
}