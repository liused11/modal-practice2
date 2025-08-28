import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular'; // << ใช้ตรงนี้
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class MainPage implements OnInit {

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }


  async openModalInformation(): Promise<void> {
		const modal = await this.modalController.create({
			component: ModalComponent,
			cssClass: "modal-fullscreen",
			showBackdrop: false,
			// componentProps: { row },
		});
		await modal.present();
	}

}
