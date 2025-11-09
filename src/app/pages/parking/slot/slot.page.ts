import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { Subscription } from "rxjs";
import { SupabaseService, ParkingSpot } from "../../../services/supabase.service";

@Component({
  selector: "app-slot",
  templateUrl: "./slot.page.html",
  styleUrls: ["./slot.page.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SlotPage implements OnInit, OnDestroy {
  parkingSpots: any[] = [];
  private sub!: Subscription;

  constructor(private supabaseService: SupabaseService) {}

  async ngOnInit() {
    // โหลดข้อมูลเริ่มต้น
    await this.supabaseService.fetchSpots();

    // ✅ Subscribe เพื่ออัปเดตแบบ Realtime
    this.sub = this.supabaseService.spots$.subscribe((spots) => {
      this.parkingSpots = spots.map((s) => ({
        ...s,
        isLocked: this.isSpotLocked(s),
        statusText: this.getStatusText(s),
      }));
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  // --- Logic เดิม ---
  isSpotLocked(spot: any): boolean {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const hour = now.getHours();
    const isWeekday = day >= 1 && day <= 6;
    const isLockedTime = hour >= 0 && hour < 24; // ✅ เที่ยงคืน - 6 โมงเช้า

    if (spot.type === "teacher" && isWeekday && isLockedTime) {
      return true;
    }
    return false;
  }

  getStatusText(spot: any): string {
    if (this.isSpotLocked(spot)) return "ล็อก (00.00 - 06.00)";
    return "ว่าง";
  }

  getSpotColor(spot: any): string {
    return this.isSpotLocked(spot) ? "danger" : "success";
  }
}
