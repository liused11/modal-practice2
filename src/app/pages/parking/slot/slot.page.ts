import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular"; // ทั้งหมดจำๆ
import { Observable } from "rxjs";
import {
  ParkingSpot,
  SupabaseService,
} from "../../../services/supabase.service";

@Component({
  selector: "app-slot",
  templateUrl: "./slot.page.html",
  styleUrls: ["./slot.page.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SlotPage implements OnInit {
  parkingSpots$!: Observable<ParkingSpot[]>;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // 1. รับ Observable จาก property `spots$` โดยตรง
    this.parkingSpots$ = this.supabaseService.spots$;

    // 2. เรียกใช้ `fetchSpots()` เพื่อดึงข้อมูลครั้งแรก
    this.supabaseService.fetchSpots();
  }
}